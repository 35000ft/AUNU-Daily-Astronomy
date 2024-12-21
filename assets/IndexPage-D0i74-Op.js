import{g as B,q as A,s as _,i as m,h as T,m as O,t as q,K as j,b as w,w as J,Z as H,o as b,c as E,U as y,I as P,_ as R,Q as L,X as W,W as X,$ as G,a0 as z,T as K,e as V,N as Y,O as Z}from"./index-BNzA234r.js";import{h as U,j as ee,i as N}from"./QBtn-Q4SBXAEX.js";import{a as Q}from"./axios-bq7ZFlsO.js";const te=B({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(i,{slots:e}){const{proxy:{$q:t}}=O(),a=A(q,_);if(a===_)return console.error("QPage needs to be a deep child of QLayout"),_;if(A(j,_)===_)return console.error("QPage needs to be child of QPageContainer"),_;const v=m(()=>{const h=(a.header.space===!0?a.header.size:0)+(a.footer.space===!0?a.footer.size:0);if(typeof i.styleFn=="function"){const d=a.isContainer.value===!0?a.containerHeight.value:t.screen.height;return i.styleFn(h,d)}return{minHeight:a.isContainer.value===!0?a.containerHeight.value-h+"px":t.screen.height===0?h!==0?`calc(100vh - ${h}px)`:"100vh":t.screen.height-h+"px"}}),c=m(()=>`q-page${i.padding===!0?" q-layout-padding":""}`);return()=>T("main",{class:c.value,style:v.value},U(e.default))}});class ae{constructor(e=10){this.cache=new Map,this.limit=e}get(e,t){if(!this.cache.has(e))return t||null;const a=this.cache.get(e);return this.cache.delete(e),this.cache.set(e,a),a}has(e){return this.cache.has(e)}set(e,t){this.cache.has(e)?this.cache.delete(e):this.cache.size>=this.limit&&this.cache.delete(this.cache.keys().next().value),this.cache.set(e,t)}getTobeReplacedKey(){return this.cache.size>=this.limit?this.cache.keys().next().value:null}batchSet(e,t){for(let a of e){const s=t(a);if(!s){console.warn("key cannot be null/undefined",a,e,t);continue}this.set(s,a)}}delete(e){this.cache.delete(e)}size(){return this.cache.size}clear(){this.cache.clear()}}const ne=(i,e)=>{const t=i.__vccOpts||i;for(const[a,s]of e)t[a]=s;return t},se={class:"image-reader"},oe={class:"image-container"},re={class:"spinner-wrapper"},ce={class:"spinner-container"},ie=["src","alt","onLoad","onError"],le={class:"pagination"},ue={__name:"ImageViwer",props:{images:{type:Array,required:!0},showImage:{type:String,default:null}},emits:["errorLoad"],setup(i,{emit:e}){const t=i,a=w(null),s=w([]),v=new ae(10),c=w(0),h=w(1),d=w(new Map),o=m(()=>({transform:`scale(${h.value})`,transition:"transform 0.2s ease"})),r=m(()=>c.value<t.images.length?t.images[c.value+1]:null),l=m(()=>t.images[c.value]);J(l,(n,g)=>{n&&n!==g&&u(n),r.value&&u(r.value)});const u=n=>{if(!v.has(n)){const g=v.getTobeReplacedKey();if(g){const $=s.value.findIndex(f=>f===g);$!==-1&&s.value.splice($,1)}console.log("load addCacheImage",n),s.value.push(n),S(n)}v.set(n,!0)},F=()=>{c.value>0&&c.value--},k=()=>{c.value<t.images.length-1&&c.value++},D=e,I=m(()=>{const n=l.value,g=d.value.has(n);return console.log("showLoading",g),g}),x=n=>{d.value.delete(n),D("errorLoad",n)},p=n=>{setTimeout(()=>{console.log("loaded",n),d.value.delete(n)},500)},S=n=>{console.log("loading",n),d.value.set(n,!0)};return(n,g)=>{const $=H("viewer");return b(),E("div",se,[y("div",oe,[P(y("span",re,[y("span",ce,[L(ee,{color:"primary",size:"3em"})])],512),[[R,I.value]]),(b(!0),E(W,null,X(s.value,f=>P((b(),E("span",{key:f,class:"image-wrapper",style:G(o.value)},[y("img",{src:f,alt:f,class:"image",ref_for:!0,ref_key:"imagesRef",ref:a,crossorigin:"anonymous",onLoad:M=>p(f),onError:M=>x(f)},null,40,ie)],4)),[[$],[R,l.value===f]])),128))]),y("div",le,[L(z(N),{flat:"",icon:"chevron_left",onClick:F,disabled:c.value===0},null,8,["disabled"]),y("span",null,K(c.value+1)+" / "+K(i.images.length),1),L(z(N),{flat:"",icon:"chevron_right",onClick:k,disabled:c.value===i.images.length-1},null,8,["disabled"])])])}}},he=ne(ue,[["__scopeId","data-v-da5bb78d"]]),C="known-archive-files",ve={__name:"IndexPage",setup(i){V(()=>{v()});const t=O().appContext.config.globalProperties.$config,a=m(()=>Array.from(s.value.values()).sort((o,r)=>{const l=o.split("_")[1],u=r.split("_")[1];return l&&u?u.localeCompare(l):0})),s=w(new Set),v=()=>{const o=JSON.parse(localStorage.getItem(C));o instanceof Array&&o.forEach(r=>s.value.add(r)),Q.get("/configs/known-archive-files.json").then(r=>{const l=r.data.map(u=>"archive/"+u);c(l)}),console.log("try find"),setTimeout(()=>{h()},1e3)},c=o=>{console.log("add known files",o),o instanceof Array?(o.forEach(r=>s.value.add(r)),localStorage.setItem(C,JSON.stringify(Array.from(s.value.values())))):typeof o=="string"&&(s.value.add(o),localStorage.setItem(C,JSON.stringify(Array.from(s.value.values()))))},h=async()=>{let o=new Date(t.fromDate),r=new Date;for(;r>=o;){const l=new Date(r.setDate(r.getDate()-1));r=l;const u=`${(l.getMonth()+1).toString().padStart(2,"0")}.${l.getDate().toString().padStart(2,"0")}`;if(a.value.findIndex(I=>I.includes(u))!==-1)continue;console.log(`try to find images, date:${u}`);const k=t.imageFilePrefix||"Daily Astronomy_",D=t.imageSources||["/"];for(let I of D){let x=`${I}${k}${u}.jpg`;try{const p=await Q.head(x);let S=p.headers["content-type"];if(!S)continue;if(S.startsWith("image")||S==="application/octet-stream"){c(p.config.url);break}}catch(p){console.warn("get image err, url:",x,p)}}}},d=o=>{s.value.delete(o),localStorage.setItem(C,JSON.stringify(Array.from(s.value.values())))};return(o,r)=>(b(),Y(te,{class:"flex flex-center"},{default:Z(()=>[L(he,{images:a.value,onErrorLoad:d},null,8,["images"])]),_:1}))}};export{ve as default};