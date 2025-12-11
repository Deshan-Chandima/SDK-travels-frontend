import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, formData);
      toast.success(res.data.message || "Signed up successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-[url(./travelbg.jpg)] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/50 md:bg-black/30" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-md rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl text-white p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Sign Up</h1>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Enter your phone"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Confirm password"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>
          <p className="mt-5 text-center text-sm">
            Already Have An Account?{" "}
            <Link to="/login" className="text-red-300 underline hover:text-red-200">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
