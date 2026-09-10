import assert from "node:assert/strict";
import { readFile, stat, mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const dist=join(root,"dist"),origin="https://pipadriven.com.br";
const sitemap=await readFile(join(dist,"sitemap.xml"),"utf8");
const paths=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.equal(paths.length,12,"The site must expose all 12 planned pages.");
const decode=s=>s.replace(/&#x([0-9a-f]+);/gi,(_,x)=>String.fromCodePoint(parseInt(x,16))).replace(/&#(\d+);/g,(_,x)=>String.fromCodePoint(+x)).replace(/&quot;/g,'"').replace(/&#x27;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
const plain=s=>decode(s.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ")).replace(/\s+/g," ").trim();
const pages=new Map();
for(const path of paths)pages.set(path,await readFile(join(dist,path,"index.html"),"utf8"));
const titles=new Set();let links=0,faqAnswers=0;
for(const [path,html] of pages){
 assert.match(html,/<html data-prerendered="true" lang="pt-BR">/);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+": one visible H1");
 const title=decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||"");assert.ok(title);assert.ok(!titles.has(title),"Duplicate title: "+title);titles.add(title);
 assert.ok(html.includes('<link rel="canonical" href="'+origin+path+'"'),path+": canonical");
 assert.ok(!html.includes('content="noindex'),path+": should be indexable");
 assert.ok(!/src="https:\/\/www\.googletagmanager\.com/.test(html),"GTM must be opt-in, not in initial HTML.");
 const text=plain(html);assert.ok(text.length>1000,path+": substantial server-rendered text");
 const scripts=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];assert.equal(scripts.length,1);
 const schema=JSON.parse(scripts[0][1]);assert.equal(schema["@context"],"https://schema.org");
 for(const node of schema["@graph"]){if(node["@type"]==="FAQPage")for(const q of node.mainEntity){assert.ok(text.includes(q.name),path+": question missing from HTML");assert.ok(text.includes(q.acceptedAnswer.text),path+": answer missing from HTML");faqAnswers++;}}
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,path+": duplicate HTML ids");
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=decode(match[1]);if(/^(mailto:|tel:|data:)/.test(value))continue;
  const url=new URL(value,origin+path);if(url.origin!==origin)continue;
  links++;
  if(pages.has(url.pathname)){
    if(url.hash)assert.ok(pages.get(url.pathname).includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'),path+": broken anchor "+value);
  }else {assert.ok((await stat(join(dist,url.pathname))).isFile(),path+": missing asset "+value);}
 }
}
const errorPage=await readFile(join(dist,"404.html"),"utf8");assert.match(errorPage,/content="noindex, follow"/);
const llms=await readFile(join(dist,"llms.txt"),"utf8");assert.ok(llms.startsWith("# PIPADriven"));assert.ok(llms.includes("rede-de-parceiros"));assert.ok(!llms.includes("<html"));
const robots=await readFile(join(dist,"robots.txt"),"utf8");assert.match(robots,/User-agent: OAI-SearchBot\s+Allow: \//);assert.ok(robots.includes(origin+"/sitemap.xml"));

// Check the real submission function with a mocked transport. Never contact n8n.
const tmp=join(root,".verify-tmp");await mkdir(tmp,{recursive:true});
try{
 const file=join(tmp,"leads.mjs");
 await build({entryPoints:[join(root,"src/lib/leads.ts")],outfile:file,bundle:true,platform:"node",format:"esm",packages:"external",define:{"import.meta.env.VITE_LEAD_WEBHOOK_URL":"undefined"}});
 const {leadSchema,sendLead}=await import(pathToFileURL(file).href);
 assert.equal(leadSchema.safeParse({name:"A",company:"",phone:"abc"}).success,false);
 assert.equal(leadSchema.safeParse({name:"Exemplo",company:"Empresa exemplo",phone:""}).success,false);
 const data={name:" Exemplo de teste ",company:" Empresa de teste ",phone:"(47) 99999-0000"};
 let captured=null;
 await sendLead(data,"Gestão da rede de parceiros",{endpoint:"https://example.invalid/lead",pagePath:"/solucoes/rede-de-parceiros",search:"?utm_source=teste&utm_campaign=rede&irrelevant=ignore",referrer:"https://example.invalid/origem?private=omit",fetcher:async(url,init)=>{captured={url,init,payload:JSON.parse(init.body)};return {ok:true,status:204};}});
 assert.equal(captured.payload.nome,"Exemplo de teste");assert.equal(captured.payload.empresa,"Empresa de teste");assert.equal(captured.payload.solucao,"Gestão da rede de parceiros");assert.equal(captured.payload.origem,"site_formulario");assert.equal(captured.payload.referrer,"https://example.invalid/origem");assert.equal(captured.payload.campanha.utm_campaign,"rede");assert.equal(captured.payload.campanha.irrelevant,undefined);assert.ok(captured.init.signal);
 await assert.rejects(()=>sendLead(data,null,{endpoint:"http://example.invalid",fetcher:async()=>{throw new Error("Transport should not run");}}),/invalid endpoint/);
 await assert.rejects(()=>sendLead(data,null,{fetcher:async()=>({ok:false,status:500})}),/lead request failed/);
 await assert.rejects(()=>sendLead(data,null,{fetcher:async()=>{throw new TypeError("Network unavailable");}}),/Network unavailable/);
 console.log("Submission validation, original payload fields, UTM handling and failure states: passed (mocked).");
}finally{await rm(tmp,{recursive:true,force:true});}
console.log(paths.length+" routes, "+links+" internal links/assets and "+faqAnswers+" FAQ answers verified. No live leads sent.");
