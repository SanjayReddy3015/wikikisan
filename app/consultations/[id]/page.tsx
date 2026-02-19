"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Plus,
  MessageCircle,
  ThumbsUp,
  Send,
  ArrowLeft,
} from "lucide-react"
import { useRouter } from "next/navigation"

/* ------------------ MOCK DATA ------------------ */

const initialPosts = [
  {
    id: "1",
    author: "Ravi Kumar",
    content: "Best fertilizer for paddy crop?",
    likes: 4,
    comments: ["Use Urea + DAP", "Organic compost works well"],
    time: "10 min ago",
  },
  {
    id: "2",
    author: "Sita Devi",
    content: "Weather affecting tomato yield 😟",
    likes: 2,
    comments: ["Try mulching"],
    time: "30 min ago",
  },
]

/* ------------------ MAIN COMPONENT ------------------ */

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [commentText, setCommentText] = useState<Record<string, string>>({})

  const addPost = () => {
    if (!newPost.trim()) return
    setPosts([
      {
        id: Date.now().toString(),
        author: "You",
        content: newPost,
        likes: 0,
        comments: [],
        time: "Just now",
      },
      ...posts,
    ])
    setNewPost("")
  }

  const addComment = (id: string) => {
    if (!commentText[id]?.trim()) return
    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, commentText[id]] }
        : p
    ))
    setCommentText({ ...commentText, [id]: "" })
  }

  const likePost = (id: string) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-green-600" />
            <h1 className="text-2xl font-bold">Farmer Community 🌾</h1>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 border px-3 py-1 rounded"
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>

        {/* CREATE POST */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <textarea
            placeholder="Ask a farming question..."
            className="w-full border rounded p-2"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
          />
          <button
            onClick={addPost}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Plus size={16} /> Post
          </button>
        </div>

        {/* POSTS */}
        <div className="space-y-4">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded shadow"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-gray-700">{post.content}</p>
                </div>
                <span className="text-xs text-gray-500">{post.time}</span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-3 text-sm">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-1 text-blue-600"
                >
                  <ThumbsUp size={14} /> {post.likes}
                </button>
                <span className="flex items-center gap-1 text-gray-600">
                  <MessageCircle size={14} /> {post.comments.length}
                </span>
              </div>

              {/* COMMENTS */}
              <div className="mt-3 space-y-2">
                {post.comments.map((c, i) => (
                  <div key={i} className="text-sm bg-gray-100 p-2 rounded">
                    {c}
                  </div>
                ))}
              </div>

              {/* ADD COMMENT */}
              <div className="flex gap-2 mt-3">
                <input
                  placeholder="Write comment..."
                  className="flex-1 border rounded px-2"
                  value={commentText[post.id] || ""}
                  onChange={e =>
                    setCommentText({ ...commentText, [post.id]: e.target.value })
                  }
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
