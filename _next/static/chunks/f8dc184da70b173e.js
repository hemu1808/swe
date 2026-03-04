(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},1538,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(75056),r=e.i(71753),a=e.i(90072);let s=`
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  // Ashima Simplex Noise 3D
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Slow, billowing wave distortion
    float noiseFreq = 0.8;
    float noiseAmp = 0.6;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.2, pos.y * noiseFreq + uTime * 0.3, pos.z);
    
    // Add multiple octaves for detail
    pos.z += snoise(noisePos) * noiseAmp;
    pos.z += snoise(noisePos * 2.0 - uTime * 0.5) * (noiseAmp * 0.3);
    
    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,o=`
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  // 2D Rotation
  mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
  }

  void main() {
    vec2 st = vUv;
    
    // Create organic fluid flows by distorting UVs
    vec2 stSlow = st * rotate2d(uTime * 0.05);
    vec2 stFast = st * rotate2d(-uTime * 0.1);
    
    // Generate complex blending masks based on distorted UVs and Z position
    float flow1 = sin(stSlow.x * 4.0 + stFast.y * 3.0 + vPosition.z * 2.0) * 0.5 + 0.5;
    float flow2 = cos(stFast.x * 5.0 - stSlow.y * 2.0 - vPosition.z * 1.5) * 0.5 + 0.5;
    
    // Smoothstep for tighter bands of color
    flow1 = smoothstep(0.1, 0.9, flow1);
    flow2 = smoothstep(0.2, 0.8, flow2);
    
    // Mix the palette
    vec3 colorMix = mix(uColor1, uColor2, flow1);
    vec3 finalColor = mix(colorMix, uColor3, flow2);
    
    // Subtle vignette to fade into background without harsh black boundaries
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.9, 0.1, dist);

    gl_FragColor = vec4(finalColor, alpha * 0.9);
  }
