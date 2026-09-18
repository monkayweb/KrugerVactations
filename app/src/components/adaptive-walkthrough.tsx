import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scenesForQuality, scrollScrubTheme, type WalkthroughQuality } from "@/scroll-scrub-scenes";
type DeviceNavigator = Navigator & {connection?:{saveData?:boolean}};
export function AdaptiveWalkthrough({navigation}:{navigation?:ReactNode}){
 const [quality,setQuality]=useState<WalkthroughQuality>("high");
 const shellRef=useRef<HTMLDivElement>(null);
 const [loading,setLoading]=useState(true);
 const [navigationVisible,setNavigationVisible]=useState(true);
 useLayoutEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  let width=window.innerWidth;
  const update=()=>shell.style.setProperty("--walkthrough-height",`${window.innerHeight}px`);
  function onResize(){if(window.innerWidth!==width){width=window.innerWidth;update();}}
  update();
  window.addEventListener("resize",onResize);
  return()=>window.removeEventListener("resize",onResize);
 },[]);
 useEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  let visible=true;
  let inside=true;
  let anchor=window.scrollY;
  let heroEnd=0;
  const touch=window.matchMedia("(hover: none) and (pointer: coarse)");
  const mobile=window.matchMedia("(max-width: 860px)");
  function measure(){
   heroEnd=shell!.getBoundingClientRect().bottom+window.scrollY-(mobile.matches||touch.matches?parseFloat(shell!.style.getPropertyValue("--walkthrough-height")):window.innerHeight);
  }
  function show(next:boolean){
   if(visible===next)return;
   visible=next;
   setNavigationVisible(next);
  }
  function onScroll(){
   // Clamp Safari's rubber-band overscroll; it is not a direction change.
   const maxY=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
   const y=Math.min(maxY,Math.max(0,window.scrollY));
   const nextInside=y<heroEnd;
   if(!nextInside){inside=false;anchor=y;show(false);return;}
   if(!inside){inside=true;anchor=y;show(true);return;}
   if(y<=180){anchor=y;show(true);return;}
   if(visible){
    anchor=Math.min(anchor,y);
    if(y-anchor>=220){anchor=y;show(false);}
   }else{
    anchor=Math.max(anchor,y);
    if(anchor-y>=(mobile.matches?48:24)){anchor=y;show(true);}
   }
  }
  measure();onScroll();
  const observer=new ResizeObserver(measure);
  observer.observe(shell);
  window.addEventListener("resize",measure);
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>{observer.disconnect();window.removeEventListener("resize",measure);window.removeEventListener("scroll",onScroll);};
 },[]);
 useEffect(()=>{
  // Small screens already receive a dedicated 1080px clip. CPU count and
  // power-efficiency estimates are unreliable proxies for visual quality.
  const connection=(navigator as DeviceNavigator).connection;
  if(connection?.saveData)setQuality("lite");
 },[]);
 const scenes=useMemo(()=>scenesForQuality(quality),[quality]);
 useEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  let finished=false;
  function finish(){
   if(finished)return;
   finished=true;
   setLoading(false);
  }
  function check(){
   const first=shell!.querySelector<HTMLElement>("[data-scroll-scrub-layer]");
   const video=first?.querySelector("video");
   if(window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (video && video.readyState>=2) || first?.dataset.videoFailed==="true" ||
      window.scrollY>window.innerHeight*.5)finish();
  }
  check();
  const timer=window.setInterval(()=>{check();if(finished)window.clearInterval(timer);},100);
  const fallback=window.setTimeout(finish,12000);
  return()=>{window.clearInterval(timer);window.clearTimeout(fallback);};
 },[]);
 useEffect(()=>{
  if(loading || window.scrollY>=(shellRef.current?.offsetHeight??0)-window.innerHeight)return;
  const mobile=window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches;
  const hints=scenes.slice(1).map(scene=>{
   const link=document.createElement("link");
   link.rel="prefetch";
   link.as="fetch";
   link.href=mobile?scene.mobileClip??scene.clip:scene.clip;
   document.head.append(link);
   return link;
  });
  return()=>hints.forEach(link=>link.remove());
 },[scenes,loading]);
 const navigationOverlay=<div className="walkthrough-navigation" data-visible={navigationVisible} inert={!navigationVisible}>{navigation}</div>;
 return <div ref={shellRef} className="walkthrough-shell">{navigationOverlay}<div className="walkthrough-loader" data-loading={loading} inert={!loading} aria-hidden={!loading}>
  <div className="walkthrough-loader-content">
   <img src="/assets/brand/kv.svg" width="56" height="74" alt="" aria-hidden="true"/>
   <span className="walkthrough-loader-name">Kruger Vacations</span>
   <div role="status" aria-live="polite"><span className="walkthrough-loader-track" aria-hidden="true"/><p>Preparing your walkthrough</p></div>
   <a href="#explore" onClick={event=>{setLoading(false);const details=document.getElementById("explore");if(details){event.preventDefault();details.scrollIntoView({behavior:"instant",block:"start"});details.focus({preventScroll:true});}}}>See Details <span aria-hidden="true">↘</span></a>
  </div>
 </div><ScrollScrub pinnedCaptions scenes={scenes} theme={scrollScrubTheme} className="property-intro"/></div>;
}
