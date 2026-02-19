/* =========================================================
   WIKIKISAN COMMUNITY – SINGLE FILE DEMO IMPLEMENTATION
   Includes:
   - Types
   - Mock API (communityApi)
   - In-memory data
   ========================================================= */

// -----------------------------
// TYPES
// -----------------------------
export interface CommunityPost {
  _id: string
  title: string
  content: string
  type: string
  category: string
  tags: string[]
  language: string
  createdAt: Date
  views: number
  reactionCount: number
  commentCount: number
  isResolved: boolean
  attachments: any[]
  author: {
    name: string
    role: string
    profilePicture?: string
  }
  comments: any[]
}

export interface CommunityGroup {
  _id: string
  name: string
  description: string
  category: string
  privacy: string
  memberCount: number
  avatar?: string
  tags: string[]
}

export interface CreatePostData {
  title: string
  content: string
  type: string
  category: string
  tags: string[]
  language: string
}

export interface CreateGroupData {
  name: string
  description: string
  category: string
  privacy: string
  language: string
}

// -----------------------------
// MOCK DATABASE
// -----------------------------
const posts: CommunityPost[] = [
  {
    _id: "1",
    title: "Best fertilizer for rice?",
    content: "Which fertilizer gives better yield for paddy?",
    type: "question",
    category: "crops",
    tags: ["rice", "fertilizer"],
    language: "en",
    createdAt: new Date(),
    views: 120,
    reactionCount: 5,
    commentCount: 1,
    isResolved: false,
    attachments: [],
    author: { name: "Ravi Kumar", role: "farmer" },
    comments: [],
  },
]

const groups: CommunityGroup[] = [
  {
    _id: "g1",
    name: "Rice Farmers",
    description: "Community for rice cultivation",
    category: "crop_specific",
    privacy: "public",
    memberCount: 120,
    tags: ["rice"],
  },
]

// -----------------------------
// COMMUNITY API (MOCK)
// -----------------------------
export const communityApi = {
  // FEED
  getFeed: async ({ limit = 20 }: any) => {
    return {
      success: true,
      data: posts.slice(0, limit),
    }
  },

  // TRENDING
  getTrending: async (limit = 10) => {
    return {
      success: true,
      data: {
        tags: [{ _id: "rice", count: 15 }],
        posts: posts.slice(0, limit),
      },
    }
  },

  // CREATE POST
  createPost: async (data: CreatePostData, files: File[]) => {
    const newPost: CommunityPost = {
      _id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
      views: 0,
      reactionCount: 0,
      commentCount: 0,
      isResolved: false,
      attachments: files.map((f) => ({
        filename: f.name,
        type: "image",
        url: URL.createObjectURL(f),
      })),
      author: { name: "You", role: "farmer" },
      comments: [],
    }

    posts.unshift(newPost)

    return {
      success: true,
      data: newPost,
    }
  },

  // COMMENT
  addComment: async (postId: string, content: string) => {
    const post = posts.find((p) => p._id === postId)
    if (!post) return { success: false }

    const comment = {
      _id: crypto.randomUUID(),
      content,
      createdAt: new Date(),
      author: { name: "You" },
    }

    post.comments.push(comment)
    post.commentCount++

    return {
      success: true,
      data: comment,
    }
  },

  // REACTION
  reactToPost: async (postId: string, type: string) => {
    const post = posts.find((p) => p._id === postId)
    if (!post) return { success: false }

    post.reactionCount++

    return {
      success: true,
      data: { reactionCount: post.reactionCount },
    }
  },

  // GROUPS
  getGroups: async ({ limit = 20 }: any) => {
    return {
      success: true,
      data: groups.slice(0, limit),
    }
  },

  // CREATE GROUP
  createGroup: async (data: CreateGroupData) => {
    const newGroup: CommunityGroup = {
      _id: crypto.randomUUID(),
      ...data,
      memberCount: 1,
      tags: [],
    }

    groups.unshift(newGroup)

    return {
      success: true,
      data: newGroup,
    }
  },

  // JOIN GROUP
  joinGroup: async (groupId: string) => {
    const group = groups.find((g) => g._id === groupId)
    if (!group) return { success: false }

    group.memberCount++

    return { success: true }
  },
}

/* =========================================================
   END OF FILE
   ========================================================= */
