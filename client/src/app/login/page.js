"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock } from "lucide-react";

const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
// console.log(url);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic input validation
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    // Make a POST request to the login API endpoint
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Send data as JSON
      body: JSON.stringify({ email, password }),
    });

    // console.log("Status:", res.status);

    const data = await res.json(); // Parse JSON response
    // console.log("Response:", data);

    // If login is successful and token is returned
    if (res.ok && data.token) {
      login(data.token);
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-800" size={20} />
            <input
              className="pl-10 pr-4 py-2 border text-gray-800 border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-800" size={20} />
            <input
              className="pl-10 pr-4 py-2 border text-gray-800 border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
