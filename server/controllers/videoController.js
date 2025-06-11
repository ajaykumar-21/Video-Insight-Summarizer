const axios = require("axios");

// Controller to get metadata from a YouTube video URL
exports.getMetadata = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  // Extract the video ID from the YouTube URL
  const videoId = extractVideoId(url);
  if (!videoId) return res.status(400).json({ message: "Invalid YouTube URL" });

  // Get YouTube API key from environment variables
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  // console.log("YOUTUBE_API_KEY", YOUTUBE_API_KEY);

  try {
    // Call YouTube Data API to get video details (snippet and duration)
    const ytRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    // console.log(ytRes.data.items);

    const video = ytRes.data.items[0];
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Extract metadata: title, thumbnail, and duration
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails?.medium?.url;
    const duration = video.contentDetails.duration;

    return res.json({ title, thumbnail, duration });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch metadata" });
  }
};

function extractVideoId(url) {
  try {
    // Match standard YouTube URL formats:
    // - youtube.com/watch?v=VIDEO_ID
    // - youtu.be/VIDEO_ID
    // - youtube.com/shorts/VIDEO_ID
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/
    );
    return match?.[1] || null;
  } catch {
    // Return null if regex or URL parsing fails
    return null;
  }
}
