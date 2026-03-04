"""
SmartRev AI Script Generator Lambda
Generates ProcessEngine scripts from natural language prompts using vector database
"""

import json
import os
import traceback
import boto3
from typing import Dict, Any, List
from pinecone import Pinecone
from openai import OpenAI
#import mysql.connector


class AIScriptGenerator:
    """Main class for AI-powered script generation"""
    
    def __init__(self):
        """Initialize the AI script generator with required clients"""
        # Load environment variables
        self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.index_name = os.getenv("VECTOR_INDEX_NAME", "smartrev-script-knowledge")
        self.auth_lambda_name = os.getenv("AUTH_LAMBDA_NAME", "AWAppOAuth2AuthenticationContainer")
        
        if not self.pinecone_api_key or not self.openai_api_key:
            raise ValueError("Missing required API keys: PINECONE_API_KEY and OPENAI_API_KEY")
        
        # Initialize clients
        self.pc = Pinecone(api_key=self.pinecone_api_key)
        self.openai_client = OpenAI(api_key=self.openai_api_key)
        self.index = self.pc.Index(self.index_name)
        self.lambda_client = boto3.client('lambda')
    
    def validate_token(self, token: str) -> Dict[str, Any]:
        """Validate JWT token by invoking the Auth Lambda"""
        try:
            # Invoke the Auth Lambda for token validation
            response = self.lambda_client.invoke(
                FunctionName=self.auth_lambda_name,
                Payload=json.dumps({
                    'requestContext': {
                        'http': {
                            'method': 'GET',
                            'path': '/api/auth/token/validate'
                        }
                    },
                    'headers': {'Authorization': f'Bearer {token}'}
                })
            )
            
            result = json.loads(response['Payload'].read())
            
            if result.get('statusCode') == 200:
                body = json.loads(result.get('body', '{}'))
                return {
                    'valid': True,
                    'user_data': body.get('user', {}),
                    'permissions': body.get('permissions', [])
                }
            else:
                return {
                    'valid': False,
                    'error': 'Invalid token'
                }
                
        except Exception as e:
            print(f"Error validating token: {e}")
            return {
                'valid': False,
                'error': str(e)
            }
    
    def get_relevant_context(self, prompt: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """Retrieve relevant documentation context from vector database"""
        try:
            # Generate embedding for the prompt
            response = self.openai_client.embeddings.create(
                input=prompt,
                model="text-embedding-ada-002"
            )
            query_embedding = response.data[0].embedding
            
            # Search vector database
            results = self.index.query(
                vector=query_embedding,
                top_k=top_k,
                include_metadata=True
            )
            
            # Format results
            context_chunks = []
            for match in results.matches:
                context_chunks.append({
                    "content": match.metadata.get("content", ""),
                    "source": match.metadata.get("source_file", ""),
                    "title": match.metadata.get("title", ""),
                    "relevance_score": match.score
                })
            
            return context_chunks
            
        except Exception as e:
            print(f"Error retrieving context: {e}")
            return []
    
    def get_mandatory_api_constraints(self) -> Dict[str, Any]:
        """Get mandatory API constraints that MUST be included in every script generation"""
        return {
            "content": """
MANDATORY PROCESSENGINE API CONSTRAINTS - MUST FOLLOW EXACTLY:

🚫 ABSOLUTELY FORBIDDEN (will cause script failure):
- const api = require('processengine-api');  // NO require() statements
- import anything from 'anywhere';           // NO import statements  
- api.required(), api.findById(), api.saveWorkflow(), api.compare(), api.validate() // These functions DON'T EXIST

✅ ONLY USE THESE EXACT FUNCTIONS:
- const document = api.getParam("document");
- const entityName = api.getParam("entityName"); 
- const value = api.getInputValue("field_name");  // SINGLE parameter only
- const results = await api.find('table_name', { where: { field: { equals: value } } });
- api.createWorkflow(); api.addStep({step_id, label, actors, rules});
- api.addError('CODE', 'message'); api.response({error: 'message'});
- const cached = api.getCache("KEY") || {}; api.output('name', 'label', value);

🔒 ENVIRONMENT: VM sandbox, 15s timeout, NO external libraries, built-in JavaScript only.
""",
            "source": "MANDATORY_CONSTRAINTS",
            "title": "MANDATORY: ProcessEngine API Constraints",
            "relevance_score": 1.0
        }
    
    # ---------------------------------------------------------
    # REPLACE THIS METHOD IN YOUR CLASS
    # ---------------------------------------------------------
    def generate_script(self, prompt: str, context_chunks: List[Dict[str, Any]]) -> str:
        """
        MODIFIED: Acts as a Data Analyst generating SQL
        """
        # 1. Define your database schema (The "Map" of your data)
        # In a real app, you might fetch this from the DB itself
        db_schema = """
        Table: orders
        Columns: id, customer_name, total_amount, discount_amount, date
        
        Table: customers
        Columns: id, name, region, signup_date
        """

        # 2. Change the System Prompt to be a Data Analyst
        system_prompt = f"""You are an expert SQL Data Analyst. 
Your job is to answer user questions by writing SQL queries for a PostgreSQL database.

DATABASE SCHEMA:
{db_schema}

RULES:
1. Return ONLY the raw SQL query. 
2. Do not wrap in markdown or code blocks.
3. Do not explain the logic.
4. If the user asks for "highest discount", use MAX().
"""

        user_prompt = f"Question: {prompt}"

        # 3. Call the AI
        response = self.openai_client.chat.completions.create(
            model="gpt-4", # Or "llama3" if local
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0
        )
        
        return response.choices[0].message.content.strip()
    
    def process_request(self, event_body: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process the request: Generate SQL -> Execute on MySQL -> Return Data
        """
        try:
            # 1. Extract prompt from request
            prompt = event_body.get("prompt", "").strip()
            if not prompt:
                return {
                    "success": False,
                    "error": "Missing 'prompt' in request body",
                    "code": "MISSING_PROMPT"
                }
            
            # 2. Get additional parameters
            max_context_chunks = event_body.get("max_context_chunks", 3)
            include_context_info = event_body.get("include_context_info", True)
            
            print(f"Processing request for prompt: {prompt[:100]}...")
            
            # 3. Retrieve relevant context (Optional: helps AI understand table definitions if stored in vector DB)
            context_chunks = self.get_relevant_context(prompt, top_k=max_context_chunks)
            
            # 4. GENERATE THE SQL (The "Brain" Step)
            # This calls your modified generate_script method to get the SQL string
            raw_ai_response = self.generate_script(prompt, context_chunks)
            
            # 5. CLEAN THE SQL
            # AI often returns "```sql SELECT * ... ```". We must remove the formatting.
            sql_query = raw_ai_response.replace("```sql", "").replace("```", "").strip()
            
            print(f"Executing SQL: {sql_query}")

            # 6. EXECUTE ON MYSQL (The "Action" Step)
            db_results = []
            execution_error = None
            
            try:
                # CONNECT TO YOUR MYSQL DATABASE
                # REPLACE THESE VALUES with your actual DB credentials
                conn = mysql.connector.connect(
                    host="localhost",       # e.g., "127.0.0.1"
                    user="root",            # e.g., "admin"
                    password="your_password",
                    database="your_db_name" # The DB where 'customers' and 'orders' tables live
                )
                
                cursor = conn.cursor(dictionary=True) # dictionary=True gives us {"name": "John"} instead of ("John",)
                cursor.execute(sql_query)
                db_results = cursor.fetchall()
                conn.close()
                
            except Exception as db_err:
                print(f"Database Error: {db_err}")
                execution_error = str(db_err)

            # 7. Prepare response
            response = {
                "success": True,
                "prompt": prompt,
                "generated_sql": sql_query,
                "data": db_results,  # <--- This is the actual data from MySQL
                "error": execution_error, # Will be None if successful
                "generation_metadata": {
                    "context_chunks_used": len(context_chunks),
                    "model": "gpt-4", # Or "llama3" if running locally
                    "vector_db_index": self.index_name
                }
            }
            
            # 8. Include context information if requested
            if include_context_info:
                response["context_sources"] = [
                    {
                        "source": chunk["source"],
                        "title": chunk["title"],
                        "relevance_score": chunk["relevance_score"]
                    }
                    for chunk in context_chunks
                ]
            
            return response
            
        except Exception as e:
            print(f"Error processing request: {e}")
            traceback.print_exc()
            return {
                "success": False,
                "error": str(e),
                "code": "PROCESSING_ERROR"
            }
        
        


def lambda_handler(event, context):
    """AWS Lambda handler function"""
    print(f"Received event: {json.dumps(event, default=str)}")
    
    try:
        # Handle OPTIONS (CORS preflight) requests
        request_context = event.get('requestContext', {})
        http_method = request_context.get('http', {}).get('method', '')
        
        if http_method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Max-Age': '300'
                },
                'body': ''
            }
        
        # Handle health check endpoint (no auth required)
        if 'rawPath' in event and event['rawPath'] == '/api/ai/script/health':
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'status': 'healthy',
                    'service': 'AI Script Generator',
                    'version': '1.0.0',
                    'vector_index': os.getenv("VECTOR_INDEX_NAME", "smartrev-script-knowledge")
                })
            }
        
        # Initialize the generator
        generator = AIScriptGenerator()
        
        # Extract and validate authorization token
        headers = event.get('headers', {})
        auth_header = headers.get('authorization') or headers.get('Authorization')
        
        if not auth_header:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Missing Authorization header',
                    'code': 'MISSING_AUTH'
                })
            }
        
        # Extract token from "Bearer <token>" format
        if auth_header.startswith('Bearer '):
            token = auth_header[7:]
        else:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Invalid Authorization header format. Use "Bearer <token>"',
                    'code': 'INVALID_AUTH_FORMAT'
                })
            }
        
        # Validate token with Auth Lambda
        auth_result = generator.validate_token(token)
        
        if not auth_result.get('valid'):
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'error': 'Invalid or expired token',
                    'code': 'INVALID_TOKEN',
                    'details': auth_result.get('error')
                })
            }
        
        # Parse request body
        if 'body' in event:
            if isinstance(event['body'], str):
                body = json.loads(event['body'])
            else:
                body = event['body']
        else:
            body = event
        
        # Add user context to the request
        body['user_context'] = auth_result.get('user_data', {})
        
        # Process the request
        result = generator.process_request(body)
        
        # Return response
        return {
            'statusCode': 200 if result.get('success') else 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps(result, default=str)
        }
        
    except Exception as e:
        print(f"Lambda handler error: {e}")
        traceback.print_exc()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Internal server error',
                'code': 'LAMBDA_ERROR'
            })
        }