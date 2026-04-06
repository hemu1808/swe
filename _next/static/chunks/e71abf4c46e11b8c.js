(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},1538,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),r=e.i(75056),a=e.i(71753),o=e.i(90072),s=e.i(63178);let c=`
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
`,d=e=>{let r,d,u,m,h,p,g,f,y,x,v,b,k,w,S,z,C,A,j,P,D,_,I,N=(0,i.c)(41),{category:R}=e,T=(0,n.useRef)(null),L=(0,n.useRef)(null),{resolvedTheme:M}=(0,s.useTheme)(),B="light"===M;N[0]!==B?(r=new o.Color(B?"#f1f5f9":"#020617"),N[0]=B,N[1]=r):r=N[1];let E=r;N[2]===Symbol.for("react.memo_cache_sentinel")?(d=new o.Color("#2563eb"),u=new o.Color("#c026d3"),N[2]=d,N[3]=u):(d=N[2],u=N[3]),N[4]!==E?(m=[d,u,E],N[4]=E,N[5]=m):m=N[5],N[6]===Symbol.for("react.memo_cache_sentinel")?(h=new o.Color("#059669"),p=new o.Color("#0ea5e9"),N[6]=h,N[7]=p):(h=N[6],p=N[7]),N[8]!==E?(g=[h,p,E],N[8]=E,N[9]=g):g=N[9],N[10]===Symbol.for("react.memo_cache_sentinel")?(f=new o.Color("#9333ea"),y=new o.Color("#e11d48"),N[10]=f,N[11]=y):(f=N[10],y=N[11]),N[12]!==E?(x=[f,y,E],N[12]=E,N[13]=x):x=N[13],N[14]===Symbol.for("react.memo_cache_sentinel")?(v=new o.Color("#d97706"),b=new o.Color("#b91c1c"),N[14]=v,N[15]=b):(v=N[14],b=N[15]),N[16]!==E?(k=[v,b,E],N[16]=E,N[17]=k):k=N[17],N[18]!==x||N[19]!==k||N[20]!==m||N[21]!==g?(w={All:m,"Backend & Systems":g,"Full Stack":x,"AI & Data":k},N[18]=x,N[19]=k,N[20]=m,N[21]=g,N[22]=w):w=N[22];let F=w;N[23]===Symbol.for("react.memo_cache_sentinel")?(S={value:0},N[23]=S):S=N[23];let G=F[R];N[24]!==G[0]?(z={value:G[0]},N[24]=G[0],N[25]=z):z=N[25];let W=F[R];N[26]!==W[1]?(C={value:W[1]},N[26]=W[1],N[27]=C):C=N[27];let U=F[R];N[28]!==U[2]?(A={value:U[2]},N[28]=U[2],N[29]=A):A=N[29],N[30]!==z||N[31]!==C||N[32]!==A?(j={uTime:S,uColor1:z,uColor2:C,uColor3:A},N[30]=z,N[31]=C,N[32]=A,N[33]=j):j=N[33];let O=j;return N[34]!==R||N[35]!==F?(P=e=>{if(L.current){L.current.uniforms.uTime.value=e.clock.elapsedTime;let t=F[R];L.current.uniforms.uColor1.value.lerp(t[0],.05),L.current.uniforms.uColor2.value.lerp(t[1],.05),L.current.uniforms.uColor3.value.lerp(t[2],.05)}},N[34]=R,N[35]=F,N[36]=P):P=N[36],(0,a.useFrame)(P),N[37]===Symbol.for("react.memo_cache_sentinel")?(D=[0,0,0],N[37]=D):D=N[37],N[38]===Symbol.for("react.memo_cache_sentinel")?(_=(0,t.jsx)("planeGeometry",{args:[10,10,128,128]}),N[38]=_):_=N[38],N[39]!==O?(I=(0,t.jsxs)("mesh",{ref:T,position:D,scale:2.8,children:[_,(0,t.jsx)("shaderMaterial",{ref:L,fragmentShader:l,vertexShader:c,uniforms:O,wireframe:!1,transparent:!0,depthWrite:!1})]}),N[39]=O,N[40]=I):I=N[40],I};e.s(["ShaderBackground",0,e=>{let n,a,o,s=(0,i.c)(4),{category:c}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(n={position:[0,0,1.5],fov:75},a={antialias:!1},s[0]=n,s[1]=a):(n=s[0],a=s[1]),s[2]!==c?(o=(0,t.jsx)("div",{className:"fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-zinc-950 overflow-hidden",children:(0,t.jsx)(r.Canvas,{camera:n,gl:a,children:(0,t.jsx)(d,{category:c})})}),s[2]=c,s[3]=o):o=s[3],o}])},88653,e=>{"use strict";e.i(47167);var t=e.i(43476),i=e.i(71645),n=e.i(31178),r=e.i(47414),a=e.i(74008),o=e.i(21476),s=e.i(72846),c=i,l=e.i(37806);function d(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class u extends c.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,i=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,n=(0,s.isHTMLElement)(e)&&e.offsetHeight||0,r=this.props.sizeRef.current;r.height=t.offsetHeight||0,r.width=t.offsetWidth||0,r.top=t.offsetTop,r.left=t.offsetLeft,r.right=i-r.width-r.left,r.bottom=n-r.height-r.top}return null}componentDidUpdate(){}render(){return this.props.children}}function m({children:e,isPresent:n,anchorX:r,anchorY:a,root:o,pop:s}){let m=(0,c.useId)(),h=(0,c.useRef)(null),p=(0,c.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:g}=(0,c.useContext)(l.MotionConfigContext),f=function(...e){return i.useCallback(function(...e){return t=>{let i=!1,n=e.map(e=>{let n=d(e,t);return i||"function"!=typeof n||(i=!0),n});if(i)return()=>{for(let t=0;t<n.length;t++){let i=n[t];"function"==typeof i?i():d(e[t],null)}}}}(...e),e)}(h,e.props?.ref??e?.ref);return(0,c.useInsertionEffect)(()=>{let{width:e,height:t,top:i,left:c,right:l,bottom:d}=p.current;if(n||!1===s||!h.current||!e||!t)return;let u="left"===r?`left: ${c}`:`right: ${l}`,f="bottom"===a?`bottom: ${d}`:`top: ${i}`;h.current.dataset.motionPopId=m;let y=document.createElement("style");g&&(y.nonce=g);let x=o??document.head;return x.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${m}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${u}px !important;
            ${f}px !important;
          }
        `),()=>{x.contains(y)&&x.removeChild(y)}},[n]),(0,t.jsx)(u,{isPresent:n,childRef:h,sizeRef:p,pop:s,children:!1===s?e:c.cloneElement(e,{ref:f})})}let h=({children:e,initial:n,isPresent:a,onExitComplete:s,custom:c,presenceAffectsLayout:l,mode:d,anchorX:u,anchorY:h,root:g})=>{let f=(0,r.useConstant)(p),y=(0,i.useId)(),x=!0,v=(0,i.useMemo)(()=>(x=!1,{id:y,initial:n,isPresent:a,custom:c,onExitComplete:e=>{for(let t of(f.set(e,!0),f.values()))if(!t)return;s&&s()},register:e=>(f.set(e,!1),()=>f.delete(e))}),[a,f,s]);return l&&x&&(v={...v}),(0,i.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[a]),i.useEffect(()=>{a||f.size||!s||s()},[a]),e=(0,t.jsx)(m,{pop:"popLayout"===d,isPresent:a,anchorX:u,anchorY:h,root:g,children:e}),(0,t.jsx)(o.PresenceContext.Provider,{value:v,children:e})};function p(){return new Map}var g=e.i(64978);let f=e=>e.key||"";function y(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}let x=({children:e,custom:o,initial:s=!0,onExitComplete:c,presenceAffectsLayout:l=!0,mode:d="sync",propagate:u=!1,anchorX:m="left",anchorY:p="top",root:x})=>{let[v,b]=(0,g.usePresence)(u),k=(0,i.useMemo)(()=>y(e),[e]),w=u&&!v?[]:k.map(f),S=(0,i.useRef)(!0),z=(0,i.useRef)(k),C=(0,r.useConstant)(()=>new Map),A=(0,i.useRef)(new Set),[j,P]=(0,i.useState)(k),[D,_]=(0,i.useState)(k);(0,a.useIsomorphicLayoutEffect)(()=>{S.current=!1,z.current=k;for(let e=0;e<D.length;e++){let t=f(D[e]);w.includes(t)?(C.delete(t),A.current.delete(t)):!0!==C.get(t)&&C.set(t,!1)}},[D,w.length,w.join("-")]);let I=[];if(k!==j){let e=[...k];for(let t=0;t<D.length;t++){let i=D[t],n=f(i);w.includes(n)||(e.splice(t,0,i),I.push(i))}return"wait"===d&&I.length&&(e=I),_(y(e)),P(k),null}let{forceRender:N}=(0,i.useContext)(n.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:D.map(e=>{let i=f(e),n=(!u||!!v)&&(k===D||w.includes(i));return(0,t.jsx)(h,{isPresent:n,initial:(!S.current||!!s)&&void 0,custom:o,presenceAffectsLayout:l,mode:d,root:x,onExitComplete:n?void 0:()=>{if(A.current.has(i)||(A.current.add(i),!C.has(i)))return;C.set(i,!0);let e=!0;C.forEach(t=>{t||(e=!1)}),e&&(N?.(),_(z.current),u&&b?.(),c&&c())},anchorX:m,anchorY:p,children:e},i)})})};e.s(["AnimatePresence",()=>x],88653)},16005,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),r=e.i(46932),a=e.i(86427),o=e.i(37806),s=e.i(47414);function c(e){let t=(0,s.useConstant)(()=>(0,a.motionValue)(e)),{isStatic:i}=(0,n.useContext)(o.MotionConfigContext);if(i){let[,i]=(0,n.useState)(e);(0,n.useEffect)(()=>t.on("change",i),[])}return t}var l=e.i(44230),d=e.i(87022),u=e.i(74008);function m(e,t){let i=c(t()),n=()=>i.set(t());return n(),(0,u.useIsomorphicLayoutEffect)(()=>{let t=()=>d.frame.preRender(n,!1,!0),i=e.map(e=>e.on("change",t));return()=>{i.forEach(e=>e()),(0,d.cancelFrame)(n)}}),i}function h(e,t,i,n){if("function"==typeof e){let t;return a.collectMotionValues.current=[],e(),t=m(a.collectMotionValues.current,e),a.collectMotionValues.current=void 0,t}if(void 0!==i&&!Array.isArray(i)&&"function"!=typeof t){var r=e,o=t,c=i,d=n;let a=(0,s.useConstant)(()=>Object.keys(c)),l=(0,s.useConstant)(()=>({}));for(let e of a)l[e]=h(r,o,c[e],d);return l}let u="function"==typeof t?t:function(...e){let t=!Array.isArray(e[0]),i=t?0:-1,n=e[0+i],r=e[1+i],a=e[2+i],o=e[3+i],s=(0,l.interpolate)(r,a,o);return t?s(n):s}(t,i,n),g=Array.isArray(e)?p(e,u):p([e],([e])=>u(e)),f=Array.isArray(e)?void 0:e.accelerate;return f&&!f.isTransformed&&"function"!=typeof t&&Array.isArray(i)&&n?.clamp!==!1&&(g.accelerate={...f,times:t,keyframes:i,isTransformed:!0,...n?.ease?{ease:n.ease}:{}}),g}function p(e,t){let i=(0,s.useConstant)(()=>[]);return m(e,()=>{i.length=0;let n=e.length;for(let t=0;t<n;t++)i[t]=e[t].get();return t(i)})}var g=e.i(83352),f=e.i(83411);function y(e){return"number"==typeof e?e:parseFloat(e)}function x(e,t={}){return function(e,t={}){let{isStatic:i}=(0,n.useContext)(o.MotionConfigContext),r=()=>(0,f.isMotionValue)(e)?e.get():e;if(i)return h(r);let a=c(r());return(0,n.useInsertionEffect)(()=>(function(e,t,i={}){let n,r=e.get(),a=null,o=r,s="string"==typeof r?r.replace(/[\d.-]/g,""):void 0,c=()=>{a&&(a.stop(),a=null)};if(e.attach((t,r)=>{o=t,n=e=>{var t,i;return r((t=e,(i=s)?t+i:t))},d.frame.postRender(()=>{let t,r;c(),t=y(e.get()),t!==(r=y(o))&&(a=new g.JSAnimation({keyframes:[t,r],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...i,onUpdate:n})),e.events.animationStart?.notify(),a?.then(()=>{e.events.animationComplete?.notify()})})},c),(0,f.isMotionValue)(t)){let i=t.on("change",t=>{var i,n;return e.set((i=t,(n=s)?i+n:i))}),n=e.on("destroy",i);return()=>{i(),n()}}return c})(a,e,t),[a,JSON.stringify(t)]),a}(e,{type:"spring",...t})}var v=e.i(22016);let b=(0,e.i(75254).default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function k(e,i){return(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:"text-zinc-400 dark:text-zinc-500 mt-1",children:"•"}),(0,t.jsx)("span",{className:"leading-relaxed",children:e})]},i)}function w(e){return(0,t.jsx)("span",{className:"rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-transparent px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase",children:e},e)}e.s(["ProjectCard",0,e=>{let a,o,s,l,d,u,m,p,g,f,y,S,z,C,A,j,P,D,_,I,N,R,T,L,M,B,E,F,G,W,U,O,q,H,Q,V,$,K,J,X,Y=(0,i.c)(82),{project:Z,index:ee}=e,et=(0,n.useRef)(null);Y[0]===Symbol.for("react.memo_cache_sentinel")?(a={x:0,y:0},Y[0]=a):a=Y[0];let[ei,en]=(0,n.useState)(a),[,er]=(0,n.useState)(!1),ea=c(0),eo=c(0);Y[1]===Symbol.for("react.memo_cache_sentinel")?(o={stiffness:150,damping:15},Y[1]=o):o=Y[1];let es=x(ea,o);Y[2]===Symbol.for("react.memo_cache_sentinel")?(s={stiffness:150,damping:15},Y[2]=s):s=Y[2];let ec=x(eo,s);Y[3]===Symbol.for("react.memo_cache_sentinel")?(l=[-.5,.5],d=["3deg","-3deg"],Y[3]=l,Y[4]=d):(l=Y[3],d=Y[4]);let el=h(ec,l,d);Y[5]===Symbol.for("react.memo_cache_sentinel")?(u=[-.5,.5],m=["-3deg","3deg"],Y[5]=u,Y[6]=m):(u=Y[5],m=Y[6]);let ed=h(es,u,m);Y[7]!==ea||Y[8]!==eo?(p=e=>{if(!et.current)return;let t=et.current.getBoundingClientRect();en({x:e.clientX-t.left,y:e.clientY-t.top});let i=t.width,n=t.height,r=e.clientX-t.left,a=e.clientY-t.top;ea.set(r/i-.5),eo.set(a/n-.5)},Y[7]=ea,Y[8]=eo,Y[9]=p):p=Y[9];let eu=p;Y[10]!==ea||Y[11]!==eo?(g=()=>{er(!1),ea.set(0),eo.set(0)},Y[10]=ea,Y[11]=eo,Y[12]=g):g=Y[12];let em=g;Y[13]===Symbol.for("react.memo_cache_sentinel")?(f=()=>er(!0),Y[13]=f):f=Y[13],Y[14]===Symbol.for("react.memo_cache_sentinel")?(y={opacity:0,y:30},S={opacity:1,y:0},Y[14]=y,Y[15]=S):(y=Y[14],S=Y[15]);let eh=.1*ee;Y[16]!==eh?(z={duration:.5,ease:"easeOut",delay:eh},Y[16]=eh,Y[17]=z):z=Y[17],Y[18]!==el||Y[19]!==ed?(C={transformStyle:"preserve-3d",perspective:"2000px",rotateX:el,rotateY:ed},Y[18]=el,Y[19]=ed,Y[20]=C):C=Y[20];let ep=`/projects/${Z.id}`,eg=`radial-gradient(600px circle at ${ei.x}px ${ei.y}px, rgba(255,255,255,0.06), transparent 40%)`;return Y[21]!==eg?(A=(0,t.jsx)("div",{className:"pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",style:{background:eg}}),Y[21]=eg,Y[22]=A):A=Y[22],Y[23]===Symbol.for("react.memo_cache_sentinel")?(j={transform:"translateZ(10px)",transformStyle:"preserve-3d"},Y[23]=j):j=Y[23],Y[24]!==Z.title?(P=(0,t.jsx)("h3",{className:"text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 uppercase tracking-widest",children:Z.title}),Y[24]=Z.title,Y[25]=P):P=Y[25],Y[26]!==Z.description?(D=(0,t.jsx)("p",{className:"text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium",children:Z.description}),Y[26]=Z.description,Y[27]=D):D=Y[27],Y[28]!==P||Y[29]!==D?(_=(0,t.jsxs)("div",{className:"max-w-2xl",children:[P,D]}),Y[28]=P,Y[29]=D,Y[30]=_):_=Y[30],Y[31]!==Z.gitLink?(I=Z.gitLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors",children:["REPO ",(0,t.jsx)(b,{className:"w-3 h-3"})]}),Y[31]=Z.gitLink,Y[32]=I):I=Y[32],Y[33]!==Z.liveLink?(N=Z.liveLink&&(0,t.jsxs)("div",{className:"flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors",children:["LIVE ",(0,t.jsx)(b,{className:"w-3 h-3"})]}),Y[33]=Z.liveLink,Y[34]=N):N=Y[34],Y[35]!==I||Y[36]!==N?(R=(0,t.jsxs)("div",{className:"flex items-center gap-3 shrink-0",children:[I,N]}),Y[35]=I,Y[36]=N,Y[37]=R):R=Y[37],Y[38]!==_||Y[39]!==R?(T=(0,t.jsxs)("div",{className:"flex flex-col md:flex-row md:justify-between md:items-start gap-4",children:[_,R]}),Y[38]=_,Y[39]=R,Y[40]=T):T=Y[40],Y[41]===Symbol.for("react.memo_cache_sentinel")?(L=(0,t.jsx)("h4",{className:"text-[10px] font-bold tracking-[0.2em] text-zinc-600 dark:text-zinc-500 uppercase mb-3",children:"What it does"}),Y[41]=L):L=Y[41],Y[42]!==Z.highlights?(M=Z.highlights.slice(0,3).map(k),Y[42]=Z.highlights,Y[43]=M):M=Y[43],Y[44]!==M?(B=(0,t.jsxs)("div",{children:[L,(0,t.jsx)("ul",{className:"space-y-2 text-sm text-zinc-700 dark:text-zinc-300 block",children:M})]}),Y[44]=M,Y[45]=B):B=Y[45],Y[46]===Symbol.for("react.memo_cache_sentinel")?(E=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Role"}),Y[46]=E):E=Y[46],Y[47]!==Z.role?(F=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[E,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Z.role})]}),Y[47]=Z.role,Y[48]=F):F=Y[48],Y[49]===Symbol.for("react.memo_cache_sentinel")?(G=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Time"}),Y[49]=G):G=Y[49],Y[50]!==Z.duration?(W=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[G,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Z.duration})]}),Y[50]=Z.duration,Y[51]=W):W=Y[51],Y[52]===Symbol.for("react.memo_cache_sentinel")?(U=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Status"}),Y[52]=U):U=Y[52],Y[53]!==Z.status?(O=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[U,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Z.status})]}),Y[53]=Z.status,Y[54]=O):O=Y[54],Y[55]===Symbol.for("react.memo_cache_sentinel")?(q=(0,t.jsx)("span",{className:"text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1",children:"Focus"}),Y[55]=q):q=Y[55],Y[56]!==Z.focus?(H=(0,t.jsxs)("div",{className:"border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center",children:[q,(0,t.jsx)("span",{className:"text-sm text-zinc-900 dark:text-zinc-200 font-medium",children:Z.focus})]}),Y[56]=Z.focus,Y[57]=H):H=Y[57],Y[58]!==F||Y[59]!==W||Y[60]!==O||Y[61]!==H?(Q=(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mt-2",children:[F,W,O,H]}),Y[58]=F,Y[59]=W,Y[60]=O,Y[61]=H,Y[62]=Q):Q=Y[62],Y[63]!==Z.techStack?(V=Z.techStack.map(w),Y[63]=Z.techStack,Y[64]=V):V=Y[64],Y[65]!==V?($=(0,t.jsx)("div",{className:"flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-white/5",children:V}),Y[65]=V,Y[66]=$):$=Y[66],Y[67]!==T||Y[68]!==B||Y[69]!==Q||Y[70]!==$?(K=(0,t.jsxs)("div",{className:"relative z-10 w-full rounded-[23px] bg-white/90 dark:bg-zinc-950/60 p-6 md:p-8 flex flex-col gap-8 shadow-xl shadow-zinc-200/50 dark:shadow-2xl",style:j,children:[T,B,Q,$]}),Y[67]=T,Y[68]=B,Y[69]=Q,Y[70]=$,Y[71]=K):K=Y[71],Y[72]!==ep||Y[73]!==A||Y[74]!==K?(J=(0,t.jsxs)(v.default,{href:ep,className:"block relative w-full rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-950/40 p-[1px] overflow-visible backdrop-blur-xl transition-colors hover:bg-white dark:hover:bg-zinc-900/40",children:[A,K]}),Y[72]=ep,Y[73]=A,Y[74]=K,Y[75]=J):J=Y[75],Y[76]!==em||Y[77]!==eu||Y[78]!==z||Y[79]!==C||Y[80]!==J?(X=(0,t.jsx)(r.motion.div,{ref:et,onMouseMove:eu,onMouseEnter:f,onMouseLeave:em,initial:y,animate:S,transition:z,style:C,className:"relative w-full mb-6 cursor-pointer group",children:J}),Y[76]=em,Y[77]=eu,Y[78]=z,Y[79]=C,Y[80]=J,Y[81]=X):X=Y[81],X}],16005)},63936,e=>{"use strict";var t=e.i(43476),i=e.i(932),n=e.i(71645),r=e.i(45678),a=e.i(46932);let o=e=>{let n,r=(0,i.c)(10),{text:o,className:s,delay:c}=e,l=void 0===s?"":s,d=void 0===c?0:c;if(r[0]!==l||r[1]!==d||r[2]!==o){let e,i,s,c,u,m=o.split(" ");r[4]===Symbol.for("react.memo_cache_sentinel")?(e={opacity:0},r[4]=e):e=r[4],r[5]!==d?(i={hidden:e,visible:e=>({opacity:1,transition:{staggerChildren:.1,delayChildren:.1*d}})},r[5]=d,r[6]=i):i=r[6];let h=i;r[7]===Symbol.for("react.memo_cache_sentinel")?(s={visible:{opacity:1,y:0,transition:{type:"spring",damping:20,stiffness:100}},hidden:{opacity:0,y:40}},r[7]=s):s=r[7];let p=s;r[8]===Symbol.for("react.memo_cache_sentinel")?(c={once:!0,margin:"-100px"},r[8]=c):c=r[8],r[9]===Symbol.for("react.memo_cache_sentinel")?(u=(e,i)=>(0,t.jsx)(a.motion.span,{variants:p,style:{marginRight:"0.25em"},className:"inline-block",children:e},i),r[9]=u):u=r[9],n=(0,t.jsx)(a.motion.h1,{className:`flex flex-wrap ${l}`,variants:h,initial:"hidden",whileInView:"visible",viewport:c,children:m.map(u)}),r[0]=l,r[1]=d,r[2]=o,r[3]=n}else n=r[3];return n};var s=e.i(1538);let c=[{id:"enterprise-rag",title:"HGPT: Enterprise RAG Knowledge Base",category:"AI & Data",duration:"2025",role:"Full-stack AI",status:"Active",focus:"Semantic Search",description:"A Retrieval-Augmented Generation (RAG) system featuring real-time Server-Sent Events (SSE) streaming, Llama 3, and DSPy designed to handle 10K+ Documents.",highlights:["Implemented a hybrid search strategy using ChromaDB, BM25 for semantic vector retrieval, and Reciprocal Rank Fusion.","Cross-Encoder re-ranking to maximize context relevance, improving accuracy by 50% over standard keyword search.","Enabled high-performance ingestion pipeline using FastAPI and Celery workers to asynchronously process and chunk large datasets into embedded vectors with Chain-of-Thought reasoning without blocking the UI."],techStack:["Python","LangChain","ChromaDB","Ollama","React","FastAPI","Celery"],gitLink:"https://github.com/hemu1808/enterprise-rag",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437262438103707649?compact=1",whyContent:`**Why HGPT?** Data privacy and vendor lock-in. Enterprise data cannot always be sent to OpenAI's APIs. By building a custom pipeline using local models via Ollama and ChromaDB, we guarantee zero data leakage. Furthermore, managed services charge heavily per token. A custom hybrid search strategy using local Cross-Encoder re-ranking achieves comparable 50% improved accuracy without the compounding API costs at scale.

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
`},{id:"container-orchestration",title:"Deploy: Distributed Container Orchestration Engine",category:"Backend & Systems",duration:"2025",role:"Systems Engineer",status:"Completed",focus:"Cluster Resilience",description:"A custom distributed control plane with a high-frequency gRPC heartbeat mechanism to manage and monitor containers.",highlights:["Reduced node failure detection time to <30ms by engineering a custom distributed control plane in Go.","Built a CLI and Dashboard utilizing Grafana to visualize real-time node metrics, exposing cluster state via RESTful API.","Ensured cluster consistency and crash recovery by implementing a Write-Ahead Log (WAL) in PostgreSQL, creating a robust failover system for controller outages.","Integrated Prometheus for distributed tracing and real-time observability.","Improved hardware utilization by 25% by designing a custom scheduler using Bin Packing algorithm to optimize memory allocation across worker nodes."],techStack:["Go","PostgreSQL","Docker","REST API","Grafana","gRPC","Prometheus"],gitLink:"https://github.com/hemu1808/container-orchestration",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440106367673188352?compact=1",whyContent:"**Why Deploy.sh?** Because Kubernetes is massive, resource-heavy, and often overkill for specialized, resource-constrained environments. I essentially challenged myself to build a mini-cloud platform from scratch. I wrote the backend in Go because I needed it to be super fast. By engineering a custom Go scheduler using a Bin Packing algorithm, I improved hardware utilization by 25% without the heavy operational overhead of managing a full Kubernetes cluster.",systemDesign:`
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
`},{id:"transit-reservation",title:"Shuttle: High-Concurrency Transit Reservation System",category:"Full Stack",duration:"2024",role:"Backend Lead",status:"Live",focus:"Concurrency Control",description:"A scalable booking engine handling high-concurrency seat reservations across web and mobile platforms.",highlights:["Reduced double-booking conflicts by 95% during burst traffic events by architecting a booking engine utilizing Redis Distributed Locks (Redlock) and Optimistic Concurrency Control (OCC).","Secured PCI-compliant payments across React web and React Native mobile interfaces by integrating Stripe API webhooks within serverless functions for asynchronous verification.","Scaled real-time inventory updates to 1,000+ concurrent clients with MongoDB versioning to manage seat inventory state.","<50ms latency achieved by integrating WebSockets for bidirectional state synchronization."],techStack:["Node.js","React","React Native","Redis","MongoDB","Stripe API","AWS Amplify"],gitLink:"https://github.com/hemu1808/transit-reservation",liveLink:"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440202396758237184?compact=1",whyContent:`**Why ShuttleNow?** ShuttleNow is a real-time ticket booking app I built using the MERN stack. The biggest technical hurdle was handling high concurrency—basically, what happens if two people try to book the exact same seat at the exact same second? To handle sudden spikes without crashing, I needed absolute control over the concurrency layer. By architecting a custom engine with Redis 'seat locking', I prevented about 95% of those double-booking conflicts.`,systemDesign:`
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
`}],l=["All","Backend & Systems","Full Stack","AI & Data"],d=e=>{let n,r,a,o,s,c,d,u=(0,i.c)(11),{activeCategory:m,onSelectCategory:h}=e;return u[0]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsx)("div",{className:"mb-4",children:(0,t.jsx)("h2",{className:"text-sm font-semibold uppercase tracking-widest text-zinc-500",children:"Categories"})}),u[0]=n):n=u[0],u[1]!==m||u[2]!==h?(r=l.map(e=>{let i=m===e;return(0,t.jsxs)("button",{onClick:()=>h(e),className:`relative flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-xl overflow-hidden group whitespace-nowrap ${i?"text-zinc-900 bg-white dark:text-white dark:bg-white/10 shadow-sm dark:shadow-none":"text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"}`,children:[(0,t.jsx)("span",{className:"relative z-10",children:e}),i&&(0,t.jsx)("span",{className:"absolute inset-0 z-0 bg-blue-100/50 dark:bg-blue-500/20 border border-blue-500/10 dark:border-blue-500/30 rounded-xl"})]},e)}),u[1]=m,u[2]=h,u[3]=r):r=u[3],u[4]!==r?(a=(0,t.jsx)("nav",{className:"flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide",children:r}),u[4]=r,u[5]=a):a=u[5],u[6]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"Distributed Systems"}),u[6]=o):o=u[6],u[7]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"AI Integration"}),u[7]=s):s=u[7],u[8]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)("div",{className:"mt-8 pt-8 border-t border-zinc-200 dark:border-white/10 hidden md:block",children:(0,t.jsxs)("p",{className:"text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed",children:["Filter through my latest work focusing on ",o,", ",s,", and scalable ",(0,t.jsx)("b",{className:"text-zinc-800 dark:text-zinc-300",children:"Full-Stack Development"}),"."]})}),u[8]=c):c=u[8],u[9]!==a?(d=(0,t.jsxs)("aside",{className:"sticky top-32 w-full md:w-64 shrink-0 flex flex-col gap-2",children:[n,a,c]}),u[9]=a,u[10]=d):d=u[10],d};var u=e.i(88653),m=e.i(16005);let h=e=>{let n,r,a=(0,i.c)(4),{projects:o}=e;return a[0]!==o?(n=o.map(p),a[0]=o,a[1]=n):n=a[1],a[2]!==n?(r=(0,t.jsx)("div",{className:"flex-1 w-full flex flex-col gap-6",children:(0,t.jsx)(u.AnimatePresence,{mode:"popLayout",children:n})}),a[2]=n,a[3]=r):r=a[3],r};function p(e,i){return(0,t.jsx)(m.ProjectCard,{project:e,index:i},e.id)}let g=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var f=e.i(22016);function y(){let e,l,u,m,p,y,x,v,b,k,w,S,z,C,A,j=(0,i.c)(23),[P,D]=(0,n.useState)("All");j[0]!==P?(e=c.filter(e=>"All"===P||e.category===P),j[0]=P,j[1]=e):e=j[1];let _=e;return j[2]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(r.Navbar,{}),j[2]=l):l=j[2],j[3]!==P?(u=(0,t.jsx)(s.ShaderBackground,{category:P}),j[3]=P,j[4]=u):u=j[4],j[5]===Symbol.for("react.memo_cache_sentinel")?(m=(0,t.jsxs)(f.default,{href:"/",className:"inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10",children:[(0,t.jsx)(g,{className:"w-4 h-4 transition-transform group-hover:-translate-x-1"}),"Back to Home"]}),p=(0,t.jsx)(o,{text:"Highlights",className:"text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4"}),j[5]=m,j[6]=p):(m=j[5],p=j[6]),j[7]===Symbol.for("react.memo_cache_sentinel")?(y={opacity:0,y:20},x={opacity:1,y:0},v={delay:.3,duration:.8},j[7]=y,j[8]=x,j[9]=v):(y=j[7],x=j[8],v=j[9]),j[10]===Symbol.for("react.memo_cache_sentinel")?(b=(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" distributed container orchestration"}),j[10]=b):b=j[10],j[11]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" high-concurrency booking engines"}),j[11]=k):k=j[11],j[12]===Symbol.for("react.memo_cache_sentinel")?(w=(0,t.jsxs)("header",{className:"mb-8 md:mb-12",children:[m,p,(0,t.jsxs)(a.motion.p,{initial:y,animate:x,transition:v,className:"max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed",children:["A collection of engineering challenges I have tackled recently, spanning from",b," to",k," and",(0,t.jsx)("span",{className:"text-zinc-900 dark:text-zinc-200 font-medium",children:" enterprise RAG"})," systems."]})]}),j[12]=w):w=j[12],j[13]!==P?(S=(0,t.jsx)("div",{className:"w-full md:w-64 shrink-0",children:(0,t.jsx)(d,{activeCategory:P,onSelectCategory:D})}),j[13]=P,j[14]=S):S=j[14],j[15]!==_?(z=(0,t.jsx)("div",{className:"flex-1 w-full min-w-0",children:(0,t.jsx)(h,{projects:_})}),j[15]=_,j[16]=z):z=j[16],j[17]!==S||j[18]!==z?(C=(0,t.jsxs)("main",{className:"mx-auto max-w-7xl px-6 pb-20 pt-24",children:[w,(0,t.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 lg:gap-16 relative items-start",children:[S,z]})]}),j[17]=S,j[18]=z,j[19]=C):C=j[19],j[20]!==C||j[21]!==u?(A=(0,t.jsxs)("div",{className:"relative min-h-screen font-sans text-zinc-900 dark:text-zinc-50 selection:bg-blue-500/30",children:[l,u,C]}),j[20]=C,j[21]=u,j[22]=A):A=j[22],A}e.s(["default",()=>y],63936)}]);