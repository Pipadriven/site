import { Routes, Route } from "react-router-dom";
import { HomePage, SolutionPage, AboutPage, ContentPage, ArticlePage, PrivacyPage, NotFoundPage } from "@/components/PipaSite";
export default function App(){return <Routes><Route path="/" element={<HomePage/>}/><Route path="/solucoes/:slug" element={<SolutionPage/>}/><Route path="/sobre" element={<AboutPage/>}/><Route path="/conteudos" element={<ContentPage/>}/><Route path="/conteudos/:slug" element={<ArticlePage/>}/><Route path="/privacidade" element={<PrivacyPage/>}/><Route path="*" element={<NotFoundPage/>}/></Routes>;}
