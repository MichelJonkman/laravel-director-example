const f="modulepreload",h=function(o){return"/director/example/"+o},a={},d=function(l,i,u){if(!i||i.length===0)return l();const c=document.getElementsByTagName("link");return Promise.all(i.map(e=>{if(e=h(e),e in a)return;a[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!u)for(let n=c.length-1;n>=0;n--){const s=c[n];if(s.href===e&&(!r||s.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const t=document.createElement("link");if(t.rel=r?"stylesheet":f,r||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),r)return new Promise((n,s)=>{t.addEventListener("load",n),t.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>l())};Director.registerComponents(Object.assign({"./TextElement.vue":()=>d(()=>import("./TextElement-7e87faa0.js"),[])}));