`,l=({category:e})=>{let n=(0,i.useRef)(null),l=(0,i.useRef)(null),c=(0,i.useMemo)(()=>({All:[new a.Color("#2563eb"),new a.Color("#c026d3"),new a.Color("#020617")],"Backend & Systems":[new a.Color("#059669"),new a.Color("#0ea5e9"),new a.Color("#020617")],"Full Stack":[new a.Color("#9333ea"),new a.Color("#e11d48"),new a.Color("#1f2937")],"AI & Data":[new a.Color("#d97706"),new a.Color("#b91c1c"),new a.Color("#171717")]}),[]),d=(0,i.useMemo)(()=>({uTime:{value:0},uColor1:{value:c[e][0]},uColor2:{value:c[e][1]},uColor3:{value:c[e][2]}}),[e,c]);return(0,r.useFrame)(t=>{if(l.current){l.current.uniforms.uTime.value=t.clock.elapsedTime;let i=c[e];l.current.uniforms.uColor1.value.lerp(i[0],.05),l.current.uniforms.uColor2.value.lerp(i[1],.05),l.current.uniforms.uColor3.value.lerp(i[2],.05)}}),(0,t.jsxs)("mesh",{ref:n,position:[0,0,0],scale:2.8,children:[(0,t.jsx)("planeGeometry",{args:[10,10,128,128]}),(0,t.jsx)("shaderMaterial",{ref:l,fragmentShader:o,vertexShader:s,uniforms:d,wireframe:!1,transparent:!0,depthWrite:!1})]})};e.s(["ShaderBackground",0,({category:e})=>(0,t.jsx)("div",{className:"fixed inset-0 -z-10 h-full w-full bg-zinc-950 overflow-hidden",children:(0,t.jsx)(n.Canvas,{camera:{position:[0,0,1.5],fov:75},gl:{antialias:!1},children:(0,t.jsx)(l,{category:e})})})])},75254,e=>{"use strict";var t=e.i(71645);let i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},n=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim();var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let a=(0,t.forwardRef)(({color:e="currentColor",size:i=24,strokeWidth:a=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:c,...d},u)=>(0,t.createElement)("svg",{ref:u,...r,width:i,height:i,stroke:e,strokeWidth:s?24*Number(a)/Number(i):a,className:n("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,i])=>(0,t.createElement)(e,i)),...Array.isArray(l)?l:[l]])),s=(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(a,{ref:l,iconNode:r,className:n(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=i(e),s};e.s(["default",()=>s],75254)},16005,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(46932),r=e.i(86427),a=e.i(37806),s=e.i(47414);function o(e){let t=(0,s.useConstant)(()=>(0,r.motionValue)(e)),{isStatic:n}=(0,i.useContext)(a.MotionConfigContext);if(n){let[,n]=(0,i.useState)(e);(0,i.useEffect)(()=>t.on("change",n),[])}return t}var l=e.i(44230),c=e.i(87022),d=e.i(74008);function u(e,t){let i=o(t()),n=()=>i.set(t());return n(),(0,d.useIsomorphicLayoutEffect)(()=>{let t=()=>c.frame.preRender(n,!1,!0),i=e.map(e=>e.on("change",t));return()=>{i.forEach(e=>e()),(0,c.cancelFrame)(n)}}),i}function h(e,t,i,n){if("function"==typeof e){let t;return r.collectMotionValues.current=[],e(),t=u(r.collectMotionValues.current,e),r.collectMotionValues.current=void 0,t}if(void 0!==i&&!Array.isArray(i)&&"function"!=typeof t){var a=e,o=t,c=i,d=n;let r=(0,s.useConstant)(()=>Object.keys(c)),l=(0,s.useConstant)(()=>({}));for(let e of r)l[e]=h(a,o,c[e],d);return l}let p="function"==typeof t?t:function(...e){let t=!Array.isArray(e[0]),i=t?0:-1,n=e[0+i],r=e[1+i],a=e[2+i],s=e[3+i],o=(0,l.interpolate)(r,a,s);return t?o(n):o}(t,i,n),g=Array.isArray(e)?m(e,p):m([e],([e])=>p(e)),f=Array.isArray(e)?void 0:e.accelerate;return f&&!f.isTransformed&&"function"!=typeof t&&Array.isArray(i)&&n?.clamp!==!1&&(g.accelerate={...f,times:t,keyframes:i,isTransformed:!0,...n?.ease?{ease:n.ease}:{}}),g}function m(e,t){let i=(0,s.useConstant)(()=>[]);return u(e,()=>{i.length=0;let n=e.length;for(let t=0;t<n;t++)i[t]=e[t].get();return t(i)})}var p=e.i(83352),g=e.i(83411);function f(e){return"number"==typeof e?e:parseFloat(e)}function y(e,t={}){return function(e,t={}){let{isStatic:n}=(0,i.useContext)(a.MotionConfigContext),r=()=>(0,g.isMotionValue)(e)?e.get():e;if(n)return h(r);let s=o(r());return(0,i.useInsertionEffect)(()=>(function(e,t,i={}){let n,r=e.get(),a=null,s=r,o="string"==typeof r?r.replace(/[\d.-]/g,""):void 0,l=()=>{a&&(a.stop(),a=null)};if(e.attach((t,r)=>{s=t,n=e=>{var t,i;return r((t=e,(i=o)?t+i:t))},c.frame.postRender(()=>{let t,r;l(),t=f(e.get()),t!==(r=f(s))&&(a=new p.JSAnimation({keyframes:[t,r],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...i,onUpdate:n})),e.events.animationStart?.notify(),a?.then(()=>{e.events.animationComplete?.notify()})})},l),(0,g.isMotionValue)(t)){let i=t.on("change",t=>{var i,n;return e.set((i=t,(n=o)?i+n:i))}),n=e.on("destroy",i);return()=>{i(),n()}}return l})(s,e,t),[s,JSON.stringify(t)]),s}(e,{type:"spring",...t})}var v=e.i(22016);let x=(0,e.i(75254).default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);e.s(["ProjectCard",0,({project:e,index:r})=>{let a=(0,i.useRef)(null),[s,l]=(0,i.useState)({x:0,y:0}),[c,d]=(0,i.useState)(!1),u=o(0),m=o(0),p=y(u,{stiffness:150,damping:15}),g=h(y(m,{stiffness:150,damping:15}),[-.5,.5],["3deg","-3deg"]),f=h(p,[-.5,.5],["-3deg","3deg"]);return(0,t.jsx)(n.motion.div,{ref:a,onMouseMove:e=>{if(!a.current)return;let t=a.current.getBoundingClientRect();l({x:e.clientX-t.left,y:e.clientY-t.top});let i=t.width,n=t.height,r=e.clientX-t.left,s=e.clientY-t.top;u.set(r/i-.5),m.set(s/n-.5)},onMouseEnter:()=>d(!0),onMouseLeave:()=>{d(!1),u.set(0),m.set(0)},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,ease:"easeOut",delay:.1*r},style:{transformStyle:"preserve-3d",perspective:"2000px",rotateX:g,rotateY:f},className:"relative w-full mb-6 cursor-pointer group",children:(0,t.jsxs)(v.default,{href:`/projects/${e.id}`,className:"block relative w-full rounded-3xl border border-white/5 bg-zinc-950/40 p-[1px] overflow-visible backdrop-blur-xl transition-colors hover:bg-zinc-900/40",children:[(0,t.jsx)("div",{className:"pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",style:{background:`radial-gradient(600px circle at ${s.x}px ${s.y}px, rgba(255,255,255,0.06), transparent 40%)`}}),(0,t.jsxs)("div",{className:"relative z-10 w-full rounded-[23px] bg-zinc-950/60 p-6 md:p-8 flex flex-col gap-8 shadow-2xl",style:{transform:"translateZ(10px)",transformStyle:"preserve-3d"},children:[(0,t.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-start gap-4",children:[(0,t.jsxs)("div",{className:"max-w-2xl",children:[(0,t.jsx)("h3",{className:"text-2xl font-bold tracking-tight text-white mb-2 uppercase tracking-widest",children:e.title}),(0,t.jsx)("p",{className:"text-sm text-zinc-400 leading-relaxed font-medium",children:e.description})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 shrink-0",children:[e.gitLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors",children:["REPO ",(0,t.jsx)(x,{className:"w-3 h-3"})]}),e.liveLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors",children:["LIVE ",(0,t.jsx)(x,{className:"w-3 h-3"})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-3",children:"What it does"}),(0,t.jsx)("ul",{className:"space-y-2 text-sm text-zinc-300 block",children:e.highlights.slice(0,3).map((e,i)=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-zinc-500 mt-1",children:"•"}),(0,t.jsx)("span",{className:"leading-relaxed",children:e})]},i))})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mt-2",children:[(0,t.jsxs)("div",{className:"border border-white/10 bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1",children:"Role"}),(0,t.jsx)("span",{className:"text-sm text-zinc-200 font-medium",children:e.role})]}),(0,t.jsxs)("div",{className:"border border-white/10 bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1",children:"Time"}),(0,t.jsx)("span",{className:"text-sm text-zinc-200 font-medium",children:e.duration})]}),(0,t.jsxs)("div",{className:"border border-white/10 bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1",children:"Status"}),(0,t.jsx)("span",{className:"text-sm text-zinc-200 font-medium",children:e.status})]}),(0,t.jsxs)("div",{className:"border border-white/10 bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1",children:"Focus"}),(0,t.jsx)("span",{className:"text-sm text-zinc-200 font-medium",children:e.focus})]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 pt-2 border-t border-white/5",children:e.techStack.map(e=>(0,t.jsx)("span",{className:"rounded-full border border-white/10 bg-transparent px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase",children:e},e))})]})]})})}],16005)},63936,e=>{"use strict";var t=e.i(43476),i=e.i(71645),n=e.i(45678),r=e.i(46932);let a=({text:e,className:i="",delay:n=0})=>{let a=e.split(" "),s={visible:{opacity:1,y:0,transition:{type:"spring",damping:20,stiffness:100}},hidden:{opacity:0,y:40}};return(0,t.jsx)(r.motion.h1,{className:`flex flex-wrap ${i}`,variants:{hidden:{opacity:0},visible:(e=1)=>({opacity:1,transition:{staggerChildren:.1,delayChildren:.1*n}})},initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},children:a.map((e,i)=>(0,t.jsx)(r.motion.span,{variants:s,style:{marginRight:"0.25em"},className:"inline-block",children:e},i))})};var s=e.i(1538);let o=[{id:"enterprise-rag",title:"HGPT: Enterprise RAG Knowledge Base",category:"AI & Data",duration:"2025",role:"Full-stack AI",status:"Active",focus:"Semantic Search",description:"A Retrieval-Augmented Generation (RAG) system featuring real-time Server-Sent Events (SSE) streaming, Llama 3, and DSPy designed to handle 10K+ Documents.",highlights:["Implemented a hybrid search strategy using ChromaDB, BM25 for semantic vector retrieval, and Reciprocal Rank Fusion.","Cross-Encoder re-ranking to maximize context relevance, improving accuracy by 50% over standard keyword search.","Enabled high-performance ingestion pipeline using FastAPI and Celery workers to asynchronously process and chunk large datasets into embedded vectors with Chain-of-Thought reasoning without blocking the UI."],techStack:["Python","LangChain","ChromaDB","Ollama","React","FastAPI","Celery"],gitLink:"https://github.com/hemu1808/enterprise-rag",whyContent:`**Why HGPT?** Data privacy and vendor lock-in. Enterprise data cannot always be sent to OpenAI's APIs. By building a custom pipeline using local models via Ollama and ChromaDB, we guarantee zero data leakage. Furthermore, managed services charge heavily per token. A custom hybrid search strategy using local Cross-Encoder re-ranking achieves comparable 50% improved accuracy without the compounding API costs at scale.

