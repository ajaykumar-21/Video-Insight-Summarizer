const axios = require("axios");

exports.getMetadata = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  const videoId = extractVideoId(url);
  if (!videoId) return res.status(400).json({ message: "Invalid YouTube URL" });

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  console.log("YOUTUBE_API_KEY", YOUTUBE_API_KEY);

  try {
    const ytRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    // console.log(ytRes.data.items);

    const video = ytRes.data.items[0];
    if (!video) return res.status(404).json({ message: "Video not found" });

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
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/
    );
    return match?.[1] || null;
  } catch {
    return null;
  }
}
