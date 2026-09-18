import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scenesForQuality, scrollScrubTheme, type WalkthroughQuality } from "@/scroll-scrub-scenes";
type DeviceNavigator = Navigator & {connection?:{saveData?:boolean}};
export function AdaptiveWalkthrough({navigation}:{navigation?:ReactNode}){
 const [quality,setQuality]=useState<WalkthroughQuality>("high");
 const [navigationVisible,setNavigationVisible]=useState(true);
 useEffect(()=>{
  let previousY=window.scrollY;
  let distance=0;
  let direction=0;
  function onScroll(){
   const nextY=Math.max(0,window.scrollY);
   const delta=nextY-previousY;
   previousY=nextY;
   if(nextY<=180){setNavigationVisible(true);distance=0;return;}
   if(delta===0)return;
   const nextDirection=Math.sign(delta);
   if(nextDirection!==direction){distance=0;direction=nextDirection;}
   distance+=Math.abs(delta);
   if(distance>=(direction>0?220:12)){setNavigationVisible(direction<0);distance=0;}
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>window.removeEventListener("scroll",onScroll);
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
 return <ScrollScrub stageOverlay={navigationOverlay} pinnedCaptions scenes={scenes} theme={scrollScrubTheme} className="property-intro"/>;
}
