"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/register");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          🎥 Video Insight Summarizer
        </h1>
        <p className="text-lg mb-8">
          Paste any YouTube video URL and get a smart AI-generated summary in
          seconds.
        </p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-white text-gray-900 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
        >
          Register to Continue
        </button>
      </div>
    </main>
  );
}
