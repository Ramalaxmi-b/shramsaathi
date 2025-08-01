// src/components/RegisterForm.js
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    workType: "",
    district: "",
    mandal: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8083/api/users", formData);
      alert("User Registered!");
      setFormData({
        name: "",
        phone: "",
        address: "",
        workType: "",
        district: "",
        mandal: "",
        pincode: ""
      });
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Worker</h2>
      {["name", "phone", "address", "workType", "district", "mandal", "pincode"].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field}
          required
        />
      ))}
      <button type="submit">Register</button>
    </form>
  );
}
