import { z } from "zod";

export const leadSchema = z.object({
  name:z.string().trim().min(2,"Informe seu nome.").max(100,"Use até 100 caracteres."),
  company:z.string().trim().min(2,"Informe a empresa.").max(200,"Use até 200 caracteres."),
  phone:z.string().trim().max(25,"Confira o telefone.").refine(v=>/^[+\d\s().-]+$/.test(v)&&v.replace(/\D/g,"").length>=10&&v.replace(/\D/g,"").length<=15,"Informe um WhatsApp válido, incluindo o DDD."),
});
export type LeadData=z.infer<typeof leadSchema>;
export const DEFAULT_LEAD_WEBHOOK="https://pipadriven-n8n-webhook.5kksqf.easypanel.host/webhook/lead-site";
export async function sendLead(data:LeadData,solution:string|null,options:{endpoint?:string;fetcher?:typeof fetch;pagePath?:string;referrer?:string;search?:string}={}) {
  const validated=leadSchema.parse(data);
  const endpoint=options.endpoint??import.meta.env.VITE_LEAD_WEBHOOK_URL??DEFAULT_LEAD_WEBHOOK;
  if(!endpoint||!/^https:\/\//.test(endpoint))throw new Error("invalid endpoint");
  const params=new URLSearchParams(options.search??"");const campaign:Record<string,string>={};
  for(const key of ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"]) {const value=params.get(key);if(value)campaign[key]=value.slice(0,200);}
  let referrer:string|null=null;
  if(options.referrer){try{const url=new URL(options.referrer);referrer=url.origin+url.pathname;}catch{/* Ignore malformed referrers. */}}
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
  try {
    const response=await (options.fetcher??fetch)(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},signal:controller.signal,body:JSON.stringify({nome:validated.name,empresa:validated.company,telefone:validated.phone,origem:"site_formulario",solucao:solution||null,pagina:options.pagePath??"/",referrer,campanha:campaign,enviado_em:new Date().toISOString()})});
    if(!response.ok)throw new Error("lead request failed");
  }finally{clearTimeout(timeout);}
}
