import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users } from "lucide-react";
import Gallery from "../components/Gallery";

// ---------------------- HERO SLIDES ----------------------
const heroSlides = [
  {
    image: "/gallery/Galle.png",
    title: "Sigiriya Rock Fortress",
    subtitle: "Ancient wonders meet natural beauty",
    location: "Central Province"
  },
  {
    image: "/gallery/Ella.png",
    title: "Pristine Beaches",
    subtitle: "Crystal waters and golden sands",
    location: "Southern Coast"
  },
  {
    image: "/gallery/Ella.png",
    title: "Tea Plantations",
    subtitle: "Rolling hills of emerald green",
    location: "Hill Country"
  },
  {
    image: "/gallery/Ella.png",
    title: "Wildlife Safari",
    subtitle: "Encounter majestic elephants",
    location: "Yala National Park"
  },
];

// ---------------------- PACKAGES ----------------------
const packages = [
  {
    title: "Cultural Triangle",
    desc: "Explore ancient cities, temples, and UNESCO World Heritage sites across Sri Lanka's cultural heartland.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    days: "5 Days",
    people: "2-8"
  },
  {
    title: "Coastal Retreat",
    desc: "Relax on pristine beaches, enjoy water sports, and witness stunning ocean sunsets.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    days: "7 Days",
    people: "2-6"
  },
  {
    title: "Hill Country Escape",
    desc: "Journey through tea plantations, misty mountains, and colonial-era towns.",
    image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=800&q=80",
    days: "4 Days",
    people: "2-10"
  },
];

// ---------------------- INTERACTIVE MAP CATEGORIES ----------------------
const categories = [
  {
    name: "Popular Beaches",
    image: "/beach.png",
    locations: [
      { x: 35, y: 95, label: "Mirissa" },
      { x: 65, y: 35, label: "Marble Beach" },
      { x: 25, y: 89, label: "Hikkaduwa" },
    //   { x: 35, y: 85, label: "Matara" },
      { x: 84, y: 75, label: "Arugam Bay" },
    ],
  },
  {
    name: "Wildlife & Nature",
    image: "/wildlife.png",
    locations: [
      { x: 25, y: 29, label: "Wilpattu" },
      { x: 77, y:83, label: "Yala" },
    ],
  },
  {
    name: "Adventure",
    image: "/adventure.png",
    locations: [
      { x: 40, y: 75, label: "Kithulgala Rafting" },
      { x: 60, y: 80, label: "Flying Ravana Adventure Park" },
    ],
  },
  {
    name: "History & Culture",
    image: "/culture.png",
    locations: [
      { x: 45, y: 63, label: "Sigiriya" },
      { x: 55, y: 48, label: "Polonnaruwa" },
      { x: 45, y: 38, label: "Anuradhapura" },
    ],
  },
  {
    name: "Lesser Travelled",
    image: "/lessertraveled.png",
    locations: [
      { x: 38, y: 97, label: "Polhena" },
      { x: 38, y: 80, label: "Rathnapura" },
    ],
  },
  {
    name: "Gastronomy",
    image: "/food.png",
    locations: [
      { x: 22, y: 74, label: "Colombo" },
      { x: 55, y: 70, label: "Mahiyanganaya" },
    ],
  },
];

// ---------------------- GALLERY IMAGES ----------------------
const galleryList = [
  "/gallery/img1.jpg",
  "/gallery/img2.jpg",
  "/gallery/img3.jpg",
  "/gallery/img4.jpg",
  "/gallery/img5.jpg",
  "/gallery/img6.jpg",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
    setProgress(0);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);
    setProgress(0);
  };

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    
    return () => clearInterval(progressTimer);
  }, [current]);

  return (
    <div className="font-sans bg-neutral-50">

      {/* HERO SECTION */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white text-sm tracking-wider uppercase">
                {heroSlides[current].location}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-tight">
              {heroSlides[current].title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-8">
              {heroSlides[current].subtitle}
            </p>

            <button className="group px-8 py-4 bg-white text-neutral-900 font-medium tracking-wide hover:bg-neutral-100 transition-all duration-300 flex items-center gap-3">
              Explore Destinations
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-6 -translate-y-1/2 text-white p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-6 -translate-y-1/2 text-white p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex gap-4 z-20">
          {heroSlides.map((_, idx) => (
            <div key={idx} className="relative w-16 h-1 bg-white/30 cursor-pointer overflow-hidden" onClick={() => { setCurrent(idx); setProgress(0); }}>
              <div 
                className={`absolute top-0 left-0 h-full bg-white transition-all duration-100 ${
                  idx === current ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ width: idx === current ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-10 right-8 md:right-16 lg:right-24 text-white font-light text-lg z-20">
          <span className="text-2xl">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/60"> / {String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* INTERACTIVE MAP SECTION */}
<section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-6 tracking-tight">
      Explore Sri Lanka
    </h2>
    <p className="text-center text-neutral-600 text-lg mb-20 max-w-2xl mx-auto">
      Discover the diverse landscapes and rich culture of the pearl of the Indian Ocean
    </p>

    <div className="flex flex-col lg:flex-row justify-between gap-12">
      {/* LEFT CATEGORIES */}
      <div className="flex flex-col gap-6 w-full lg:w-1/3">
        {categories.slice(0, 3).map((cat, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(cat)}
            onMouseLeave={() => setActive(null)}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-5 p-6">
              <img
                src={cat.image}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                alt={cat.name}
              />
              <p className="text-xl font-semibold text-neutral-900 group-hover:text-indigo-700 transition-colors duration-300">
                {cat.name}
              </p>
            </div>
            {/* Animated underline on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 group-hover:w-full transition-all duration-500"></div>
          </div>
        ))}
      </div>

      {/* CENTER MAP */}
      <div className="relative flex justify-center items-center w-full lg:w-1/3">
        <img src="/srilanka-map.png" className="w-[380px] max-w-full" alt="Sri Lanka Map" />
        {active && active.locations.map((loc, index) => (
          <div key={index} className="absolute" style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
            <div className="w-3 h-3 bg-indigo-600 rounded-full absolute -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute -translate-x-1/2 -translate-y-full mb-3 bg-indigo-600 text-white text-xs px-3 py-1.5 whitespace-nowrap rounded-full font-medium tracking-wide">
              {loc.label}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT CATEGORIES */}
      <div className="flex flex-col gap-6 w-full lg:w-1/3">
        {categories.slice(3).map((cat, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(cat)}
            onMouseLeave={() => setActive(null)}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-5 p-6">
              <img
                src={cat.image}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                alt={cat.name}
              />
              <p className="text-xl font-semibold text-neutral-900 group-hover:text-green-700 transition-colors duration-300">
                {cat.name}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* GALLERY SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-neutral-50">
        <div className="max-w-12xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-20 tracking-tight">
            Latest Gallery
          </h2>
          <Gallery images={galleryList} />
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-6 tracking-tight">
            Travel Packages
          </h2>
          <p className="text-center text-neutral-600 text-lg mb-20 max-w-2xl mx-auto">
            Curated experiences designed to showcase the best of Sri Lanka
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div key={idx} className="group bg-white border border-neutral-200 overflow-hidden hover:border-neutral-900 transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <img src={pkg.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={pkg.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-wide">
                    {pkg.title}
                  </h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {pkg.desc}
                  </p>
                  <div className="flex items-center gap-6 mb-6 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{pkg.people} People</span>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-neutral-900 text-white font-light tracking-wider hover:bg-neutral-800 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}