"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const fetchMetadata = async () => {
    setError("");
    setLoading(true);
    setVideoData(null);

    try {
      const res = await fetch("http://localhost:5000/api/video/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setVideoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 Dashboard</h1>
        <button
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Paste YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={fetchMetadata}
          disabled={loading || !url}
        >
          {loading ? "Fetching..." : "Fetch Metadata"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {videoData && (
        <div className="mt-6 p-4 border rounded shadow w-100">
          <Image
            src={videoData.thumbnail}
            alt="Thumbnail"
            width={400}
            height={180}
            className="w-full max-w-sm"
          />
          <h2 className="text-md font-semibold mt-2">{videoData.title}</h2>
          <p className="text-gray-600 mt-1">⏱ Duration: {videoData.duration}</p>
        </div>
      )}
    </div>
  );
}