**The Hardest Challenge:** Tuning the chunking strategy. I implemented a parent-child hierarchy, meaning we search through small chunks for millimeter precision, but retrieve the larger surrounding document context for the LLM. It took significant tuning to get the balance right, but it made the generation far more coherent.`,systemDesign:`
### System Architecture

The Enterprise RAG Knowledge Base is built around a decoupled architecture designed for high-throughput ingestion and low-latency retrieval.

**1. Data Ingestion Pipeline (Asynchronous)**
- **FastAPI** acts as the ingestion gateway.
- Large PDF and txt documents are pushed to a **Celery** background worker so the UI doesn't freeze.
- Celery workers parse them, chunk them using contextual splitters, and run **DSPy / Llama 3** to extract metadata and perform initial Chain-of-Thought (CoT) reasoning.

**2. Hybrid Retrieval Engine**
- During a query, both a sparse representation (BM25) and dense representation (embedding) are calculated.
- **Reciprocal Rank Fusion (RRF)** combines these disparate scoring domains to ensure we get exactly accurate results—not just 'kind of' related ones.
- A **Cross-Encoder** re-ranks the top K results to guarantee maximum semantic relevance.

**3. Observability & Caching**
- To make this production-ready, **Redis** was added to cache repeated queries, driving response times down.
- **Prometheus and Jaeger** are configured for observability, enabling exact bottleneck tracing if the inference pipeline slows.
`},{id:"container-orchestration",title:"Deploy: Distributed Container Orchestration Engine",category:"Backend & Systems",duration:"2025",role:"Systems Engineer",status:"Completed",focus:"Cluster Resilience",description:"A custom distributed control plane with a high-frequency gRPC heartbeat mechanism to manage and monitor containers.",highlights:["Reduced node failure detection time to <30ms by engineering a custom distributed control plane in Go.","Built a CLI and Dashboard utilizing Grafana to visualize real-time node metrics, exposing cluster state via RESTful API.","Ensured cluster consistency and crash recovery by implementing a Write-Ahead Log (WAL) in PostgreSQL, creating a robust failover system for controller outages.","Integrated Prometheus for distributed tracing and real-time observability.","Improved hardware utilization by 25% by designing a custom scheduler using Bin Packing algorithm to optimize memory allocation across worker nodes."],techStack:["Go","PostgreSQL","Docker","REST API","Grafana","gRPC","Prometheus"],gitLink:"https://github.com/hemu1808/container-orchestration",whyContent:"**Why Deploy.sh?** Because Kubernetes is massive, resource-heavy, and often overkill for specialized, resource-constrained environments. I essentially challenged myself to build a mini-cloud platform from scratch. I wrote the backend in Go because I needed it to be super fast. By engineering a custom Go scheduler using a Bin Packing algorithm, I improved hardware utilization by 25% without the heavy operational overhead of managing a full Kubernetes cluster.",systemDesign:`
### System Architecture

