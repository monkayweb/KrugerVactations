import { useState } from "react";
import { PropertyGallery } from "./property-gallery";
import { bookingUrl } from "@/property-data";

const houseAmenities = ["Air conditioning", "Fully equipped kitchen", "Dining area", "Smart TV", "Free Wi-Fi", "Parking", "Private patio", "Braai / BBQ area"];
const estateAmenities = ["Swimming pools", "Restaurant and bar", "9-hole golf course", "Tennis courts and equipment", "Mini golf", "Children’s play area", "24-hour reception", "Gardens and estate grounds"];
const destinations = [
 ["Kruger National Park / Phabeni Gate", "Approx. 20 km / 20 min", "Safari and game-drive days, with Paul Kruger Gate also around 28 km away."],
 ["Panorama Route", "Approx. 55 km / 55 min", "Scenic drives and Lowveld day trips."],
 ["Blyde River Canyon", "Approx. 60 km / 1 hour", "Canyon scenery and viewpoints."],
 ["Sabie River", "Approx. 5–6 km / 10 min", "River trails, picnics and river scenery."],
 ["Elephant experiences", "Approx. 8 km / 15 min", "Local elephant encounters; Elephant Whispers is separately listed as a 25-minute walk."],
 ["Hazyview town centre", "Approx. 1.5–1.9 km", "Shops, cafés and everyday essentials."],
 ["Kruger Park Lodge Golf Club", "Less than 1 km", "Golf within the estate setting."],
 ["Kruger Mpumalanga Airport", "Approx. 48 km", "A regional arrival point for the Lowveld."],
 ["The Barnyard Theatre", "Approx. 36 km", "An additional outing listed by the original site."],
 ["Restaurants and shopping", "Dining: 5–10 km / shopping: within 4 km", "Local dining, Hazyview Plaza and local markets."],
 ["Adventure activities", "Nearby", "Ziplining, rafting and quad biking around Hazyview."],
];
const feedback = [
 ["Martynas", "Lithuania", "Enjoyed the location, golf setting and comfortable accommodation."],
 ["Tamaryn", "South Africa", "Highlighted the estate location, pool and spacious rooms."],
 ["Ngetani", "South Africa", "Described a family-friendly stay with the comforts of home."],
 ["Spinazze", "South Africa", "Praised the cleanliness, upkeep and well-equipped property."],
 ["Susanna", "Canada", "Appreciated being close to Kruger and having resort amenities."],
 ["Anton", "Germany", "Enjoyed the estate wildlife, cottage space and private BBQ area."],
];
const policies = [
 ["Arrival & departure", "Check-in is from 16:00 to 21:00. Let the property know your arrival time in advance. Check-out is from 06:00 to 10:00. There is no minimum age requirement for check-in."],
 ["Cancellation & prepayment", "Conditions depend on the accommodation option and booking policy you choose. Review your selected rate’s cancellation and prepayment terms in NightsBridge before booking."],
 ["Refundable damage deposit", "A ZAR 2,000 deposit is required, charged to a credit card seven days before arrival. It is refundable to the credit card within 14 days of check-out, subject to a property inspection."],
 ["Children, cots & extra beds", "Children of all ages are welcome. Include the number of children and their ages when checking rates. The original site lists a free cot on request for ages 0–3, but also says cots and extra beds are unavailable. Confirm cot availability directly before booking; do not assume an extra bed is available."],
 ["Payments", "The original site lists American Express, Visa and Mastercard as accepted cards. Cash is not accepted."],
 ["Smoking, parties & pets", "Smoking, pets, parties and events are not allowed. This includes hen, stag and similar parties."],
 ["Pools, balconies & family stays", "Estate swimming pools and an on-site restaurant are available. The original site notes that some units have private balconies; confirm the booked unit’s balcony arrangement. House 225B has three bedrooms for a maximum of six guests and is suited to families."],
 ["Rates & special requests", "Prices vary with travel dates and the selected booking policy. Use NightsBridge for current rates, enter your full party details, and contact the property for special requests, arrival help or direct-booking support."],
];

