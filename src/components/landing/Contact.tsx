import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Check, Loader2, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { solutions } from "@/data/solutions";
import { leadSchema, sendLead } from "@/lib/leads";
import { whatsappUrl, trackWhatsAppClick } from "@/lib/whatsapp";

export default function Contact({defaultSolution=""}:{defaultSolution?:string}) {
 const location=useLocation();
 const [data,setData]=useState({name:"",company:"",phone:""});
 const [solution,setSolution]=useState(defaultSolution);
 const [website,setWebsite]=useState("");
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
 const sending=useRef(false);
 useEffect(()=>{const query=new URLSearchParams(location.search).get("solution");setSolution(defaultSolution||solutions.find(s=>s.slug===query)?.title||"");},[defaultSolution,location.search]);
 async function submit(event:React.FormEvent<HTMLFormElement>) {
   event.preventDefault();if(sending.current)return;setErrors({});
   const parsed=leadSchema.safeParse(data);
   if(!parsed.success){const issues:Record<string,string>={};for(const err of parsed.error.errors)issues[String(err.path[0])]=err.message;setErrors(issues);setStatus("idle");const first=parsed.error.errors[0]?.path[0];document.getElementById("lead-"+String(first))?.focus();return;}
   if(website.trim()){setStatus("success");return;}
   sending.current=true;setStatus("loading");
   try{
     await sendLead(parsed.data,solution,{pagePath:location.pathname,search:location.search,referrer:document.referrer});
     const w=window as Window&{dataLayer?:Record<string,unknown>[]};w.dataLayer=w.dataLayer||[];w.dataLayer.push({event:"lead_form_submit",cta_origin:"contact_form",solution:solution||null,page_path:location.pathname});
     setStatus("success");setData({name:"",company:"",phone:""});
   }catch{setStatus("error");}finally{sending.current=false;}
 }
 return <section className="contact-section" id="contact"><div className="shell contact-grid"><div className="contact-copy"><p className="eyebrow"><span aria-hidden="true"/>A próxima etapa começa aqui</p><h2>Vamos olhar para<br/><em>a sua operação?</em></h2><p>Converse diretamente com a PIPA. Entendemos o seu cenário e mostramos onde nossas soluções podem fazer diferença.</p><ul><li><Check size={18}/>Diagnóstico do seu momento</li><li><Check size={18}/>Demonstração aplicada à sua realidade</li><li><Check size={18}/>Escopo alinhado às suas prioridades</li></ul><a className="text-link" href={whatsappUrl("hero")} target="_blank" rel="noopener noreferrer" onClick={()=>trackWhatsAppClick("hero")}><MessageSquare size={19}/>Prefiro conversar pelo WhatsApp<ArrowUpRight size={18}/></a></div><div className="contact-card">{status==="success"?<div className="form-success" role="status"><span><Check size={32}/></span><h3>Recebemos seu contato.</h3><p>A PIPA vai conversar com você sobre o seu cenário. Se preferir, continue pelo WhatsApp.</p><a className="cta" href={whatsappUrl("solution_detail",solution||"inteligência comercial")} target="_blank" rel="noopener noreferrer" onClick={()=>trackWhatsAppClick("solution_detail",solution)}>Abrir WhatsApp<ArrowUpRight size={18}/></a><button className="text-link" onClick={()=>setStatus("idle")}>Enviar outro contato</button></div>:<><p className="card-category">UM PRIMEIRO PASSO, SEM COMPLICAÇÃO</p><h3>Conte um pouco sobre você.</h3><noscript><p className="form-error">Para falar com a PIPA, <a href="https://wa.me/5547992663388">abra nosso WhatsApp</a>.</p></noscript><form onSubmit={submit} noValidate><div className="honeypot" aria-hidden="true"><label>Website<input name="website" value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off"/></label></div>{[{name:"name",label:"Seu nome",placeholder:"Como podemos te chamar?",auto:"name"},{name:"company",label:"Empresa",placeholder:"Nome da incorporadora",auto:"organization"},{name:"phone",label:"WhatsApp com DDD",placeholder:"(47) 99999-9999",auto:"tel"}].map(field=><div className="form-field" key={field.name}><label htmlFor={"lead-"+field.name}>{field.label}</label><Input id={"lead-"+field.name} name={field.name} type={field.name==="phone"?"tel":"text"} inputMode={field.name==="phone"?"tel":"text"} autoComplete={field.auto} maxLength={field.name==="phone"?25:field.name==="name"?100:200} required value={data[field.name as keyof typeof data]} onChange={e=>setData({...data,[field.name]:e.target.value})} placeholder={field.placeholder} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name]?"error-"+field.name:undefined}/>{errors[field.name]&&<p id={"error-"+field.name} className="field-error">{errors[field.name]}</p>}</div>)}<div className="form-field"><label htmlFor="lead-solution">O que você quer melhorar? <span>(opcional)</span></label><Select value={solution} onValueChange={setSolution}><SelectTrigger id="lead-solution" className="form-select"><SelectValue placeholder="Selecione uma frente"/></SelectTrigger><SelectContent>{solutions.map(s=><SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}<SelectItem value="Entender o melhor ponto de partida">Quero entender o melhor ponto de partida</SelectItem></SelectContent></Select></div>{status==="error"&&<p className="form-error" role="alert">Não conseguimos enviar agora. Tente novamente ou <a href={whatsappUrl("hero")} target="_blank" rel="noopener noreferrer">fale com a PIPA pelo WhatsApp</a>.</p>}<button className="cta form-submit" type="submit" disabled={status==="loading"}>{status==="loading"?<>Enviando<Loader2 className="spin" size={18}/></>:<>Quero conhecer a PIPA<ArrowRight size={18}/></>}</button><p className="form-privacy">Ao enviar, você solicita um contato da PIPA. Saiba como usamos as informações em <Link to="/privacidade">Privacidade</Link>.</p></form></>}</div></div></section>;
}