A microservices-based distributed control plane built entirely in Go, mimicking core aspects of Kubernetes to understand low-level distributed orchestration.

**1. Control Plane & gRPC Heartbeats**
- Worker nodes establish a bidirectional **gRPC stream** with the Master Node.
- The heartbeat frequency is extremely tight. If a container crashes, my system detects it and restarts it automatically within a minute.

**2. Custom Load Scaling**
- Instead of random placement, the master's scheduling algorithm evaluates current Memory and CPU availability.
- It tracks CPU usage globally and auto-provisions more nodes dynamically if load spikes above 70%.

**3. WAL & Postgres Failover**
- To prevent split-brain and ensure consistency if the Master Node crashes, all cluster state changes are appended to a **Write-Ahead Log (WAL)** stored in a master/slave **PostgreSQL** deployment.
`},{id:"transit-reservation",title:"Shuttle: High-Concurrency Transit Reservation System",category:"Full Stack",duration:"2024",role:"Backend Lead",status:"Live",focus:"Concurrency Control",description:"A scalable booking engine handling high-concurrency seat reservations across web and mobile platforms.",highlights:["Reduced double-booking conflicts by 95% during burst traffic events by architecting a booking engine utilizing Redis Distributed Locks (Redlock) and Optimistic Concurrency Control (OCC).","Secured PCI-compliant payments across React web and React Native mobile interfaces by integrating Stripe API webhooks within serverless functions for asynchronous verification.","Scaled real-time inventory updates to 1,000+ concurrent clients with MongoDB versioning to manage seat inventory state.","<50ms latency achieved by integrating WebSockets for bidirectional state synchronization."],techStack:["Node.js","React","React Native","Redis","MongoDB","Stripe API","AWS Amplify"],gitLink:"https://github.com/hemu1808/transit-reservation",whyContent:`**Why ShuttleNow?** ShuttleNow is a real-time ticket booking app I built using the MERN stack. The biggest technical hurdle was handling high concurrency—basically, what happens if two people try to book the exact same seat at the exact same second? To handle sudden spikes without crashing, I needed absolute control over the concurrency layer. By architecting a custom engine with Redis 'seat locking', I prevented about 95% of those double-booking conflicts.`,systemDesign:`
### System Architecture

