import { createFileRoute } from "@tanstack/react-router";
import { HomeDetails } from "@/components/property/home-details";
import { AdaptiveWalkthrough } from "@/components/adaptive-walkthrough";

import { bookingUrl } from "@/property-data";
export const Route = createFileRoute("/")({component:Index});
function Brand(){return <a className="brand" href="#introduction" aria-label="Kruger Vacations home"><img className="brand-symbol" src="/assets/brand/kv.svg" alt="" width="1070" height="1410" aria-hidden="true"/><span className="brand-divider" aria-hidden="true"/><span className="brand-name">Kruger Vacations</span></a>}
function Index(){
 const structured=JSON.stringify({"@context":"https://schema.org","@type":"VacationRental",name:"Kruger Vacations House 225B",url:"https://kruger-vacations-house-225b.higgsfield.app/",description:"Three-bedroom self-catering home for up to six guests at Kruger Park Lodge in Hazyview.",telephone:"+27 71 899 4063",address:{"@type":"PostalAddress",streetAddress:"Kruger Park Lodge Estate, Portia Shabangu Road",addressLocality:"Hazyview",addressRegion:"Mpumalanga",postalCode:"1242",addressCountry:"ZA"},containsPlace:{"@type":"Accommodation",numberOfBedrooms:3,numberOfBathroomsTotal:3,occupancy:{"@type":"QuantitativeValue",value:6}}});
 return <><a href="#explore" className="skip-link">Skip walkthrough to room photos</a>

 <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:structured}}/>
 <AdaptiveWalkthrough navigation={<header className="site-header"><Brand/><nav aria-label="Main navigation"><a href="#introduction">Walkthrough</a><a href="#explore">The house</a><a href="#stay">Your stay</a><a className="nav-book" href={bookingUrl} target="_blank" rel="noopener noreferrer">Check availability<span aria-hidden="true">↗</span></a></nav></header>}/>
 <HomeDetails/>
 </main>
 <footer className="site-footer"><Brand/><div><p>House 225B, Kruger Park Lodge<br/>Hazyview, Mpumalanga, South Africa</p><a href="mailto:info@krugervacations.co.za">info@krugervacations.co.za</a><a href="tel:+27718994063">+27 71 899 4063</a></div><div className="footer-links"><a href="#facilities">Facilities</a><a href="#location">Location</a><a href="#reviews">Guest feedback</a><a href="#policies">Stay policies</a><a href="#contact">Contact</a><a href="#introduction">Back to the house ↑</a><small>© Kruger Vacations</small></div></footer></>;
}
