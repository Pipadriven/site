import { solutions } from "@/data/solutions";
import { articles } from "@/data/articles";
import { FAQ_HOME, type FaqItem } from "@/data/faq";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, UPDATED_AT } from "@/data/site";

export type PageSeo = {title:string;description:string;path:string;jsonLd:Record<string,unknown>;noIndex?:boolean;type?:"website"|"article"};
const orgId=SITE_URL+"/#organization";
export const ORGANIZATION = {
 "@type":"Organization","@id":orgId,name:SITE_NAME,alternateName:"PIPA Driven",url:SITE_URL+"/",
 logo:SITE_URL+"/favicon.png",description:SITE_DESCRIPTION,email:"pipadriven@gmail.com",
 areaServed:{"@type":"Country",name:"Brasil"},
 sameAs:["https://www.linkedin.com/company/pipa-driven/","https://www.instagram.com/pipadriven/"],
 knowsAbout:["inteligência comercial para incorporadoras","pré-vendas com inteligência artificial","gestão da rede de corretores parceiros","gestão de mídia imobiliária","indicadores comerciais"]
};
function breadcrumbs(path:string,label:string,parent?:{path:string;label:string}){
 const items=[{name:"Início",item:SITE_URL+"/"},...(parent?[{name:parent.label,item:SITE_URL+parent.path}]:[]),{name:label,item:SITE_URL+path}];
 return {"@type":"BreadcrumbList","@id":SITE_URL+path+"#breadcrumb",itemListElement:items.map((x,i)=>({"@type":"ListItem",position:i+1,...x}))};
}
function faqSchema(items:FaqItem[],path:string){return {"@type":"FAQPage","@id":SITE_URL+path+"#faq",mainEntity:items.map(x=>({"@type":"Question",name:x.pergunta,acceptedAnswer:{"@type":"Answer",text:x.resposta}}))};}
export function getPageSeo(rawPath:string):PageSeo{
 const path=rawPath==="/"?"/":rawPath.replace(/\/+$/,"");
 let title="PIPADriven | Inteligência comercial para incorporadoras",description=SITE_DESCRIPTION,type:"website"|"article"="website",noIndex=false;
 const graph:Record<string,unknown>[]=[ORGANIZATION,{"@type":"WebSite","@id":SITE_URL+"/#website",url:SITE_URL+"/",name:SITE_NAME,inLanguage:"pt-BR",publisher:{"@id":orgId}}];
 let label="Início";
 if(path==="/"){
   graph.push({"@type":"Service","@id":SITE_URL+"/#servicos",name:"Inteligência comercial para incorporadoras",provider:{"@id":orgId},description:SITE_DESCRIPTION,areaServed:{"@type":"Country",name:"Brasil"},hasOfferCatalog:{"@type":"OfferCatalog",name:"Soluções PIPADriven",itemListElement:solutions.map(s=>({"@type":"Offer",itemOffered:{"@type":"Service",name:s.title,url:SITE_URL+"/solucoes/"+s.slug,description:s.description}}))}},faqSchema(FAQ_HOME,path));
 }else{
  const s=solutions.find(s=>path==="/solucoes/"+s.slug),a=articles.find(a=>path==="/conteudos/"+a.slug);
  if(s){title=s.title+" para incorporadoras | PIPADriven";description=s.description;label=s.title;graph.push({"@type":"Service","@id":SITE_URL+path+"#service",name:s.title,serviceType:s.title,description:s.longDescription,url:SITE_URL+path,provider:{"@id":orgId},areaServed:{"@type":"Country",name:"Brasil"}},breadcrumbs(path,label),faqSchema(s.faq,path));}
  else if(a){title=a.title+" | PIPADriven";description=a.description;label=a.title;type="article";graph.push({"@type":"Article","@id":SITE_URL+path+"#article",headline:a.title,description:a.description,datePublished:UPDATED_AT,dateModified:UPDATED_AT,inLanguage:"pt-BR",author:{"@id":orgId},publisher:{"@id":orgId},mainEntityOfPage:{"@id":SITE_URL+path+"#webpage"},articleSection:a.category},breadcrumbs(path,label,{path:"/conteudos",label:"Conteúdos"}));}
  else if(path==="/sobre"){title="A PIPA | Tecnologia e inteligência comercial imobiliária";description="Conheça a visão da PIPADriven: tecnologia aplicada, relações próximas e dados para conectar a operação comercial de incorporadoras.";label="A PIPA";graph.push(breadcrumbs(path,label));}
  else if(path==="/conteudos"){title="Conteúdos sobre inteligência comercial imobiliária | PIPADriven";description="Perspectivas da PIPADriven sobre gestão da rede de corretores, atendimento, indicadores e decisões comerciais para incorporadoras.";label="Conteúdos";graph.push(breadcrumbs(path,label));}
  else if(path==="/privacidade"){title="Privacidade e preferências | PIPADriven";description="Informações sobre contato, navegação e preferências de cookies no site da PIPADriven.";label="Privacidade";graph.push(breadcrumbs(path,label));}
  else{title="Página não encontrada | PIPADriven";description="Este endereço não está disponível. Explore as soluções da PIPADriven.";noIndex=true;}
 }
 graph.push({"@type":path==="/sobre"?"AboutPage":path==="/conteudos"?"CollectionPage":"WebPage","@id":SITE_URL+path+"#webpage",url:SITE_URL+path,name:title,description,inLanguage:"pt-BR",isPartOf:{"@id":SITE_URL+"/#website"},about:{"@id":orgId}});
 return {title,description,path,jsonLd:{"@context":"https://schema.org","@graph":graph},noIndex,type};
}
export const HOME_SEO={title:"PIPADriven | Inteligência comercial para incorporadoras",description:SITE_DESCRIPTION,path:"/"};
export const HOME_JSONLD=getPageSeo("/").jsonLd;
export function getSolutionSeo(slug:string,fallbackTitle:string,fallbackDescription:string){const s=solutions.find(s=>s.slug===slug);const meta=getPageSeo("/solucoes/"+slug);return {title:s?meta.title:fallbackTitle,description:s?meta.description:fallbackDescription,term:{name:s?.title??fallbackTitle,description:s?.longDescription??fallbackDescription}};}
export const routes=["/",...solutions.map(s=>"/solucoes/"+s.slug),"/sobre","/conteudos",...articles.map(a=>"/conteudos/"+a.slug),"/privacidade"];