Handling thousands of concurrent users trying to book the exact same transit seat requires stringent concurrency guarantees.

**1. Redis Seat Locking**
- As soon as a user selects a seat, a **Distributed Lock** is acquired in Redis. It locks it for a few minutes, temporally "holding" the inventory and preventing other active sessions from progressing past the checkout screen for the exact same seat.

**2. Stripe PCI Verification**
- For payments, I didn't want to handle sensitive data directly on my server. I integrated **Stripe** using **AWS Lambda** serverless functions to keep everything secure, asynchronous, and strictly PCI-compliant.

**3. Unified Frontend & CI/CD**
- Since users are heavily on mobile, I used a unified UI approach with **React** and **React Native** so the experience is perfectly smooth across devices.
- The entire system is bound to a full CI/CD pipeline on **AWS Amplify**, automatically building and updating the live site upon code push.
`},{id:"ecommerce-graphql",title:"E-Commerce GraphQL Architecture",category:"Backend & Systems",duration:"2021-2023",role:"Backend Engineer",status:"Production",focus:"GraphQL scaling",description:"Led redesign of backend GraphQL services for a high-traffic e-commerce platform serving 50k+ daily requests at Speeler Technologies.",highlights:["Reduced P95 latency by 30% by implementing resolver batching and AppSync caching.","Designed a multi-tenant DynamoDB Single-Table Architecture, utilizing sparse indexes and GSI sharding to eliminate hot partitions and support high-cardinality access patterns.","Engineered a fault-tolerant, event-driven pipeline using Lambda and SQS Dead Letter Queues (DLQ) to process images, reducing operational infrastructure costs by 70%.","Architected the frontend synchronization layer using React and WebSockets, implementing UI updates to mask network latency.","Orchestrated the migration to AWS ECS Fargate, implementing Blue/Green deployments for zero-downtime releases."],techStack:["AWS AppSync","GraphQL","DynamoDB","AWS Lambda","S3","React","AWS ECS","Cognito"],whyContent:`**Why GraphQL?** At Speeler Technologies, I was incredibly focused on modernizing their core e-commerce platform specifically for a printing enterprise. The main challenge was that their shopping cart needed to be radically faster to handle peak traffic. Rebuilding it with AWS AppSync and GraphQL was a huge win—it actually cut data retrieval time by about 30%.
        
**The Hardest Challenge:** The database design. I used a strict Single-Table Design in DynamoDB to keep queries lightning fast, but setting up the fine-grained access control with Cognito/IAM alongside it took extensive, careful planning to enforce exactly right.`,systemDesign:`
### System Architecture

This outlines the cloud-native, serverless approach taken to redesign the backend services at Speeler Technologies.

**1. AppSync & DynamoDB Single-Table Design**
- Rebuilt the monolithic shopping cart into a lightning-fast **AWS AppSync / GraphQL** schema.
- Optimized database reads executing a strict **DynamoDB Single-Table Design**, keeping latency flat even at massive scale while strictly scoping identity and access via **AWS Cognito** and IAM.

**2. Lambda Image Pipeline Automation**
- The enterprise required processing hundreds of massive printing images daily.
- I built a fully automated system: as soon as an image hits an **S3** bucket, it triggers an event-driven **AWS Lambda** function to process it instantly. Moving to this serverless architecture eliminated hours of manual work and saved the company **70% in operational costs**.

**3. Docker to Fargate**
- Packaged the entire React frontend application into Docker containers.
- Orchestrated the deployment onto **AWS ECS Fargate**, allowing the application to completely automatically scale horizontally up and down based strictly on heavy traffic spikes.
`},{id:"interviewprep",title:"InterviewPrep: Full Stack Quiz App",category:"Full Stack",duration:"2024",description:"A comprehensive learning platform allowing users to master core programming topics through interactive quizzes and curated study materials.",role:"Full Stack Engineer",status:"Completed",focus:"Education / Assessment",highlights:["Hyper-detailed, structured learning content across 10 core programming topics (DSA, OOPS, React, etc.).","Topic-wise interactive quizzes with randomized and All-in-One testing modes.","Modular NestJS backend providing dedicated REST endpoints for learning content and question retrieval."],techStack:["React","TypeScript","NestJS","Tailwind CSS","Axios"],gitLink:"https://github.com/hemu1808/Quiz",whyContent:"**Why InterviewPrep?** This app was born from the need for a centralized, interactive platform to revise programming fundamentals for interviews. Rather than sifting through scattered resources, InterviewPrep offers a structured, user-friendly solution to prepare with confidence.",systemDesign:`
### System Architecture

