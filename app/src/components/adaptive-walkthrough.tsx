import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scenesForQuality, scrollScrubTheme, type WalkthroughQuality } from "@/scroll-scrub-scenes";
type DeviceNavigator = Navigator & {connection?:{saveData?:boolean}};
export function AdaptiveWalkthrough({navigation}:{navigation?:ReactNode}){
 const [quality,setQuality]=useState<WalkthroughQuality>("high");
 const shellRef=useRef<HTMLDivElement>(null);
 const [navigationVisible,setNavigationVisible]=useState(true);
 useEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  let visible=true;
  let inside=true;
  let anchor=window.scrollY;
  let heroEnd=0;
  const mobile=window.matchMedia("(max-width: 860px)");
  function measure(){
   heroEnd=shell!.getBoundingClientRect().bottom+window.scrollY-window.innerHeight;
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
 },[scenes]);
 const navigationOverlay=<div className="walkthrough-navigation" data-visible={navigationVisible} inert={!navigationVisible}>{navigation}</div>;
 return <div ref={shellRef} className="walkthrough-shell">{navigationOverlay}<ScrollScrub pinnedCaptions scenes={scenes} theme={scrollScrubTheme} className="property-intro"/></div>;
}
