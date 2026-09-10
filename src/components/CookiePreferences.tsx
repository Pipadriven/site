import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const KEY = "pipa-cookie-preference-v1";
const EVENT = "pipa-cookie-preferences";
type Consent = "accepted" | "essential";
type AnalyticsWindow = Window & { dataLayer?: unknown[]; pipaAnalyticsStarted?: boolean };
function readConsent():Consent|null {try {const v=localStorage.getItem(KEY);return v==="accepted"||v==="essential"?v:null;}catch{return null;}}
function startAnalytics() {
  if(!["pipadriven.com.br","www.pipadriven.com.br"].includes(window.location.hostname))return;
  const w=window as AnalyticsWindow;if(w.pipaAnalyticsStarted)return;w.pipaAnalyticsStarted=true;
  w.dataLayer=w.dataLayer||[];
  // The visitor accepts optional analytics and campaign measurement together.
  function gtag(..._args: unknown[]) { w.dataLayer!.push(arguments); }
  gtag("consent","default",{analytics_storage:"granted",ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"});
  w.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
  const script=document.createElement("script");script.id="pipa-gtm";script.async=true;
  script.src="https://www.googletagmanager.com/gtm.js?id=GTM-PGP7T657";document.head.appendChild(script);
}
export function openCookiePreferences(){window.dispatchEvent(new Event(EVENT));}
export function CookiePreferences(){
  const [open,setOpen]=useState(false);const [existing,setExisting]=useState<Consent|null>(null);
  useEffect(()=>{const current=readConsent();setExisting(current);setOpen(!current);if(current==="accepted")startAnalytics();const handler=()=>setOpen(true);window.addEventListener(EVENT,handler);return()=>window.removeEventListener(EVENT,handler);},[]);
  const choose=(value:Consent)=>{
    try{localStorage.setItem(KEY,value);}catch{/* Preferences remain usable in this page when storage is unavailable. */}
    const wasAccepted=existing==="accepted";setExisting(value);setOpen(false);
    if(value==="accepted")startAnalytics();
    else if(wasAccepted){
      const w=window as AnalyticsWindow;w.dataLayer=w.dataLayer||[];
      function gtag(..._args:unknown[]){w.dataLayer!.push(arguments);}
      gtag("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
      // A fresh document drops any tags already loaded by GTM; the saved choice prevents reload.
      window.location.reload();
    }
  };
  if(!open)return null;
  return <section className="cookie-banner" aria-label="Preferências de cookies"><div className="cookie-title"><strong>Sua navegação, sua escolha.</strong>{existing&&<button onClick={()=>setOpen(false)} aria-label="Fechar preferências"><X size={18}/></button>}</div><p>Usamos cookies opcionais para analisar visitas e medir campanhas. Você decide se quer ativá-los. <Link to="/privacidade">Saiba mais</Link></p><div><button className="cookie-button" onClick={()=>choose("essential")}>Apenas necessários</button><button className="cookie-button" onClick={()=>choose("accepted")}>Aceitar opcionais</button></div></section>;
}
