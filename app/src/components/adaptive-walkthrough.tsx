import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scenesForQuality, scrollScrubTheme, type WalkthroughQuality } from "@/scroll-scrub-scenes";
type DeviceNavigator = Navigator & {deviceMemory?:number;connection?:{saveData?:boolean;effectiveType?:string;downlink?:number}};
export function AdaptiveWalkthrough({navigation}:{navigation?:ReactNode}){
 const [quality,setQuality]=useState<WalkthroughQuality|null>(null);
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
  let cancelled=false;
  async function choose(){
   const n=navigator as DeviceNavigator;
   const connection=n.connection;
   const slow=connection?.saveData || ["slow-2g","2g","3g"].includes(connection?.effectiveType??"") || (connection?.downlink!==undefined && connection.downlink<2);
   const limited=(n.deviceMemory!==undefined && n.deviceMemory<=4) || (n.hardwareConcurrency>0 && n.hardwareConcurrency<=4);
   let next:WalkthroughQuality=slow||limited?"lite":window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)").matches?"balanced":"high";
   if(next==="high" && !n.mediaCapabilities?.decodingInfo)next="balanced";
   if(next==="high" && n.mediaCapabilities?.decodingInfo){
    try {
     const decoder=await Promise.race([
      n.mediaCapabilities.decodingInfo({type:"file",video:{contentType:'video/mp4; codecs="avc1.640032"',width:1920,height:1278,bitrate:5000000,framerate:48}}),
      new Promise<null>(resolve=>setTimeout(()=>resolve(null),700))
     ]);
     if(!decoder?.supported || !decoder.smooth || !decoder.powerEfficient)next="balanced";
    }catch{next="balanced"}
   }
   if(!cancelled)setQuality(next);
  }
  void choose();return()=>{cancelled=true};
 },[]);
 const scenes=useMemo(()=>quality?scenesForQuality(quality):null,[quality]);
 const navigationOverlay=<div className="walkthrough-navigation" data-visible={navigationVisible} inert={!navigationVisible}>{navigation}</div>;
 return scenes?<ScrollScrub stageOverlay={navigationOverlay} pinnedCaptions scenes={scenes} theme={scrollScrubTheme} className="property-intro"/>:
 <div className="walkthrough-loading" aria-label="House 225B walkthrough">{navigationOverlay}<img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/4f708aa7-bb63-4af3-8a3f-ddb0abab01aa.jpg" alt="House 225B beneath the trees" fetchPriority="high"/><span>Scroll to explore ↓</span></div>;
}
