import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "./App";
import { getPageSeo, routes } from "@/data/seo";
export { routes, getPageSeo };
export function render(path:string){return renderToString(<StaticRouter location={path}><App/></StaticRouter>);}
