import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useAuth } from "../post/AuthContext.jsx";

export default function Dashboard() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    EmailAdress: user?.EmailAdress || "",
    Name: user?.Name || "",
    Password: user?.Password || "",
    private: user?.private || false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!user) return <p>No user logged in</p>;
  if (!user.id) return <p>User document ID missing</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, formData);

      setUser((prev) => ({
        ...prev,
        ...formData,
      }));

      setSuccessMsg("User info updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update user info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email Address:
            <input
              type="email"
              name="EmailAdress"
              value={formData.EmailAdress}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </label>
        </div>

        <div>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password:
            <input
              type="text"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </label>
        </div>

        <div>
          <label>
            Private:
            <input
              type="checkbox"
              name="private"
              checked={formData.private}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
