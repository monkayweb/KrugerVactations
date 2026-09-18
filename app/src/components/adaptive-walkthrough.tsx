import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scenesForQuality, scrollScrubTheme, type WalkthroughQuality } from "@/scroll-scrub-scenes";
import mediaSizes from "@/hero-media-sizes.json";
type DeviceNavigator = Navigator & {connection?:{saveData?:boolean}};
export function AdaptiveWalkthrough({navigation}:{navigation?:ReactNode}){
 const [quality,setQuality]=useState<WalkthroughQuality>("high");
 const [deviceReady,setDeviceReady]=useState(false);
 const shellRef=useRef<HTMLDivElement>(null);
 const [loading,setLoading]=useState(true);
 const [failed,setFailed]=useState(false);
 const [progress,setProgress]=useState(0);
 const [attempt,setAttempt]=useState(0);
 const [navigationVisible,setNavigationVisible]=useState(true);
 useLayoutEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  let width=window.innerWidth;
  const update=()=>shell.style.setProperty("--walkthrough-height",`${window.innerHeight}px`);
  function onResize(){if(window.innerWidth!==width){width=window.innerWidth;update();}}
  update();
  const saveData=(navigator as DeviceNavigator).connection?.saveData;
  setQuality(window.innerWidth<=600 && window.innerHeight>window.innerWidth?"phone":saveData?"lite":"high");
  setDeviceReady(true);
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
 const scenes=useMemo(()=>scenesForQuality(quality),[quality]);
 useEffect(()=>{
  const shell=shellRef.current;
  if(!shell)return;
  function check(){
   if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setLoading(false);return true;}
   const layers=Array.from(shell!.querySelectorAll<HTMLElement>("[data-scroll-scrub-layer]"));
   const mobile=window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches;
   const total=scenes.reduce((sum,scene)=>sum+(mediaSizes[(mobile?scene.mobileClip??scene.clip:scene.clip).split("/").pop()! as keyof typeof mediaSizes]??0),0);
   const received=layers.reduce((sum,layer)=>sum+Number(layer.dataset.videoDownloadedBytes??0),0);
   const ready=layers.filter(layer=>layer.dataset.videoDownloaded==="true" && (layer.querySelector("video")?.readyState??0)>=1).length;
   setProgress(total?Math.min(99,Math.floor(received/total*100)):0);
   setFailed(layers.some(layer=>layer.dataset.videoFailed==="true"));
   if(layers.length===scenes.length && ready===scenes.length){setFailed(false);setProgress(100);setLoading(false);return true;}
   return false;
  }
  if(check())return;
  const timer=window.setInterval(()=>{if(check())window.clearInterval(timer);},100);
  return()=>window.clearInterval(timer);
 },[scenes,attempt]);
 const navigationOverlay=<div className="walkthrough-navigation" data-visible={navigationVisible} inert={!navigationVisible}>{navigation}</div>;
 return <div ref={shellRef} className="walkthrough-shell">{navigationOverlay}<div className="walkthrough-loader" data-loading={loading} inert={!loading} aria-hidden={!loading}>
  <div className="walkthrough-loader-content">
   <div className="walkthrough-loader-progress">
    <div className="walkthrough-loader-track" role="progressbar" aria-label="Loading walkthrough" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{width:`${progress}%`}}/></div>
    <span className="walkthrough-loader-percent">{progress}%</span>
    {failed && <p role="alert">A clip couldn’t load. Please try again.</p>}
   </div>
   {failed && <button className="walkthrough-retry" onClick={()=>{setProgress(0);setFailed(false);setLoading(true);setAttempt(value=>value+1);}}>Try again</button>}

  </div>
 </div>{deviceReady?<ScrollScrub key={attempt} preloadAll pinnedCaptions scenes={scenes} theme={scrollScrubTheme} className="property-intro"/>:<div className="walkthrough-preparing" aria-hidden="true"/>}</div>;
}
