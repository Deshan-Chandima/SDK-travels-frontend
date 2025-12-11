import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const token = localStorage.getItem("token");

  // Fetch Admins
  const fetchAdmins = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/admins", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmins(res.data.admins);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load admins");
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add Admin
  const handleCreateAdmin = (e) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/admins", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Admin Created");
        setFormData({
          full_name: "",
          email: "",
          password: "",
          role: "admin",
        });
        fetchAdmins();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to create admin");
      });
  };

  // Delete Admin
  const deleteAdmin = (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/admins/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Admin Deleted");
        fetchAdmins();
      })
      .catch(() => {
        toast.error("Failed to delete admin");
      });
  };

  return (
    <div className="space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-white">Manage Admins</h1>
        <p className="text-slate-400">Create & manage admin accounts</p>
      </div>

      {/* Add Admin Form */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
        <h2 className="text-xl font-semibold mb-5">Create New Admin</h2>

        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-slate-300">Full Name</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
              placeholder="admin@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1 text-slate-300">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col md:col-span-3">
            <button
              type="submit"
              className="w-fit px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-xl text-white font-semibold"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>

      {/* Admin Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8">
        <h2 className="text-xl font-semibold mb-5">Admin List</h2>

        {loading ? (
          <p className="text-slate-400">Loading admins...</p>
        ) : admins.length === 0 ? (
          <p className="text-slate-400">No admins found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-left">
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id} className="border-b border-white/10">
                    <td className="p-3">{admin.full_name}</td>
                    <td className="p-3">{admin.email}</td>
                    <td className="p-3 capitalize">{admin.role}</td>

                    <td className="p-3 text-center">

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteAdmin(admin._id)}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
