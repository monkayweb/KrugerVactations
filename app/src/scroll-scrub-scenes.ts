import { createElement } from "react";
import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = {accent:"#FFFFFF",background:"#111411",ink:"#FFFFFF",muted:"#B9BDB7"};
export type WalkthroughQuality = "high" | "balanced" | "lite";
const posters:Record<string,string> = {
  "01-high": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/e219dd7f-5be4-40d3-9209-75be58d0fe95.jpg",
  "01-mobile": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/f52335dd-003f-40a5-afe5-85a13dbdca8d.jpg",
  "01-lite": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/4f708aa7-bb63-4af3-8a3f-ddb0abab01aa.jpg",
  "02-high": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/ae76a599-8e54-4859-b798-256489466ba9.jpg",
  "02-mobile": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/bdf6c68c-7660-4e3a-a60e-fdf8ad48ce47.jpg",
  "02-lite": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/a3f26f99-49fe-461e-ae05-8f3176f85f08.jpg",
  "03-high": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/8a4763fd-cf03-4572-9be1-de91eb39b71f.jpg",
  "03-mobile": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/b0231909-541a-436d-ab34-35438bf0eb35.jpg",
  "03-lite": "https://d2ol7oe51mr4n9.cloudfront.net/user_3JUnWWdTEUGjltEgVIXvwKGtVtB/ad91db78-4021-4c05-b6b8-72b624b3ac78.jpg"
};
const descriptions = [
 ["A little closer\nto the wild.","01 — Arrive","A private retreat beneath the trees. Welcome to House 225B, Kruger Park Lodge."],
 ["Let the outside in.\nLeave the rush behind.","02 — Unwind","Open doors, timber decks and room to breathe. Settle into the slower side of the Lowveld."],
 ["Early starts.\nSlow breakfasts.","03 — Stay awhile","Coffee before the safari. Stories around the table. A place to make your own."]
];
export function scenesForQuality(quality:WalkthroughQuality):ScrollScrubScene[] {
 return descriptions.map(([title,label,body],index)=>{
 const n=String(index+1).padStart(2,"0");
 const desktopSuffix=quality==="high"?"high":quality==="balanced"?"mobile":"lite";
 const mobileSuffix=quality==="lite"?"lite":"mobile";
 return {id:index===0?"introduction":"walk-"+(index+1),label,title,body,kicker:index===0?"House 225B / Hazyview, South Africa":index===1?"Indoor comfort / Outdoor living":"Your stay / Your own pace",
 clip:"/tour-media/owner-"+n+"-"+desktopSuffix+".mp4",
 mobileClip:"/tour-media/owner-"+n+"-"+mobileSuffix+".mp4",
 poster:posters[n+"-"+desktopSuffix],
 mobilePoster:posters[n+"-"+mobileSuffix],
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
