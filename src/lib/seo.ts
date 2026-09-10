import { useEffect } from "react";
import { SITE_URL } from "@/data/site";
export { SITE_URL };
type SeoInput={title:string;description:string;path:string;jsonLd?:Record<string,unknown>|Record<string,unknown>[];noIndex?:boolean;type?:"website"|"article"};
function meta(attr:"name"|"property",key:string,value:string){let el=document.head.querySelector<HTMLMetaElement>('meta['+attr+'="'+key+'"]');if(!el){el=document.createElement("meta");el.setAttribute(attr,key);document.head.appendChild(el);}el.content=value;}
export function useSeo({title,description,path,jsonLd,noIndex=false,type="website"}:SeoInput){
 const serialized=JSON.stringify(jsonLd);
 useEffect(()=>{
   const url=SITE_URL+path;document.title=title;meta("name","description",description);
   meta("name","robots",noIndex?"noindex, follow":"index, follow, max-image-preview:large");
   meta("property","og:title",title);meta("property","og:description",description);meta("property","og:url",url);meta("property","og:type",type);meta("name","twitter:title",title);meta("name","twitter:description",description);
   let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(!canonical){canonical=document.createElement("link");canonical.rel="canonical";document.head.appendChild(canonical);}canonical.href=url;
   document.head.querySelectorAll('script[data-seo-route="true"]').forEach(x=>x.remove());
   if(serialized){const script=document.createElement("script");script.type="application/ld+json";script.dataset.seoRoute="true";script.textContent=serialized;document.head.appendChild(script);}
 },[title,description,path,serialized,noIndex,type]);
}
