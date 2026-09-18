import { createFileRoute } from "@tanstack/react-router";
import { tourMedia } from "@/tour-media";
async function serve(request:Request,clip:string,head=false){
 const url=tourMedia[clip];
 if(!url)return new Response("Not found",{status:404});
 const headers=new Headers();
 const range=request.headers.get("Range");
 if(range&&/^bytes=\d*-\d*$/.test(range))headers.set("Range",range);
 const response=await fetch(url,{method:head?"HEAD":"GET",headers,signal:request.signal});
 if(!response.ok)return new Response("Tour media temporarily unavailable",{status:response.status===404?404:502});
 const out=new Headers({"Content-Type":"video/mp4","Cache-Control":"public, max-age=31536000, immutable","Accept-Ranges":"bytes","X-Content-Type-Options":"nosniff"});
 for(const key of ["Content-Length","Content-Range","ETag","Last-Modified"]){const value=response.headers.get(key);if(value)out.set(key,value);}
 return new Response(head?null:response.body,{status:response.status,headers:out});
}
export const Route=createFileRoute("/tour-media/$clip")({server:{handlers:{
 GET:({request,params})=>serve(request,params.clip),
 HEAD:({request,params})=>serve(request,params.clip,true)
}}});
