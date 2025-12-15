import { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

// Optional: Replace with a real image of a Sri Lankan landscape or key contact details
const ContactInfoPanel = () => (
  // Background set to a deep orange (orange-900) for contrast
  <div className="bg-orange-900 text-white p-10 rounded-xl shadow-2xl h-full flex flex-col justify-center">
    <h2 className="text-3xl font-serif font-bold mb-6 border-b border-orange-400 pb-3">
      Start Your Journey
    </h2>
    <p className="mb-8 text-orange-100">
      We're here to help you plan every detail of your Sri Lankan adventure. Reach out to us, and let's craft your perfect itinerary.
    </p>

    <div className="space-y-6">
      <div className="flex items-start">
        <FaMapMarkerAlt className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>Sri Mahinda Dharma MW,Colombo 09.</p>
      </div>
      <div className="flex items-start">
        <FaEnvelope className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>sdksolutions01@gmail.com</p>
      </div>
      <div className="flex items-start">
        <FaPhoneAlt className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>+94 742216579</p>
      </div>
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    adults: "1", 
    kids: "0",
    infants: "0",
    arrivalDate: "",
    departureDate: "",
    message: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.arrivalDate || !formData.departureDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", formData); 
      alert("Message sent successfully! We will get back to you shortly.");

      // reset form
      setFormData({
        name: "",
        email: "",
        country: "",
        phone: "",
        adults: "1",
        kids: "0",
        infants: "0",
        arrivalDate: "",
        departureDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission Error:", error.response ? error.response.data : error.message);
      alert("Failed to send message. Please try again or contact us directly.");
    }
  };

  // Modern Input Component for cleaner look
  const ModernInput = ({ type, name, placeholder, value, onChange, required = false, min }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      // Focus ring uses orange-500
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 outline-none date-input-padding"
      style={name === 'arrivalDate' || name === 'departureDate' ? { color: value ? '#1f2937' : '#9ca3af' } : {}}
    />
  );
  
  return (
    // Background color set to bg-gray-50 (lightest grey) to maintain the light background look
    <div className="min-h-screen py-20 bg-gray-50"> 
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Heading and Subtitle */}
        <div className="text-center mb-16">
          {/* Primary color (orange-700) for the accent text */}
          <p className="text-lg font-semibold text-orange-700 uppercase tracking-widest">
            Contact Us
          </p>
          <h1 className="text-5xl font-serif font-extrabold text-gray-800 mt-2">
            Let’s Craft Your Dream Journey
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Tell us about your ideal Sri Lankan escape, and our experts will design a personalized itinerary just for you.
          </p>
        </div>

        {/* Form Grid Layout: Form on Left, Contact Info Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Contact Info Panel (Col 1) */}
          <div className="lg:col-span-1 hidden lg:block">
            <ContactInfoPanel />
          </div>

          {/* Form (Cols 2 & 3) */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            <form onSubmit={submitForm} className="space-y-6">

              {/* Name and Email in a Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput 
                  type="text" 
                  name="name" 
                  placeholder="Your Full Name*" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                <ModernInput 
                  type="email" 
                  name="email" 
                  placeholder="Your Email Address*" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Country and Phone in a Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput 
                  type="text" 
                  name="country" 
                  placeholder="Country of Residence*" 
                  value={formData.country} 
                  onChange={handleChange} 
                  required 
                />
                <ModernInput 
                  type="text" 
                  name="phone" 
                  placeholder="Phone Number*" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <ModernInput 
                  type="date" 
                  name="arrivalDate" 
                  placeholder="Arrival Date" 
                  value={formData.arrivalDate} 
                  onChange={handleChange} 
                  required 
                />
                <ModernInput 
                  type="date" 
                  name="departureDate" 
                  placeholder="Departure Date" 
                  value={formData.departureDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Adults / Kids / Infants Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <ModernInput 
                  type="number" 
                  name="adults" 
                  placeholder="No of Adults (12+)*" 
                  value={formData.adults} 
                  onChange={handleChange} 
                  min="1" 
                  required
                />
                <ModernInput 
                  type="number" 
                  name="kids" 
                  placeholder="No of Kids (0 - 11)" 
                  value={formData.kids} 
                  onChange={handleChange} 
                  min="0" 
                />
                <ModernInput 
                  type="number" 
                  name="infants" 
                  placeholder="No of Infants (0 - 2)" 
                  value={formData.infants} 
                  onChange={handleChange} 
                  min="0" 
                />
              </div>
              
              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us more about your travel interests (e.g., beach, culture, wildlife, budget...)"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  // Focus ring uses orange-500
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  // Button uses orange-700 and hover uses orange-800
                  className="flex items-center bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-orange-800 transition duration-300 transform hover:scale-105"
                >
                  Send Inquiry <FaPaperPlane className="ml-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}