A classic decoupled architecture leveraging NestJS for a highly modular backend.

**1. NestJS Backend Structure**
- Built with strictly typed controllers and services, leveraging DTOs and Class-Validator for robust API validation.
- Exposes structured REST APIs for retrieving randomized quiz sets or focused, syntax-heavy learning content.

**2. React + TypeScript Frontend**
- A responsive, Glassmorphism-based UI developed using Tailwind CSS.
- Component-based architecture with React Router for seamless navigation between topic hubs and active quiz sessions.
`},{id:"peeppa",title:"Peeppa: Price Tracker Engine",category:"Backend & Systems",duration:"2024",description:"A cross-retailer product scraping engine that automatically tracks price drops across major outlets like Amazon, Best Buy, and Target.",role:"Backend Engineer",status:"Completed",focus:"Web Scraping / Data Engineering",highlights:["Real-time and historic price tracking across automated scrapers spanning diverse e-commerce structures.","Dynamic threshold-based email alerts triggering notifications when products drop below target prices.","Historical pricing charts mapping price fluctuations dynamically from MongoDB."],techStack:["Python","Flask","MongoDB","BeautifulSoup","HTML/CSS"],gitLink:"https://github.com/hemu1808/Peeppa",whyContent:"**Why Peeppa?** To solve the fragmented shopping experience. Reconciling structured item data across highly dynamic, structurally volatile e-commerce DOMs required robust HTML parsing adapters and reliable document-based persistence.",systemDesign:`
### System Architecture

A monolithic Python application focused on resilient HTML scraping and unstructured data tracking.

**1. BeautifulSoup Scraping Adapters**
- Target-specific scraping endpoints for diverse retailers (Amazon, Walmart, Best Buy) handling uniquely rendered HTML structures.
- Parses live product DOMs to extract current pricing strings and normalization.

**2. MongoDB Persistence & Email Alerts**
- Aggregates unstructured historical price snapshots into MongoDB for quick charting lookups.
- A background evaluator tests current live prices against user-defined thresholds, triggering a configured SMTP server to dispatch alerts immediately upon price tanking.
`},{id:"maze-game",title:"2D Interactive Maze Game",category:"Backend & Systems",duration:"2023",description:"A 2D interactive maze game built using Python and Tkinter that generates a new solvable maze every run using Depth-First Search (DFS).",role:"Software Developer",status:"Completed",focus:"Procedural Generation",highlights:["Procedural maze generation using recursive backtracking (DFS).","Guaranteed solvable maze from start to end with win detection and smooth frame-based updates (~60 FPS).","Grid-based coordinate-to-pixel transformation supporting dynamic scaling."],techStack:["Python","Tkinter","Algorithms","DFS"],gitLink:"https://github.com/hemu1808/Maze-Game",whyContent:"**Why Maze Game?** To delve into procedural content generation and algorithmic thinking. Implementing a stack-based Depth-First Search (DFS) for both generation and validation ensured the maze was always solvable while teaching me grid-to-pixel mapping and frame-based event rendering.",systemDesign:`
### System Architecture

A Python desktop application utilizing custom data structures for procedural generation.

**1. Maze Generation Logic**
- Uses a stack-based **Depth-First Search (DFS)** to recursively carve paths.
- Two-cell stepping ensures proper wall separation in an O(n\xb2) time complexity graph.

**2. Game Architecture & Rendering**
- Built with **Object-Oriented Design**, separating state management from the UI canvas.
- A continuous animation loop using Tkinter's \`root.after()\` ensures a smooth ~60 FPS update cycle.
- Dynamically scales grid coordinates to Canvas pixel transformations for responsive rendering.
`},{id:"rawhplayer",title:"RawhPlayer: Desktop Media Player",category:"Backend & Systems",duration:"2023",description:"A lightweight desktop media player application focused on custom UI design and core playback functionality.",role:"Software Developer",status:"Completed",focus:"UI Design / Media Handling",highlights:["Audio playback controls (Play / Pause / Stop) with manual file handling and media loading.","Modular code structure separating event-driven UI components from core logic.","Tight state management across playback transitions (idle → playing → paused)."],techStack:["Python","Pygame","GUI Design"],gitLink:"https://github.com/hemu1808/rawhplayer",whyContent:"**Why RawhPlayer?** To build a lightweight, feature-focused media player without relying on heavy frameworks. The manual control over UI components and focus on state management over multiple playback transitions demonstrated core principles in desktop application flow design.",systemDesign:`
### System Architecture

