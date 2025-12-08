import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80",
    title: "Explore the Beaches",
    subtitle: "Find your perfect getaway by the sea",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80",
    title: "Mountain Adventures",
    subtitle: "Conquer peaks and experience nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
    title: "City Escapes",
    subtitle: "Discover urban culture and hidden gems",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526779259212-47e77eede7a3?auto=format&fit=crop&w=800&q=80",
];

const packages = [
  {
    title: "Beach Paradise",
    desc: "7 days in tropical paradise with guided tours and activities.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mountain Explorer",
    desc: "Hike and camp in breathtaking mountain ranges.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "City Adventure",
    desc: "Discover the hidden gems of vibrant cities worldwide.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Auto slide every 5 seconds
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="font-sans">
      {/* HERO SLIDER */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl animate-fadeIn delay-300">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-3xl md:text-4xl p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-3xl md:text-4xl p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
        >
          <FaArrowRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 w-full flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all ${
                idx === current ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* GALLERY SECTION */}
      <section className="py-20 px-4 md:px-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-10">
          Stunning Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition">
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section className="py-20 px-4 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Travel Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600">{pkg.desc}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
