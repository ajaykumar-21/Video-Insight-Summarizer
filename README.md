# 🎥 Video Insight Summarizer

A full-stack web application that lets users paste a YouTube video URL, fetches metadata, generates an AI summary using OpenAI, and stores results in a personal dashboard. Includes login authentication, free usage quota, upgrade/paywall integration, and an admin panel.

---

## 🚀 Features

- ✅ Email & password authentication
- ✅ Paste YouTube URL and fetch title, thumbnail, duration (YouTube Data API v3)
- ✅ AI-powered video summary (OpenAI API)
- ✅ User dashboard with summary history
- ✅ Daily quota for free users (3/day)
- ✅ Paywall upgrade (Stripe / Paddle integration)
- ✅ Admin panel to view user usage

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Express.js, Node.js, JWT, OpenAI API
- **Database**: MongoDB + Mongoose
- **Auth**: Email/password with JWT
- **Payments**: Stripe / Paddle (test mode)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ajaykumar-21/Video-Insight-Summarizer.git
cd video-insight-summarizer
