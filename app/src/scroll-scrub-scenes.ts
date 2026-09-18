import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = {accent:"#FFFFFF",background:"#111411",ink:"#FFFFFF",muted:"#B9BDB7"};
export type WalkthroughQuality = "high" | "balanced" | "lite" | "phone";
const descriptions = [
 ["A little closer\nto the wild.","01 — Arrive","A private retreat beneath the trees. Welcome to House 225B, Kruger Park Lodge."],
 ["Let the outside in.\nLeave the rush behind.","02 — Unwind","Open doors, timber decks and room to breathe. Settle into the slower side of the Lowveld."],
 ["Early starts.\nSlow breakfasts.","03 — Stay awhile","Coffee before the safari. Stories around the table. A place to make your own."]
];
export function scenesForQuality(quality:WalkthroughQuality):ScrollScrubScene[] {
 return descriptions.map(([title,label,body],index)=>{
 const n=String(index+1).padStart(2,"0");
 const desktopSuffix=quality==="lite"?"data":"desktop";
 const mobileSuffix=quality==="lite"?"data":quality==="phone"?"phone":"mobile";
 return {id:index===0?"introduction":"walk-"+(index+1),label,title,body,kicker:index===0?"House 225B / Hazyview, South Africa":index===1?"Indoor comfort / Outdoor living":"Your stay / Your own pace",
 clip:"/assets/hero/walk-"+n+"-"+desktopSuffix+"-v2.mp4",
 mobileClip:"/assets/hero/walk-"+n+"-"+mobileSuffix+(quality==="lite"?"-v2.mp4":"-v4.mp4"),
 poster:"/assets/hero/walk-"+n+"-"+desktopSuffix+"-v2.jpg",
 mobilePoster:"/assets/hero/walk-"+n+"-"+mobileSuffix+(quality==="lite"?"-v2.jpg":"-v4.jpg"),
 scroll:4,objectPosition:"50% 50%",mobileObjectPosition:"50% 50%",
 actions:createElement("a",{
  className:"hero-explore",href:"#explore",
  onClick:(event)=>{
   const details=document.getElementById("explore");
   if(details){event.preventDefault();details.scrollIntoView({behavior:"instant",block:"start"});details.focus({preventScroll:true});}
  }
 },"See Details",createElement("span",{"aria-hidden":true},"↘"))};
 });
}