A modular desktop application separating view models from multimedia handling logic.

**1. Media Handling**
- Integrates Python multimedia libraries to hook directly into the OS audio sub-system.
- Tightly controls playback state transitions to handle continuous buffer reading.

**2. Architecture & UI Implementation**
- Uses an **Event-Driven** control system where interactive widgets trigger asynchronous media commands.
- Custom component styling engineered without massive UI libraries to keep the final executable incredibly lightweight and responsive.
`}],l=["All","Backend & Systems","Full Stack","AI & Data"],c=({activeCategory:e,onSelectCategory:i})=>(0,t.jsxs)("aside",{className:"sticky top-32 w-full md:w-64 shrink-0 flex flex-col gap-2",children:[(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-widest text-zinc-500",children:"Categories"})}),(0,t.jsx)("nav",{className:"flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide",children:l.map(n=>{let r=e===n;return(0,t.jsxs)("button",{onClick:()=>i(n),className:`relative flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-xl overflow-hidden group whitespace-nowrap ${r?"text-white bg-white/10":"text-zinc-400 hover:text-white hover:bg-white/5"}`,children:[(0,t.jsx)("span",{className:"relative z-10",children:n}),r&&(0,t.jsx)("span",{className:"absolute inset-0 z-0 bg-blue-500/20 border border-blue-500/30 rounded-xl"})]},n)})}),(0,t.jsx)("div",{className:"mt-8 pt-8 border-t border-white/10 hidden md:block",children:(0,t.jsxs)("p",{className:"text-xs text-zinc-500 leading-relaxed",children:["Filter through my latest work focusing on ",(0,t.jsx)("b",{children:"Distributed Systems"}),", ",(0,t.jsx)("b",{children:"AI Integration"}),", and scalable ",(0,t.jsx)("b",{children:"Full-Stack Development"}),"."]})})]});e.i(47167);var d=e.i(31178),u=e.i(47414),h=e.i(74008),m=e.i(21476),p=e.i(72846),g=i,f=e.i(37806);function y(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class v extends g.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,i=(0,p.isHTMLElement)(e)&&e.offsetWidth||0,n=(0,p.isHTMLElement)(e)&&e.offsetHeight||0,r=this.props.sizeRef.current;r.height=t.offsetHeight||0,r.width=t.offsetWidth||0,r.top=t.offsetTop,r.left=t.offsetLeft,r.right=i-r.width-r.left,r.bottom=n-r.height-r.top}return null}componentDidUpdate(){}render(){return this.props.children}}function x({children:e,isPresent:n,anchorX:r,anchorY:a,root:s,pop:o}){let l=(0,g.useId)(),c=(0,g.useRef)(null),d=(0,g.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:u}=(0,g.useContext)(f.MotionConfigContext),h=function(...e){return i.useCallback(function(...e){return t=>{let i=!1,n=e.map(e=>{let n=y(e,t);return i||"function"!=typeof n||(i=!0),n});if(i)return()=>{for(let t=0;t<n.length;t++){let i=n[t];"function"==typeof i?i():y(e[t],null)}}}}(...e),e)}(c,e.props?.ref??e?.ref);return(0,g.useInsertionEffect)(()=>{let{width:e,height:t,top:i,left:h,right:m,bottom:p}=d.current;if(n||!1===o||!c.current||!e||!t)return;let g="left"===r?`left: ${h}`:`right: ${m}`,f="bottom"===a?`bottom: ${p}`:`top: ${i}`;c.current.dataset.motionPopId=l;let y=document.createElement("style");u&&(y.nonce=u);let v=s??document.head;return v.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${g}px !important;
            ${f}px !important;
          }
        `),()=>{v.contains(y)&&v.removeChild(y)}},[n]),(0,t.jsx)(v,{isPresent:n,childRef:c,sizeRef:d,pop:o,children:!1===o?e:g.cloneElement(e,{ref:h})})}let b=({children:e,initial:n,isPresent:r,onExitComplete:a,custom:s,presenceAffectsLayout:o,mode:l,anchorX:c,anchorY:d,root:h})=>{let p=(0,u.useConstant)(w),g=(0,i.useId)(),f=!0,y=(0,i.useMemo)(()=>(f=!1,{id:g,initial:n,isPresent:r,custom:s,onExitComplete:e=>{for(let t of(p.set(e,!0),p.values()))if(!t)return;a&&a()},register:e=>(p.set(e,!1),()=>p.delete(e))}),[r,p,a]);return o&&f&&(y={...y}),(0,i.useMemo)(()=>{p.forEach((e,t)=>p.set(t,!1))},[r]),i.useEffect(()=>{r||p.size||!a||a()},[r]),e=(0,t.jsx)(x,{pop:"popLayout"===l,isPresent:r,anchorX:c,anchorY:d,root:h,children:e}),(0,t.jsx)(m.PresenceContext.Provider,{value:y,children:e})};function w(){return new Map}var k=e.i(64978);let S=e=>e.key||"";function C(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}let A=({children:e,custom:n,initial:r=!0,onExitComplete:a,presenceAffectsLayout:s=!0,mode:o="sync",propagate:l=!1,anchorX:c="left",anchorY:m="top",root:p})=>{let[g,f]=(0,k.usePresence)(l),y=(0,i.useMemo)(()=>C(e),[e]),v=l&&!g?[]:y.map(S),x=(0,i.useRef)(!0),w=(0,i.useRef)(y),A=(0,u.useConstant)(()=>new Map),z=(0,i.useRef)(new Set),[j,P]=(0,i.useState)(y),[D,I]=(0,i.useState)(y);(0,h.useIsomorphicLayoutEffect)(()=>{x.current=!1,w.current=y;for(let e=0;e<D.length;e++){let t=S(D[e]);v.includes(t)?(A.delete(t),z.current.delete(t)):!0!==A.get(t)&&A.set(t,!1)}},[D,v.length,v.join("-")]);let N=[];if(y!==j){let e=[...y];for(let t=0;t<D.length;t++){let i=D[t],n=S(i);v.includes(n)||(e.splice(t,0,i),N.push(i))}return"wait"===o&&N.length&&(e=N),I(C(e)),P(y),null}let{forceRender:R}=(0,i.useContext)(d.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:D.map(e=>{let i=S(e),d=(!l||!!g)&&(y===D||v.includes(i));return(0,t.jsx)(b,{isPresent:d,initial:(!x.current||!!r)&&void 0,custom:n,presenceAffectsLayout:s,mode:o,root:p,onExitComplete:d?void 0:()=>{if(z.current.has(i)||(z.current.add(i),!A.has(i)))return;A.set(i,!0);let e=!0;A.forEach(t=>{t||(e=!1)}),e&&(R?.(),I(w.current),l&&f?.(),a&&a())},anchorX:c,anchorY:m,children:e},i)})})};var z=e.i(16005);let j=({projects:e})=>(0,t.jsx)("div",{className:"flex-1 w-full flex flex-col gap-6",children:(0,t.jsx)(A,{mode:"popLayout",children:e.map((e,i)=>(0,t.jsx)(z.ProjectCard,{project:e,index:i},e.id))})}),P=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var D=e.i(22016);function I(){let[e,l]=(0,i.useState)("All"),d=o.filter(t=>"All"===e||t.category===e);return(0,t.jsxs)("div",{className:"relative min-h-screen font-sans text-zinc-50 selection:bg-blue-500/30",children:[(0,t.jsx)(n.Navbar,{}),(0,t.jsx)(s.ShaderBackground,{category:e}),(0,t.jsxs)("main",{className:"mx-auto max-w-7xl px-6 pb-20 pt-24",children:[(0,t.jsxs)("header",{className:"mb-8 md:mb-12",children:[(0,t.jsxs)(D.default,{href:"/",className:"inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10",children:[(0,t.jsx)(P,{className:"w-4 h-4 transition-transform group-hover:-translate-x-1"}),"Back to Home"]}),(0,t.jsx)(a,{text:"Highlights",className:"text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"}),(0,t.jsxs)(r.motion.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.3,duration:.8},className:"max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed",children:["A collection of engineering challenges I have tackled recently, spanning from",(0,t.jsx)("span",{className:"text-zinc-200 font-medium",children:" distributed container orchestration"})," to",(0,t.jsx)("span",{className:"text-zinc-200 font-medium",children:" high-concurrency booking engines"})," and",(0,t.jsx)("span",{className:"text-zinc-200 font-medium",children:" enterprise RAG"})," systems."]})]}),(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 lg:gap-16 relative items-start",children:[(0,t.jsx)("div",{className:"w-full md:w-64 shrink-0",children:(0,t.jsx)(c,{activeCategory:e,onSelectCategory:l})}),(0,t.jsx)("div",{className:"flex-1 w-full min-w-0",children:(0,t.jsx)(j,{projects:d})})]})]})]})}e.s(["default",()=>I],63936)}]);