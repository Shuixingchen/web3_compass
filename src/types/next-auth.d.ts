import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | number
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean
    }
  }

  interface JWT {
    userId?: string | number
    isAdmin?: boolean
  }
}