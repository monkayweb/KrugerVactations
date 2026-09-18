# Original-site content audit

Source: https://www.krugervacations.co.za/
Checked 18 September 2026. Read homepage, about.html, stay.html, location.html, reviews.html, policies.html and book.html/contact.html directly via HTTP.

| Source | Coverage in local site |
| --- | --- |
| Home | Brand, House 225B description, guest/bedroom/bathroom capacity, property gallery, Wi-Fi, pools, golf, facilities, attractions, direct booking benefits, address and directions. Reviews contextualised below. |
| About | Self-catering estate overview, family/group use, king/en-suite, queen and twins, three bathrooms, air conditioning, kitchen, patio/braai, Wi-Fi, TV and parking. |
| Stay | Bedroom detail, open-plan lounge/dining/kitchen, private patio and braai, house amenities, estate facilities, safari and attraction planning. |
| Location | Full address, Google Maps, all listed attractions, approximate distances/times, golf club, airport, theatre, shops and restaurants. Conflicting figures carried as ranges. |
| Reviews | Six named guest-feedback summaries and country attributions; original overall and category numbers available in review-context disclosure. Homepage Johnson Family attribution and five-star displays contextualised. No aggregateRating or review schema. |
| Policies | Full arrival/departure windows, arrival notice, cancellation/prepayment, deposit amount/timing/refund/inspection, children, cot conflict, age rule, cards/no cash, no smoking/parties/pets, balcony context, family amenities, current-rate guidance and special requests. |
| Contact | Email, telephone, booking engine and enquiry guidance. Working email/phone links use displayed values. |
| Book | Booking engine plus link to original direct-enquiry form. Enquiry guidance includes dates, adults, children/ages, requests and contact details. Do not call an enquiry a confirmed reservation. |

## Source inconsistencies preserved or corrected

- contact.html displays info@krugervacations.co.za but links to bookings@krugervacations.co.za. Local link uses the displayed address.
- contact.html displays +27 71 899 4063 but links to placeholder +27000000000. Local link uses the displayed number.
- policies.html both offers a free cot for ages 0–3 and says cots/extra beds are unavailable. Local policy states the contradiction and asks guests to confirm availability.
- Hazyview centre is listed as 1.5 km on location.html and 1.9 km on policies.html. Local distance is approximate 1.5–1.9 km.
- Sabie River is listed as both 5 and 6 km. Local distance is approximate 5–6 km.
- General elephant encounters have an 8 km / 15 min estimate; Elephant Whispers has a separate 25-minute walking estimate. Kept distinct.
- Review provenance is incomplete and mixes property/estate context. Summaries and original numbers are explicitly attributed to the original site.
- About lists queen bedroom with its own bathroom; Stay only promises bathroom access. Local wording conservatively states bathroom access and three bathrooms overall.

## External actions

No booking, enquiry or message was sent. Original booking/contact forms are not reposted to an unverified backend; direct enquiries use the existing original form or email, and confirmed dates/rates use NightsBridge.

## Homepage redesign

Reorganised into overview, one consolidated 22-photo gallery, bedroom selector, estate explorer, grouped local destinations, guest review carousel, policies, date-based NightsBridge booking and contact. Content data remains in stay-content.ts. No hero files were changed in this redesign. Room and estate photographs come from original-site paths in js/config.js; 1600px property originals and 1024px estate images are retained locally, with 800px responsive copies. Actual photographs were inspected before selecting room and estate imagery.
