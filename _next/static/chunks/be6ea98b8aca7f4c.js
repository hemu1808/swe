(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,o,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},1538,e=>{"use strict";var o=e.i(43476),t=e.i(932),r=e.i(71645),l=e.i(75056),i=e.i(71753),n=e.i(90072);let s=`
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
`,c=`
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
`,a=e=>{let l,a,v,x,m,u,d,f,p,y,w=(0,t.c)(18),{category:h}=e,C=(0,r.useRef)(null),z=(0,r.useRef)(null);w[0]===Symbol.for("react.memo_cache_sentinel")?(l={All:[new n.Color("#2563eb"),new n.Color("#c026d3"),new n.Color("#020617")],"Backend & Systems":[new n.Color("#059669"),new n.Color("#0ea5e9"),new n.Color("#020617")],"Full Stack":[new n.Color("#9333ea"),new n.Color("#e11d48"),new n.Color("#1f2937")],"AI & Data":[new n.Color("#d97706"),new n.Color("#b91c1c"),new n.Color("#171717")]},w[0]=l):l=w[0];let g=l;w[1]===Symbol.for("react.memo_cache_sentinel")?(a={value:0},w[1]=a):a=w[1];let b=g[h];w[2]!==b[0]?(v={value:b[0]},w[2]=b[0],w[3]=v):v=w[3];let _=g[h];w[4]!==_[1]?(x={value:_[1]},w[4]=_[1],w[5]=x):x=w[5];let S=g[h];w[6]!==S[2]?(m={value:S[2]},w[6]=S[2],w[7]=m):m=w[7],w[8]!==v||w[9]!==x||w[10]!==m?(u={uTime:a,uColor1:v,uColor2:x,uColor3:m},w[8]=v,w[9]=x,w[10]=m,w[11]=u):u=w[11];let T=u;return w[12]!==h?(d=e=>{if(z.current){z.current.uniforms.uTime.value=e.clock.elapsedTime;let o=g[h];z.current.uniforms.uColor1.value.lerp(o[0],.05),z.current.uniforms.uColor2.value.lerp(o[1],.05),z.current.uniforms.uColor3.value.lerp(o[2],.05)}},w[12]=h,w[13]=d):d=w[13],(0,i.useFrame)(d),w[14]===Symbol.for("react.memo_cache_sentinel")?(f=[0,0,0],w[14]=f):f=w[14],w[15]===Symbol.for("react.memo_cache_sentinel")?(p=(0,o.jsx)("planeGeometry",{args:[10,10,128,128]}),w[15]=p):p=w[15],w[16]!==T?(y=(0,o.jsxs)("mesh",{ref:C,position:f,scale:2.8,children:[p,(0,o.jsx)("shaderMaterial",{ref:z,fragmentShader:c,vertexShader:s,uniforms:T,wireframe:!1,transparent:!0,depthWrite:!1})]}),w[16]=T,w[17]=y):y=w[17],y};e.s(["ShaderBackground",0,e=>{let r,i,n,s=(0,t.c)(4),{category:c}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(r={position:[0,0,1.5],fov:75},i={antialias:!1},s[0]=r,s[1]=i):(r=s[0],i=s[1]),s[2]!==c?(n=(0,o.jsx)("div",{className:"fixed inset-0 -z-10 h-full w-full bg-zinc-950 overflow-hidden",children:(0,o.jsx)(l.Canvas,{camera:r,gl:i,children:(0,o.jsx)(a,{category:c})})}),s[2]=c,s[3]=n):n=s[3],n}])}]);