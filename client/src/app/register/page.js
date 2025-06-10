"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("submit");
    const res = await fetch(`${url}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2">
        <input
          className="p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white py-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
