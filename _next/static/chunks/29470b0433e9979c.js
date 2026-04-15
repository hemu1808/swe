(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},71689,e=>{"use strict";let t=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>t],71689)},1538,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),a=e.i(75056),r=e.i(71753),o=e.i(32009),s=e.i(63178);let c=`
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
`,l=`
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
`,d=e=>{let a,d,u,m,h,p,g,y,f,v,x,b,k,w,S,z,A,C,T,D,j,P,I,N=(0,i.c)(41),{category:R}=e,_=(0,n.useRef)(null),L=(0,n.useRef)(null),{resolvedTheme:M}=(0,s.useTheme)(),B="light"===M;N[0]!==B?(a=new o.Color(B?"#f1f5f9":"#020617"),N[0]=B,N[1]=a):a=N[1];let F=a;N[2]===Symbol.for("react.memo_cache_sentinel")?(d=new o.Color("#2563eb"),u=new o.Color("#c026d3"),N[2]=d,N[3]=u):(d=N[2],u=N[3]),N[4]!==F?(m=[d,u,F],N[4]=F,N[5]=m):m=N[5],N[6]===Symbol.for("react.memo_cache_sentinel")?(h=new o.Color("#059669"),p=new o.Color("#0ea5e9"),N[6]=h,N[7]=p):(h=N[6],p=N[7]),N[8]!==F?(g=[h,p,F],N[8]=F,N[9]=g):g=N[9],N[10]===Symbol.for("react.memo_cache_sentinel")?(y=new o.Color("#9333ea"),f=new o.Color("#e11d48"),N[10]=y,N[11]=f):(y=N[10],f=N[11]),N[12]!==F?(v=[y,f,F],N[12]=F,N[13]=v):v=N[13],N[14]===Symbol.for("react.memo_cache_sentinel")?(x=new o.Color("#d97706"),b=new o.Color("#b91c1c"),N[14]=x,N[15]=b):(x=N[14],b=N[15]),N[16]!==F?(k=[x,b,F],N[16]=F,N[17]=k):k=N[17],N[18]!==v||N[19]!==k||N[20]!==m||N[21]!==g?(w={All:m,"Backend & Systems":g,"Full Stack":v,"AI & Data":k},N[18]=v,N[19]=k,N[20]=m,N[21]=g,N[22]=w):w=N[22];let G=w;N[23]===Symbol.for("react.memo_cache_sentinel")?(S={value:0},N[23]=S):S=N[23];let E=G[R];N[24]!==E[0]?(z={value:E[0]},N[24]=E[0],N[25]=z):z=N[25];let W=G[R];N[26]!==W[1]?(A={value:W[1]},N[26]=W[1],N[27]=A):A=N[27];let U=G[R];N[28]!==U[2]?(C={value:U[2]},N[28]=U[2],N[29]=C):C=N[29],N[30]!==z||N[31]!==A||N[32]!==C?(T={uTime:S,uColor1:z,uColor2:A,uColor3:C},N[30]=z,N[31]=A,N[32]=C,N[33]=T):T=N[33];let O=T;return N[34]!==R||N[35]!==G?(D=e=>{if(L.current){L.current.uniforms.uTime.value=e.clock.elapsedTime;let t=G[R];L.current.uniforms.uColor1.value.lerp(t[0],.05),L.current.uniforms.uColor2.value.lerp(t[1],.05),L.current.uniforms.uColor3.value.lerp(t[2],.05)}},N[34]=R,N[35]=G,N[36]=D):D=N[36],(0,r.useFrame)(D),N[37]===Symbol.for("react.memo_cache_sentinel")?(j=[0,0,0],N[37]=j):j=N[37],N[38]===Symbol.for("react.memo_cache_sentinel")?(P=(0,t.jsx)("planeGeometry",{args:[10,10,128,128]}),N[38]=P):P=N[38],N[39]!==O?(I=(0,t.jsxs)("mesh",{ref:_,position:j,scale:2.8,children:[P,(0,t.jsx)("shaderMaterial",{ref:L,fragmentShader:l,vertexShader:c,uniforms:O,wireframe:!1,transparent:!0,depthWrite:!1})]}),N[39]=O,N[40]=I):I=N[40],I};e.s(["ShaderBackground",0,e=>{let n,r,o,s=(0,i.c)(4),{category:c}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(n={position:[0,0,1.5],fov:75},r={antialias:!1},s[0]=n,s[1]=r):(n=s[0],r=s[1]),s[2]!==c?(o=(0,t.jsx)("div",{className:"fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden",children:(0,t.jsx)(a.Canvas,{camera:n,gl:r,children:(0,t.jsx)(d,{category:c})})}),s[2]=c,s[3]=o):o=s[3],o}])},16005,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),a=e.i(46932),r=e.i(86427),o=e.i(37806),s=e.i(47414);function c(e){let t=(0,s.useConstant)(()=>(0,r.motionValue)(e)),{isStatic:i}=(0,n.useContext)(o.MotionConfigContext);if(i){let[,i]=(0,n.useState)(e);(0,n.useEffect)(()=>t.on("change",i),[])}return t}var l=e.i(44230),d=e.i(87022),u=e.i(74008);function m(e,t){let i=c(t()),n=()=>i.set(t());return n(),(0,u.useIsomorphicLayoutEffect)(()=>{let t=()=>d.frame.preRender(n,!1,!0),i=e.map(e=>e.on("change",t));return()=>{i.forEach(e=>e()),(0,d.cancelFrame)(n)}}),i}function h(e,t,i,n){if("function"==typeof e){let t;return r.collectMotionValues.current=[],e(),t=m(r.collectMotionValues.current,e),r.collectMotionValues.current=void 0,t}if(void 0!==i&&!Array.isArray(i)&&"function"!=typeof t){var a=e,o=t,c=i,d=n;let r=(0,s.useConstant)(()=>Object.keys(c)),l=(0,s.useConstant)(()=>({}));for(let e of r)l[e]=h(a,o,c[e],d);return l}let u="function"==typeof t?t:function(...e){let t=!Array.isArray(e[0]),i=t?0:-1,n=e[0+i],a=e[1+i],r=e[2+i],o=e[3+i],s=(0,l.interpolate)(a,r,o);return t?s(n):s}(t,i,n),g=Array.isArray(e)?p(e,u):p([e],([e])=>u(e)),y=Array.isArray(e)?void 0:e.accelerate;return y&&!y.isTransformed&&"function"!=typeof t&&Array.isArray(i)&&n?.clamp!==!1&&(g.accelerate={...y,times:t,keyframes:i,isTransformed:!0,...n?.ease?{ease:n.ease}:{}}),g}function p(e,t){let i=(0,s.useConstant)(()=>[]);return m(e,()=>{i.length=0;let n=e.length;for(let t=0;t<n;t++)i[t]=e[t].get();return t(i)})}var g=e.i(83352),y=e.i(83411);function f(e){return"number"==typeof e?e:parseFloat(e)}function v(e,t={}){return function(e,t={}){let{isStatic:i}=(0,n.useContext)(o.MotionConfigContext),a=()=>(0,y.isMotionValue)(e)?e.get():e;if(i)return h(a);let r=c(a());return(0,n.useInsertionEffect)(()=>(function(e,t,i={}){let n,a=e.get(),r=null,o=a,s="string"==typeof a?a.replace(/[\d.-]/g,""):void 0,c=()=>{r&&(r.stop(),r=null)};if(e.attach((t,a)=>{o=t,n=e=>{var t,i;return a((t=e,(i=s)?t+i:t))},d.frame.postRender(()=>{let t,a;c(),t=f(e.get()),t!==(a=f(o))&&(r=new g.JSAnimation({keyframes:[t,a],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...i,onUpdate:n})),e.events.animationStart?.notify(),r?.then(()=>{e.events.animationComplete?.notify()})})},c),(0,y.isMotionValue)(t)){let i=t.on("change",t=>{var i,n;return e.set((i=t,(n=s)?i+n:i))}),n=e.on("destroy",i);return()=>{i(),n()}}return c})(r,e,t),[r,JSON.stringify(t)]),r}(e,{type:"spring",...t})}var x=e.i(22016);let b=(0,e.i(75254).default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function k(e,i){return(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-zinc-400 dark:text-zinc-500 mt-1",children:"•"}),(0,t.jsx)("span",{className:"leading-relaxed",children:e})]},i)}function w(e){return(0,t.jsx)("span",{className:"rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-transparent px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase",children:e},e)}e.s(["ProjectCard",0,e=>{let r,o,s,l,d,u,m,p,g,y,f,S,z,A,C,T,D,j,P,I,N,R,_,L,M,B,F,G,E,W,U,O,q,H,Q,V,J,K,$,Z,X=(0,i.c)(82),{project:Y,index:ee}=e,et=(0,n.useRef)(null);X[0]===Symbol.for("react.memo_cache_sentinel")?(r={x:0,y:0},X[0]=r):r=X[0];let[ei,en]=(0,n.useState)(r),[,ea]=(0,n.useState)(!1),er=c(0),eo=c(0);X[1]===Symbol.for("react.memo_cache_sentinel")?(o={stiffness:150,damping:15},X[1]=o):o=X[1];let es=v(er,o);X[2]===Symbol.for("react.memo_cache_sentinel")?(s={stiffness:150,damping:15},X[2]=s):s=X[2];let ec=v(eo,s);X[3]===Symbol.for("react.memo_cache_sentinel")?(l=[-.5,.5],d=["3deg","-3deg"],X[3]=l,X[4]=d):(l=X[3],d=X[4]);let el=h(ec,l,d);X[5]===Symbol.for("react.memo_cache_sentinel")?(u=[-.5,.5],m=["-3deg","3deg"],X[5]=u,X[6]=m):(u=X[5],m=X[6]);let ed=h(es,u,m);X[7]!==er||X[8]!==eo?(p=e=>{if(!et.current)return;let t=et.current.getBoundingClientRect();en({x:e.clientX-t.left,y:e.clientY-t.top});let i=t.width,n=t.height,a=e.clientX-t.left,r=e.clientY-t.top;er.set(a/i-.5),eo.set(r/n-.5)},X[7]=er,X[8]=eo,X[9]=p):p=X[9];let eu=p;X[10]!==er||X[11]!==eo?(g=()=>{ea(!1),er.set(0),eo.set(0)},X[10]=er,X[11]=eo,X[12]=g):g=X[12];let em=g;X[13]===Symbol.for("react.memo_cache_sentinel")?(y=()=>ea(!0),X[13]=y):y=X[13],X[14]===Symbol.for("react.memo_cache_sentinel")?(f={opacity:0,y:30},S={opacity:1,y:0},X[14]=f,X[15]=S):(f=X[14],S=X[15]);let eh=.1*ee;X[16]!==eh?(z={duration:.5,ease:"easeOut",delay:eh},X[16]=eh,X[17]=z):z=X[17],X[18]!==el||X[19]!==ed?(A={transformStyle:"preserve-3d",perspective:"2000px",rotateX:el,rotateY:ed},X[18]=el,X[19]=ed,X[20]=A):A=X[20];let ep=`/projects/${Y.id}`,eg=`radial-gradient(600px circle at ${ei.x}px ${ei.y}px, rgba(255,255,255,0.06), transparent 40%)`;return X[21]!==eg?(C=(0,t.jsx)("div",{className:"pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",style:{background:eg}}),X[21]=eg,X[22]=C):C=X[22],X[23]===Symbol.for("react.memo_cache_sentinel")?(T={transform:"translateZ(10px)",transformStyle:"preserve-3d"},X[23]=T):T=X[23],X[24]!==Y.title?(D=(0,t.jsx)("h3",{className:"text-2xl font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-widest",children:Y.title}),X[24]=Y.title,X[25]=D):D=X[25],X[26]!==Y.description?(j=(0,t.jsx)("p",{className:"text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium",children:Y.description}),X[26]=Y.description,X[27]=j):j=X[27],X[28]!==D||X[29]!==j?(P=(0,t.jsxs)("div",{className:"max-w-2xl",children:[D,j]}),X[28]=D,X[29]=j,X[30]=P):P=X[30],X[31]!==Y.gitLink?(I=Y.gitLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors",children:["REPO ",(0,t.jsx)(b,{className:"w-3 h-3"})]}),X[31]=Y.gitLink,X[32]=I):I=X[32],X[33]!==Y.liveLink?(N=Y.liveLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors",children:["LIVE ",(0,t.jsx)(b,{className:"w-3 h-3"})]}),X[33]=Y.liveLink,X[34]=N):N=X[34],X[35]!==I||X[36]!==N?(R=(0,t.jsxs)("div",{className:"flex items-center gap-3 shrink-0",children:[I,N]}),X[35]=I,X[36]=N,X[37]=R):R=X[37],X[38]!==P||X[39]!==R?(_=(0,t.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-start gap-4",children:[P,R]}),X[38]=P,X[39]=R,X[40]=_):_=X[40],X[41]===Symbol.for("react.memo_cache_sentinel")?(L=(0,t.jsx)("h4",{className:"text-[10px] font-bold tracking-[0.2em] text-zinc-600 dark:text-zinc-500 uppercase mb-3",children:"What it does"}),X[41]=L):L=X[41],X[42]!==Y.highlights?(M=Y.highlights.slice(0,3).map(k),X[42]=Y.highlights,X[43]=M):M=X[43],X[44]!==M?(B=(0,t.jsxs)("div",{children:[L,(0,t.jsx)("ul",{className:"space-y-2 text-sm text-zinc-700 dark:text-zinc-300 block",children:M})]}),X[44]=M,X[45]=B):B=X[45],X[46]===Symbol.for("react.memo_cache_sentinel")?(F=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Role"}),X[46]=F):F=X[46],X[47]!==Y.role?(G=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[F,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Y.role})]}),X[47]=Y.role,X[48]=G):G=X[48],X[49]===Symbol.for("react.memo_cache_sentinel")?(E=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Time"}),X[49]=E):E=X[49],X[50]!==Y.duration?(W=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[E,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Y.duration})]}),X[50]=Y.duration,X[51]=W):W=X[51],X[52]===Symbol.for("react.memo_cache_sentinel")?(U=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Status"}),X[52]=U):U=X[52],X[53]!==Y.status?(O=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[U,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Y.status})]}),X[53]=Y.status,X[54]=O):O=X[54],X[55]===Symbol.for("react.memo_cache_sentinel")?(q=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Focus"}),X[55]=q):q=X[55],X[56]!==Y.focus?(H=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[q,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Y.focus})]}),X[56]=Y.focus,X[57]=H):H=X[57],X[58]!==G||X[59]!==W||X[60]!==O||X[61]!==H?(Q=(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mt-2",children:[G,W,O,H]}),X[58]=G,X[59]=W,X[60]=O,X[61]=H,X[62]=Q):Q=X[62],X[63]!==Y.techStack?(V=Y.techStack.map(w),X[63]=Y.techStack,X[64]=V):V=X[64],X[65]!==V?(J=(0,t.jsx)("div",{className:"flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-white/5",children:V}),X[65]=V,X[66]=J):J=X[66],X[67]!==_||X[68]!==B||X[69]!==Q||X[70]!==J?(K=(0,t.jsxs)("div",{className:"relative z-10 w-full rounded-[23px] bg-white/90 dark:bg-zinc-950/60 p-6 md:p-8 flex flex-col gap-8 shadow-xl shadow-zinc-200/50 dark:shadow-2xl",style:T,children:[_,B,Q,J]}),X[67]=_,X[68]=B,X[69]=Q,X[70]=J,X[71]=K):K=X[71],X[72]!==ep||X[73]!==C||X[74]!==K?($=(0,t.jsxs)(x.default,{href:ep,className:"block relative w-full rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-950/40 p-[1px] overflow-visible backdrop-blur-xl transition-colors hover:bg-white dark:hover:bg-zinc-900/40",children:[C,K]}),X[72]=ep,X[73]=C,X[74]=K,X[75]=$):$=X[75],X[76]!==em||X[77]!==eu||X[78]!==z||X[79]!==A||X[80]!==$?(Z=(0,t.jsx)(a.motion.div,{ref:et,onMouseMove:eu,onMouseEnter:y,onMouseLeave:em,initial:f,animate:S,transition:z,style:A,className:"relative w-full mb-6 cursor-pointer group",children:$}),X[76]=em,X[77]=eu,X[78]=z,X[79]=A,X[80]=$,X[81]=Z):Z=X[81],Z}],16005)},63936,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),a=e.i(45678),r=e.i(46932);let o=e=>{let n,a=(0,i.c)(10),{text:o,className:s,delay:c}=e,l=void 0===s?"":s,d=void 0===c?0:c;if(a[0]!==l||a[1]!==d||a[2]!==o){let e,i,s,c,u,m=o.split(" ");a[4]===Symbol.for("react.memo_cache_sentinel")?(e={opacity:0},a[4]=e):e=a[4],a[5]!==d?(i={hidden:e,visible:e=>({opacity:1,transition:{staggerChildren:.1,delayChildren:.1*d}})},a[5]=d,a[6]=i):i=a[6];let h=i;a[7]===Symbol.for("react.memo_cache_sentinel")?(s={visible:{opacity:1,y:0,transition:{type:"spring",damping:20,stiffness:100}},hidden:{opacity:0,y:40}},a[7]=s):s=a[7];let p=s;a[8]===Symbol.for("react.memo_cache_sentinel")?(c={once:!0,margin:"-100px"},a[8]=c):c=a[8],a[9]===Symbol.for("react.memo_cache_sentinel")?(u=(e,i)=>(0,t.jsx)(r.motion.span,{variants:p,style:{marginRight:"0.25em"},className:"inline-block",children:e},i),a[9]=u):u=a[9],n=(0,t.jsx)(r.motion.h1,{className:`flex flex-wrap ${l}`,variants:h,initial:"hidden",whileInView:"visible",viewport:c,children:m.map(u)}),a[0]=l,a[1]=d,a[2]=o,a[3]=n}else n=a[3];return n};var s=e.i(1538);let c=[{id:"enterprise-rag",title:"HGPT: Enterprise RAG Knowledge Base",category:"AI & Data",duration:"2025",role:"Full-stack AI",status:"Active",focus:"Semantic Search",description:"An enterprise AI search engine that allows users to securely query 10,000+ internal documents in real-time, built with Llama 3 and a custom Retrieval-Augmented Generation (RAG) pipeline.",highlights:["Implemented a hybrid search strategy using ChromaDB, BM25 for semantic vector retrieval, and Reciprocal Rank Fusion.","Cross-Encoder re-ranking to maximize context relevance, improving accuracy by 50% over standard keyword search.","Enabled high-performance ingestion pipeline using FastAPI and Celery workers to asynchronously process and chunk large datasets into embedded vectors with Chain-of-Thought reasoning without blocking the UI."],techStack:["Python","LangChain","ChromaDB","Ollama","React","FastAPI","Celery"],gitLink:"https://github.com/hemu1808/enterprise-rag",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437262438103707649?compact=1",whyContent:`**Why HGPT?** Data privacy and vendor lock-in. Enterprise data cannot always be sent to OpenAI's APIs. By building a custom pipeline using local models via Ollama and ChromaDB, we guarantee zero data leakage. Furthermore, managed services charge heavily per token. A custom hybrid search strategy using local Cross-Encoder re-ranking achieves comparable 50% improved accuracy without the compounding API costs at scale.

**The Hardest Challenge:** Tuning the chunking strategy. I implemented a parent-child hierarchy, meaning we search through small chunks for millimeter precision, but retrieve the larger surrounding document context for the LLM. This made the generation far more coherent.`,systemDesign:`
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
`,architecture:{image:"/hgptpn.jpg",description:"The Bottleneck: Relying solely on vector embeddings (ChromaDB) resulted in poor recall for specific keyword queries.\n\n### The Solution: I implemented a hybrid search pattern. Queries run in parallel against ChromaDB (semantic) and BM25 (lexical), fusing the results via Reciprocal Rank Fusion (RRF).\n\n### The Trade-off: To prevent garbage context from reaching the LLM, I added a cross-encoder to rerank the results. Because cross-encoders are computationally expensive, I strictly bound the reranking step to the top 20 documents, trading a ~300ms latency penalty for a massive spike in accuracy.\n\nIntegrated Celery for asynchronous document ingestion so the main event loop never blocks, and wired up Prometheus/Grafana for full observability."},videoUrl:"/hgptvideo.mp4",insights:{title:"The Reality of RAG",quote:"An LLM-as-a-judge that agrees with itself is not an eval.",levels:[{title:"Level 1: LLM API Wrapper",description:"No tools, no architecture, no memory. Just passing prompts."},{title:"Level 2: Basic RAG",description:"Vector Retrieval. 90% of the industry is stuck here."},{title:"Level 3: Functional Agent",description:"Systems that can think, act, use external tools, and answer."},{title:"Level 4: Multi-Agent Reasoning",description:"Autonomous research, context management, and deep monitoring."}],reflection:"Getting from Level 2 to Level 4 requires serious engineering. When I built the HGPT RAG system, implementing hybrid retrieval (BM25 + Semantic), Reciprocal Rank Fusion, and cross-encoder reranking proved one thing: moving past basic vector search is expensive. The better your recall and reasoning, the higher your compute cost. This 'memory tax' is the biggest bottleneck in local AI architecture right now.",externalLink:{label:"Read the full breakdown on TurboQuant",url:"https://lnkd.in/e8yb9nsZ"}}},{id:"container-orchestration",title:"Deploy: Distributed Container Orchestration Engine",category:"Backend & Systems",duration:"2025",role:"Systems Engineer",status:"Completed",focus:"Cluster Resilience",description:"A custom container orchestration platform, similar to a lightweight Kubernetes, designed to automatically monitor, scale, and recover failing server nodes in under 30ms.",highlights:["Reduced node failure detection time to <30ms by engineering a custom distributed control plane in Go.","Built a CLI and Dashboard utilizing Grafana to visualize real-time node metrics, exposing cluster state via RESTful API.","Ensured cluster consistency and crash recovery by implementing a Write-Ahead Log (WAL) in PostgreSQL, creating a robust failover system for controller outages.","Integrated Prometheus for distributed tracing and real-time observability.","Improved hardware utilization by 25% by designing a custom scheduler using Bin Packing algorithm to optimize memory allocation across worker nodes."],techStack:["Go","PostgreSQL","Docker","REST API","Grafana","gRPC","Prometheus"],gitLink:"https://github.com/hemu1808/container-orchestration",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440106367673188352?compact=1",whyContent:"**Why Deploy.sh?** Because Kubernetes is massive, resource-heavy, and often overkill for specialized, resource-constrained environments. I essentially challenged myself to build a mini-cloud platform from scratch. I wrote the backend in Go because I needed it to be super fast. By engineering a custom Go scheduler using a Bin Packing algorithm, I improved hardware utilization by 25% without the heavy operational overhead of managing a full Kubernetes cluster.",systemDesign:`
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
`,architecture:{image:"/deploypn.png",description:"The Bottleneck: Streaming live CPU/Memory metrics from a Go backend to a React frontend can easily cause aggressive DOM repaints, freezing the user's browser.\n\n### The Backend Architecture\nI utilized Go's concurrency model, running a background goroutine ticker that continuously updates system state in SQLite (using custom GORM interfaces to handle JSON arrays). The Go WebSocket Hub then broadcasts this payload instantly.\n\n### The Frontend Trade-off\nTo prevent UI freezing, I bypassed standard React state (useState/useReducer). I intercepted the WebSocket stream and fed the payload directly into the React Query cache (queryClient.setQueryData). This trades some frontend architecture flexibility for a highly optimized, polling-free DOM update cycle."},videoUrl:"/deployvideo.mp4"},{id:"transit-reservation",title:"Shuttle: High-Concurrency Transit Reservation System",category:"Full Stack",duration:"2024",role:"Backend Lead",status:"Live",focus:"Concurrency Control",description:"A scalable booking engine handling high-concurrency seat reservations across web and mobile platforms.",highlights:["Reduced double-booking conflicts by 95% during burst traffic events by architecting a booking engine utilizing Redis Distributed Locks (Redlock) and Optimistic Concurrency Control (OCC).","Secured PCI-compliant payments across React web and React Native mobile interfaces by integrating Stripe API webhooks within serverless functions for asynchronous verification.","Scaled real-time inventory updates to 1,000+ concurrent clients with MongoDB versioning to manage seat inventory state.","<50ms latency achieved by integrating WebSockets for bidirectional state synchronization."],techStack:["Node.js","React","React Native","Redis","MongoDB","Stripe API","AWS Amplify"],gitLink:"https://github.com/hemu1808/transit-reservation",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440202396758237184?compact=1",whyContent:"**Why ShuttleNow?** ShuttleNow is a real-time ticket booking app I built using the MERN stack. The biggest technical hurdle was handling high concurrency, what happens if two people try to book the exact same seat at the exact same second? To handle sudden spikes without crashing, I needed absolute control over the concurrency layer. By architecting a custom engine with Redis 'seat locking', I prevented about 95% of those double-booking conflicts.",systemDesign:`
### System Architecture

Handling thousands of concurrent users trying to book the exact same transit seat requires stringent concurrency guarantees.

**1. Redis Seat Locking**
- As soon as a user selects a seat, a **Distributed Lock** is acquired in Redis. It locks it for a few minutes, temporally "holding" the inventory and preventing other active sessions from progressing past the checkout screen for the exact same seat.

**2. Stripe PCI Verification**
- For payments, I didn't want to handle sensitive data directly on my server. I integrated **Stripe** using **AWS Lambda** serverless functions to keep everything secure, asynchronous, and strictly PCI-compliant.

**3. Unified Frontend & CI/CD**
- Since users are heavily on mobile, I used a unified UI approach with **React** and **React Native** so the experience is perfectly smooth across devices.
- The entire system is bound to a full CI/CD pipeline on **AWS Amplify**, automatically building and updating the live site upon code push.
`,architecture:{image:"/shpn.png",description:'The Bottleneck: Relying on standard database queries (MongoDB) for transient state (like a user simply clicking a seat) introduces latency and hammering the DB causes race conditions.\n\n### The Solution\nI decoupled the data layer. I built a dedicated WebSocket server utilizing an in-memory state object for "soft locking." When User A clicks a seat, the Node server instantly broadcasts that lock to User B via Socket.IO before a database write ever occurs.\n\n### The Trade-off\nBy keeping transient state in memory, I traded higher Node server memory overhead for a massive reduction in database load and near-zero latency for the end user. MongoDB is strictly reserved as the final source of truth upon successful Stripe checkout.'},videoUrl:"/shuttlevideo.mp4"},{id:"ecommerce-graphql",title:"E-Commerce GraphQL Architecture",category:"Backend & Systems",duration:"2021-2023",role:"Backend Engineer",status:"Production",focus:"GraphQL scaling",description:"Led redesign of backend GraphQL services for a high-traffic e-commerce platform serving 50k+ daily requests at Speeler Technologies.",highlights:["Reduced P95 latency by 30% by implementing resolver batching and AppSync caching.","Designed a multi-tenant DynamoDB Single-Table Architecture, utilizing sparse indexes and GSI sharding to eliminate hot partitions and support high-cardinality access patterns.","Engineered a fault-tolerant, event-driven pipeline using Lambda and SQS Dead Letter Queues (DLQ) to process images, reducing operational infrastructure costs by 70%.","Architected the frontend synchronization layer using React and WebSockets, implementing UI updates to mask network latency.","Orchestrated the migration to AWS ECS Fargate, implementing Blue/Green deployments for zero-downtime releases."],techStack:["AWS AppSync","GraphQL","DynamoDB","AWS Lambda","S3","React","AWS ECS","Cognito"],whyContent:`**Why GraphQL?** At Speeler Technologies, I was incredibly focused on modernizing their core e-commerce platform specifically for a printing enterprise. The main challenge was that their shopping cart needed to be radically faster to handle peak traffic. Rebuilding it with AWS AppSync and GraphQL was a huge win—it actually cut data retrieval time by about 30%.
        
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
`},{id:"facial-expression-recognition",title:"Facial Expression Recognition with PyTorch",category:"AI & Data",duration:"Jun 2024 – Jun 2024",description:"A machine learning project designed to accurately classify human facial expressions from images using a trained PyTorch model.",role:"Machine Learning Engineer",status:"Completed",focus:"Computer Vision / Deep Learning",highlights:["Preprocessing of facial images for robust feature extraction.","Training a convolutional neural network (CNN) for precise expression recognition.","Achieving high accuracy in classifying diverse expressions such as happiness, sadness, anger, and surprise."],techStack:["PyTorch","Python","Deep Learning","CNN"],whyContent:"**Why Facial Expression Recognition?** Associated with Auburn University at Montgomery, this project was an exciting deep dive into machine learning to classify human emotions from raw pixels. It highlights my proficiency in machine learning, deep learning, and computer vision architectures.",systemDesign:`
### System Architecture

**1. Data Preprocessing**
- Cleaning and manipulating facial images to ensure proper alignment and normalize data distributions.

**2. Deep Learning Modeling**
- Built entirely within **PyTorch**, implementing a deep **Convolutional Neural Network (CNN)**.
- Multiple layers engineered to capture nuanced edge and texture features defining distinct human expressions mathematically.
`},{id:"image-classifier-tensorflow",title:"Image Classifier using Tensorflow",category:"AI & Data",duration:"Jun 2024 – Jun 2024",description:"A comprehensive deep learning model building experience producing high validation accuracy by classifying images into organized folders.",role:"Machine Learning Engineer",status:"Completed",focus:"Image Classification",highlights:["Enhanced the dataset with robust data augmentation techniques to drastically improve model accuracy and robustness.","Built and trained a convolutional neural network (CNN) with optimized layers and dropout regularization.","Developed an automated pipeline to actively classify images and dynamically move them into respective category folders based on predictions.","Achieved high validation accuracy, ensuring reliable model performance on unseen test data."],techStack:["TensorFlow","Keras","Python","Google Colab","CNN"],gitLink:"https://github.com/hemu1808/Random-files.git",whyContent:`**What I Learned:**
- The critical importance of balanced and well-preprocessed datasets.
- Advanced techniques in CNN architecture design and hyperparameter tuning.
- Practical implementation of machine learning models for real-world applications.

I loved learning new things natively manipulating models using Google Colab, Keras, and TensorFlow. Tracking epochs and tuning hyperparameters in loops was a challenging yet highly rewarding experience!`,systemDesign:`
### System Architecture

**1. Data Preprocessing & Augmentation**
- Applying varied transformations explicitly to expand the dataset variation preventing overfitting and improving real-world generalization.

**2. CNN Model Architecture & Automation**
- Built on **TensorFlow** & **Keras**, introducing Dropouts selectively to penalize excessive weight correlations yielding excellent validation accuracy.
- Enforced an automated OS-level script sorting output files directly matching prediction classes into local directories.
`}],l=["All","Backend & Systems","Full Stack","AI & Data"],d=e=>{let n,a,r,o,s,c,d,u=(0,i.c)(11),{activeCategory:m,onSelectCategory:h}=e;return u[0]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-widest text-zinc-500",children:"Categories"})}),u[0]=n):n=u[0],u[1]!==m||u[2]!==h?(a=l.map(e=>{let i=m===e;return(0,t.jsxs)("button",{onClick:()=>h(e),className:`relative flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-xl overflow-hidden group whitespace-nowrap ${i?"text-zinc-900 bg-white dark:text-white dark:bg-white/10 shadow-sm dark:shadow-none":"text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"}`,children:[(0,t.jsx)("span",{className:"relative z-10",children:e}),i&&(0,t.jsx)("span",{className:"absolute inset-0 z-0 bg-blue-100/50 dark:bg-blue-500/20 border border-blue-500/10 dark:border-blue-500/30 rounded-xl"})]},e)}),u[1]=m,u[2]=h,u[3]=a):a=u[3],u[4]!==a?(r=(0,t.jsx)("nav",{className:"flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide",children:a}),u[4]=a,u[5]=r):r=u[5],u[6]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"Distributed Systems"}),u[6]=o):o=u[6],u[7]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"AI Integration"}),u[7]=s):s=u[7],u[8]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)("div",{className:"mt-8 pt-8 border-t border-zinc-200 dark:border-white/10 hidden md:block",children:(0,t.jsxs)("p",{className:"text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed",children:["Filter through my latest work focusing on ",o,", ",s,", and scalable ",(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"Full-Stack Development"}),"."]})}),u[8]=c):c=u[8],u[9]!==r?(d=(0,t.jsxs)("aside",{className:"sticky top-32 w-full md:w-64 shrink-0 flex flex-col gap-2",children:[n,r,c]}),u[9]=r,u[10]=d):d=u[10],d};var u=e.i(88653),m=e.i(16005);let h=e=>{let n,a,r=(0,i.c)(4),{projects:o}=e;return r[0]!==o?(n=o.map(p),r[0]=o,r[1]=n):n=r[1],r[2]!==n?(a=(0,t.jsx)("div",{className:"flex-1 w-full flex flex-col gap-6",children:(0,t.jsx)(u.AnimatePresence,{mode:"popLayout",children:n})}),r[2]=n,r[3]=a):a=r[3],a};function p(e,i){return(0,t.jsx)(m.ProjectCard,{project:e,index:i},e.id)}var g=e.i(71689),y=e.i(22016);function f(){let e,l,u,m,p,f,v,x,b,k,w,S,z,A,C,T=(0,i.c)(23),[D,j]=(0,n.useState)("All");T[0]!==D?(e=c.filter(e=>"All"===D||e.category===D),T[0]=D,T[1]=e):e=T[1];let P=e;return T[2]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(a.Navbar,{}),T[2]=l):l=T[2],T[3]!==D?(u=(0,t.jsx)(s.ShaderBackground,{category:D}),T[3]=D,T[4]=u):u=T[4],T[5]===Symbol.for("react.memo_cache_sentinel")?(m=(0,t.jsxs)(y.default,{href:"/",className:"inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 group bg-zinc-100 dark:bg-white/5 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10",children:[(0,t.jsx)(g.ArrowLeft,{className:"w-4 h-4 transition-transform group-hover:-translate-x-1"}),"Back to Home"]}),p=(0,t.jsx)(o,{text:"Highlights",className:"text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4"}),T[5]=m,T[6]=p):(m=T[5],p=T[6]),T[7]===Symbol.for("react.memo_cache_sentinel")?(f={opacity:0,y:20},v={opacity:1,y:0},x={delay:.3,duration:.8},T[7]=f,T[8]=v,T[9]=x):(f=T[7],v=T[8],x=T[9]),T[10]===Symbol.for("react.memo_cache_sentinel")?(b=(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" distributed container orchestration"}),T[10]=b):b=T[10],T[11]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" high-concurrency booking engines"}),T[11]=k):k=T[11],T[12]===Symbol.for("react.memo_cache_sentinel")?(w=(0,t.jsxs)("header",{className:"mb-8 md:mb-12",children:[m,p,(0,t.jsxs)(r.motion.p,{initial:f,animate:v,transition:x,className:"max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed",children:["A collection of engineering challenges I have tackled recently, spanning from",b," to",k," and",(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" enterprise RAG"})," systems."]})]}),T[12]=w):w=T[12],T[13]!==D?(S=(0,t.jsx)("div",{className:"w-full md:w-64 shrink-0",children:(0,t.jsx)(d,{activeCategory:D,onSelectCategory:j})}),T[13]=D,T[14]=S):S=T[14],T[15]!==P?(z=(0,t.jsx)("div",{className:"flex-1 w-full min-w-0",children:(0,t.jsx)(h,{projects:P})}),T[15]=P,T[16]=z):z=T[16],T[17]!==S||T[18]!==z?(A=(0,t.jsxs)("main",{className:"mx-auto max-w-7xl px-6 pb-20 pt-24",children:[w,(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 lg:gap-16 relative items-start",children:[S,z]})]}),T[17]=S,T[18]=z,T[19]=A):A=T[19],T[20]!==A||T[21]!==u?(C=(0,t.jsxs)("div",{className:"relative min-h-screen font-sans text-zinc-900 dark:text-zinc-50 selection:bg-blue-500/30",children:[l,u,A]}),T[20]=A,T[21]=u,T[22]=C):C=T[22],C}e.s(["default",()=>f],63936)}]);