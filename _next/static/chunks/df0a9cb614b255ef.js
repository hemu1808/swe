(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,o,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},10980,e=>{"use strict";let o=(0,e.i(75254).default)("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);e.s(["BookOpen",()=>o],10980)},18393,e=>{"use strict";let o=(0,e.i(75254).default)("server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);e.s(["Server",()=>o],18393)},39312,e=>{"use strict";let o=(0,e.i(75254).default)("zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);e.s(["Zap",()=>o],39312)},78716,e=>{"use strict";let o=(0,e.i(75254).default)("video",[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]]);e.s(["Video",()=>o],78716)},78917,e=>{"use strict";let o=(0,e.i(75254).default)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);e.s(["ExternalLink",()=>o],78917)},81418,e=>{"use strict";let o=(0,e.i(75254).default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);e.s(["ShieldCheck",()=>o],81418)},1538,e=>{"use strict";var o=e.i(43476),t=e.i(932),r=e.i(71645),i=e.i(75056),l=e.i(71753),a=e.i(32009),s=e.i(63178);let c=`
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
`,n=`
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
`,v=e=>{let i,v,x,m,u,y,d,p,f,h,w,g,z,b,C,_,k,S,j,T,M,P,q,A=(0,t.c)(41),{category:F}=e,U=(0,r.useRef)(null),V=(0,r.useRef)(null),{resolvedTheme:D}=(0,s.useTheme)(),O="light"===D;A[0]!==O?(i=new a.Color(O?"#f1f5f9":"#020617"),A[0]=O,A[1]=i):i=A[1];let B=i;A[2]===Symbol.for("react.memo_cache_sentinel")?(v=new a.Color("#2563eb"),x=new a.Color("#c026d3"),A[2]=v,A[3]=x):(v=A[2],x=A[3]),A[4]!==B?(m=[v,x,B],A[4]=B,A[5]=m):m=A[5],A[6]===Symbol.for("react.memo_cache_sentinel")?(u=new a.Color("#059669"),y=new a.Color("#0ea5e9"),A[6]=u,A[7]=y):(u=A[6],y=A[7]),A[8]!==B?(d=[u,y,B],A[8]=B,A[9]=d):d=A[9],A[10]===Symbol.for("react.memo_cache_sentinel")?(p=new a.Color("#9333ea"),f=new a.Color("#e11d48"),A[10]=p,A[11]=f):(p=A[10],f=A[11]),A[12]!==B?(h=[p,f,B],A[12]=B,A[13]=h):h=A[13],A[14]===Symbol.for("react.memo_cache_sentinel")?(w=new a.Color("#d97706"),g=new a.Color("#b91c1c"),A[14]=w,A[15]=g):(w=A[14],g=A[15]),A[16]!==B?(z=[w,g,B],A[16]=B,A[17]=z):z=A[17],A[18]!==h||A[19]!==z||A[20]!==m||A[21]!==d?(b={All:m,"Backend & Systems":d,"Full Stack":h,"AI & Data":z},A[18]=h,A[19]=z,A[20]=m,A[21]=d,A[22]=b):b=A[22];let R=b;A[23]===Symbol.for("react.memo_cache_sentinel")?(C={value:0},A[23]=C):C=A[23];let I=R[F];A[24]!==I[0]?(_={value:I[0]},A[24]=I[0],A[25]=_):_=A[25];let G=R[F];A[26]!==G[1]?(k={value:G[1]},A[26]=G[1],A[27]=k):k=A[27];let K=R[F];A[28]!==K[2]?(S={value:K[2]},A[28]=K[2],A[29]=S):S=A[29],A[30]!==_||A[31]!==k||A[32]!==S?(j={uTime:C,uColor1:_,uColor2:k,uColor3:S},A[30]=_,A[31]=k,A[32]=S,A[33]=j):j=A[33];let L=j;return A[34]!==F||A[35]!==R?(T=e=>{if(V.current){V.current.uniforms.uTime.value=e.clock.elapsedTime;let o=R[F];V.current.uniforms.uColor1.value.lerp(o[0],.05),V.current.uniforms.uColor2.value.lerp(o[1],.05),V.current.uniforms.uColor3.value.lerp(o[2],.05)}},A[34]=F,A[35]=R,A[36]=T):T=A[36],(0,l.useFrame)(T),A[37]===Symbol.for("react.memo_cache_sentinel")?(M=[0,0,0],A[37]=M):M=A[37],A[38]===Symbol.for("react.memo_cache_sentinel")?(P=(0,o.jsx)("planeGeometry",{args:[10,10,128,128]}),A[38]=P):P=A[38],A[39]!==L?(q=(0,o.jsxs)("mesh",{ref:U,position:M,scale:2.8,children:[P,(0,o.jsx)("shaderMaterial",{ref:V,fragmentShader:n,vertexShader:c,uniforms:L,wireframe:!1,transparent:!0,depthWrite:!1})]}),A[39]=L,A[40]=q):q=A[40],q};e.s(["ShaderBackground",0,e=>{let r,l,a,s=(0,t.c)(4),{category:c}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(r={position:[0,0,1.5],fov:75},l={antialias:!1},s[0]=r,s[1]=l):(r=s[0],l=s[1]),s[2]!==c?(a=(0,o.jsx)("div",{className:"fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden",children:(0,o.jsx)(i.Canvas,{camera:r,gl:l,children:(0,o.jsx)(v,{category:c})})}),s[2]=c,s[3]=a):a=s[3],a}])}]);