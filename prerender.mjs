import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const root=dirname(fileURLToPath(import.meta.url));
const dist=join(root,"dist"),serverDir=join(root,"dist-ssr");
const template=await readFile(join(dist,"index.html"),"utf8");
if(template.includes("data-prerendered"))throw new Error("Run vite build before prerender.");
// Render the same React tree at build time. No browser download, live network,
// analytics, or production form submission is needed for the build.
await build({
  configFile:false,root,logLevel:"warn",
  resolve:{alias:{"@":join(root,"src")}},
  build:{ssr:join(root,"src/entry-server.tsx"),outDir:serverDir,emptyOutDir:true,
    rollupOptions:{output:{entryFileNames:"entry-server.mjs"}},
    target:"node22"},
});
try {
 const {render,routes,getPageSeo}=await import(pathToFileURL(join(serverDir,"entry-server.mjs")).href);
 const escape=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
 for(const route of [...routes,"/404"]){
   const seo=getPageSeo(route),body=render(route);
   let html=template.replace('<div id="root"></div>','<div id="root">'+body+'</div>').replace("<html ",'<html data-prerendered="true" ');
   html=html.replace(/<title>[\s\S]*?<\/title>/,"<title>"+escape(seo.title)+"</title>");
   const values={"description":seo.description,"robots":seo.noIndex?"noindex, follow":"index, follow, max-image-preview:large","og:title":seo.title,"og:description":seo.description,"og:url":"https://pipadriven.com.br"+seo.path,"og:type":seo.type||"website","twitter:title":seo.title,"twitter:description":seo.description};
   for(const [key,value] of Object.entries(values)) {
     const attr=key.startsWith("og:")?"property":"name";
     const re=new RegExp('<meta '+attr+'="'+key+'" content="[^"]*"\\s*\\/>');
     if(!re.test(html))throw new Error("Missing metadata placeholder: "+key);
     html=html.replace(re,'<meta '+attr+'="'+key+'" content="'+escape(value)+'" />');
   }
   html=html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/,'<link rel="canonical" href="https://pipadriven.com.br'+seo.path+'" />');
   const json=JSON.stringify(seo.jsonLd).replaceAll("<","\\u003c");
   html=html.replace("<!-- route-schema -->",'<script type="application/ld+json" data-seo-route="true">'+json+'</script>');
   const file=route==="/404"?join(dist,"404.html"):join(dist,route,"index.html");
   await mkdir(dirname(file),{recursive:true});await writeFile(file,html);
   if((body.match(/<h1[ >]/g)||[]).length!==1)throw new Error(route+": expected exactly one h1.");
   if(!seo.noIndex&&body.replace(/<[^>]+>/g," ").length<800)throw new Error(route+": insufficient prerendered content.");
   console.log("HTML ready: "+route);
 }
 const origin="https://pipadriven.com.br";
 const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(r=>"  <url><loc>"+origin+r+"</loc></url>").join("\n")+"\n</urlset>\n";
 await writeFile(join(dist,"sitemap.xml"),sitemap);
 const llms="# PIPADriven\n\n> "+getPageSeo("/").description+"\n\n## Soluções e informações oficiais\n\n"+routes.filter(r=>r!=="/").map(r=>"- ["+getPageSeo(r).title.replace(" | PIPADriven","")+"]("+origin+r+"): "+getPageSeo(r).description).join("\n")+"\n\n## Escopo\n\nO canal do parceiro é separado do atendimento ao comprador. Disponibilidade, reservas, simulações e alçadas dependem das integrações e das regras do projeto. Os exemplos de conversa são ilustrativos.\n\n## Contato\n\n- Site: "+origin+"\n- E-mail: pipadriven@gmail.com\n- WhatsApp: https://wa.me/5547992663388\n";
 await writeFile(join(dist,"llms.txt"),llms);
 console.log(routes.length+" public routes + 404 rendered. Sitemap and llms.txt generated.");
} finally { await rm(serverDir,{recursive:true,force:true}); }
