import { useRef, useState } from "react";
const photos = [
 {src:"/assets/stay/exterior.jpg",label:"The house",alt:"Brick and thatch exterior of House 225B"},
 {src:"/assets/stay/lounge.jpg",label:"Slow afternoons",alt:"Open-plan lounge at House 225B"},
 {src:"/assets/stay/bedroom.jpg",label:"Rest easy",alt:"Bedroom beneath the thatched roof at House 225B"},
 {src:"/assets/stay/patio.jpg",label:"Outside living",alt:"Private timber patio overlooking trees"},
 {src:"/assets/stay/kitchen.jpg",label:"Make yourself at home",alt:"Fully equipped self-catering kitchen"},
 {src:"/assets/stay/main-bedroom.jpg",label:"Main bedroom",alt:"Main bedroom beneath the thatched roof"},
 {src:"/assets/stay/queen.jpg",label:"Queen bedroom",alt:"Queen bedroom at House 225B"},
 {src:"/assets/stay/twin.jpg",label:"Twin bedroom",alt:"Two single beds in the twin bedroom"},
 {src:"/assets/stay/estate.jpg",label:"Estate golf course",alt:"Golf course at Kruger Park Lodge"},
 ...Array.from({length:13},(_,i)=>({src:`/assets/tour/photo-${String(i+1).padStart(2,"0")}.jpg`,label:["Garden approach","Wooden steps","Deck and dining","Entrance from deck","Lounge and kitchen","Lounge toward kitchen","Television wall","Lounge and stairway","View toward deck","Breakfast bar and lounge","Kitchen and sink","Kitchen toward lounge","Kitchen and hob"][i],alt:`House 225B property photograph ${i+1}`}))
];
export function PropertyGallery(){
 const [selected,setSelected]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null);
 function open(index:number){setSelected(index);dialog.current?.showModal()}
 function move(direction:number){setSelected(current=>(current+direction+photos.length)%photos.length)}
 const photo=photos[selected];
 return <section className="property-section gallery-section" aria-labelledby="gallery-title">
  <div className="section-heading"><span className="section-eyebrow">A closer look</span><h2 id="gallery-title">Picture your days here.</h2><p>Explore the house in photographs. Choose a view to open the full gallery.</p></div>
  <div className="property-photo-grid">{photos.slice(0,5).map((item,index)=><button type="button" key={item.src} onClick={()=>open(index)} aria-label={`Open gallery: ${item.label}`}><img src={item.src} srcSet={item.src.startsWith("/assets/stay/")?`${item.src.replace(".jpg","-800.jpg")} 800w, ${item.src} 1600w`:undefined} sizes="(max-width:700px) 90vw, 45vw" alt={item.alt} loading="lazy" width="1600" height="1065"/><span>{item.label}<span aria-hidden="true">↗</span></span></button>)}</div>
  <button type="button" className="gallery-open" onClick={()=>open(5)}>View all {photos.length} photographs <span aria-hidden="true">↗</span></button>
  <dialog ref={dialog} className="photo-lightbox" aria-label="House 225B photo gallery" onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close()}} onKeyDown={event=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}if(event.key==="ArrowRight"){event.preventDefault();move(1)}}}>
   <div className="lightbox-toolbar"><span>{selected+1} / {photos.length}</span><button type="button" aria-label="Close photo gallery" onClick={()=>dialog.current?.close()}>Close ×</button></div>
   <div className="lightbox-image"><button type="button" aria-label="Previous photograph" onClick={()=>move(-1)}>←</button><img src={photo.src} alt={photo.alt}/><button type="button" aria-label="Next photograph" onClick={()=>move(1)}>→</button></div>
   <p className="lightbox-caption" aria-live="polite">{photo.label}</p>
   <div className="lightbox-thumbnails" aria-label="Choose a photograph">{photos.map((item,index)=><button type="button" key={item.src} aria-label={item.label} aria-pressed={selected===index} onClick={()=>setSelected(index)}><img src={item.src} alt="" loading="lazy" width="96" height="64"/></button>)}</div>
  </dialog>
 </section>
}