export function StayDetails(){
 const [amenities,setAmenities]=useState<"house"|"estate">("house");
 const [destinationFilter,setDestinationFilter]=useState("All");
 const groups:Record<string,number[]>={"All":destinations.map((_,i)=>i),"Nature & safari":[0,1,2,3,4,10],"Leisure":[6,8],"Essentials":[5,7,9]};
 return <>
 <PropertyGallery/>
 <section className="property-section" id="facilities" aria-labelledby="facilities-title">
  <div className="section-heading"><span className="section-eyebrow">Space to settle in</span><h2 id="facilities-title">All the comforts. A little more freedom.</h2><p>A private self-catering home with the leisure facilities of Kruger Park Lodge Estate.</p></div>
  <div className="bedroom-details">
   <article><span className="section-eyebrow">01 / Main bedroom</span><h3>A private retreat.</h3><p>King bed with an en-suite bathroom, ideal for the lead couple and early safari mornings.</p></article>
   <article><span className="section-eyebrow">02 / Queen bedroom</span><h3>Room for two.</h3><p>A queen bed for a second couple or adult guests, with bathroom access for a comfortable shared stay.</p></article>
   <article><span className="section-eyebrow">03 / Twin bedroom</span><h3>A space to share.</h3><p>Twin beds for children, siblings or friends. Three bathrooms across the house help everyone get ready.</p></article>
  </div>
  <div className="amenity-switch" role="group" aria-label="Explore amenities"><button type="button" aria-pressed={amenities==="house"} onClick={()=>setAmenities("house")}>In your house</button><button type="button" aria-pressed={amenities==="estate"} onClick={()=>setAmenities("estate")}>Across the estate</button></div>
  <div className="amenity-explorer">
   <img src={amenities==="house"?"/assets/property/kitchen.avif":"/assets/property/exterior.avif"} alt={amenities==="house"?"Self-catering kitchen at House 225B":"House 225B within Kruger Park Lodge Estate"} width="768" height="511" loading="lazy"/>
   <div key={amenities} className="amenity-panel" aria-live="polite"><span className="section-eyebrow">{amenities==="house"?"Your private space":"Beyond your front door"}</span><h3>{amenities==="house"?"Everything for an easy stay.":"Make a day of staying in."}</h3><p>{amenities==="house"?"Open-plan lounge, dining and kitchen, with outdoor living on the private patio.":"Make time for pool days, golf, dining and family activities between adventures."}</p><ul>{(amenities==="house"?houseAmenities:estateAmenities).map(item=><li key={item}>{item}</li>)}</ul></div>
  </div>
 </section>
 <section className="property-section location-section" id="location" aria-labelledby="location-title">
  <div className="section-heading"><span className="section-eyebrow">Hazyview / The Lowveld</span><h2 id="location-title">Close to the wild. Plenty to explore.</h2><p>House 225B, Kruger Park Lodge Estate, Portia Shabangu Road, Hazyview, Mpumalanga 1242, South Africa.</p><a className="detail-link" href="https://www.google.com/maps/search/?api=1&query=Kruger+Park+Lodge+Hazyview+Mpumalanga" target="_blank" rel="noopener noreferrer">Get directions ↗</a></div>
  <div className="destination-filters" role="group" aria-label="Filter nearby places">{Object.keys(groups).map(group=><button key={group} type="button" aria-pressed={destinationFilter===group} onClick={()=>setDestinationFilter(group)}>{group}</button>)}</div>
  <div className="destination-grid" aria-live="polite">{destinations.filter((_,index)=>groups[destinationFilter].includes(index)).map(([name,distance,description])=><article key={name}><h3>{name}</h3><span className="destination-distance">{distance}</span><p>{description}</p><a className="destination-map" href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(name+" Hazyview South Africa")} target="_blank" rel="noopener noreferrer">Explore on Maps ↗</a></article>)}</div>
  <p className="source-note">Distances and times are the original site’s approximate planning guidance, rather than guaranteed journeys. Its Sabie River and town-centre distances differ between pages. Confirm routes and allow for weather, traffic and safari gate queues.</p>
 </section>
 <section className="property-section" id="reviews" aria-labelledby="reviews-title">
  <div className="section-heading"><span className="section-eyebrow">Guest impressions</span><h2 id="reviews-title">A place people remember.</h2><p>The original site summarises public feedback connected to House 225B and Kruger Park Lodge. These are summaries of that feedback.</p></div>
  <div className="feedback-grid">{feedback.map(([name,country,summary])=><article key={name}><p>{summary}</p><span>{name} · {country}</span></article>)}</div>
  <details className="property-disclosure"><summary>Ratings and review context</summary><p>The original site lists an overall summary of 8.8, with location 8.7, comfort 8.5, cleanliness 8.4 and facilities 8.2. It does not identify exact platforms or review dates, and says individual sources should be confirmed. Its homepage also attributes a location and golf testimonial to “The Johnson Family”, alongside feedback from Tamaryn and Spinazze, with five-star displays. These figures and attributions are reproduced here as original-site context; no verified rating or review schema is claimed.</p><a className="detail-link" href="https://www.krugervacations.co.za/reviews.html" target="_blank" rel="noopener noreferrer">Original review page ↗</a></details>
 </section>
 <section className="property-section" id="policies" aria-labelledby="policies-title">
  <div className="section-heading"><span className="section-eyebrow">Before you arrive</span><h2 id="policies-title">The details that make a stay easy.</h2><p>Arrival times, house rules and booking information for House 225B.</p></div>
  {policies.map(([title,body])=><details className="property-disclosure" key={title}><summary>{title}</summary><p>{body}</p></details>)}
 </section>
 <section className="property-section contact-section" id="contact" aria-labelledby="contact-title">
  <div className="section-heading"><span className="section-eyebrow">Plan your escape</span><h2 id="contact-title">Let’s make it your stay.</h2><p>Ask about dates, family or group stays, safari timing, longer visits and special requests. For direct enquiries, include arrival and departure dates, adults, children and their ages, and your contact details.</p></div>
  <div className="contact-options"><a className="detail-link" href="mailto:info@krugervacations.co.za?subject=House%20225B%20booking%20enquiry">info@krugervacations.co.za ↗</a><a className="detail-link" href="tel:+27718994063">+27 71 899 4063 ↗</a><a className="detail-link" href="https://www.krugervacations.co.za/book.html" target="_blank" rel="noopener noreferrer">Direct booking enquiry ↗</a><a className="details-cta" href={bookingUrl} target="_blank" rel="noopener noreferrer">Check availability <span aria-hidden="true">↗</span></a></div>
  <p className="source-note">Kruger Vacations offers direct booking, a spacious home for six, self-catering flexibility and estate pools, golf and dining. Book through the property’s NightsBridge engine for live dates and rates. A direct enquiry is a request for availability and next steps, rather than a confirmed reservation.</p>
 </section>
 </>}
