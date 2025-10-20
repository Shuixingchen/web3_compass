import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import { executeQuery, executeQuerySingle } from '@/lib/database'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google' && user.email) {
          // 检查用户是否已存在
          const existingUser = await executeQuerySingle(
            'SELECT * FROM web3_users WHERE email = ? OR (provider = ? AND provider_id = ?)',
            [user.email, 'google', account.providerAccountId]
          );

          if (existingUser) {
            // 更新现有用户信息
            await executeQuery(
              'UPDATE web3_users SET name = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
              [user.name || '', user.image || '', existingUser.id]
            );
          } else {
            // 创建新用户
            await executeQuery(
              'INSERT INTO web3_users (email, name, avatar_url, provider, provider_id) VALUES (?, ?, ?, ?, ?)',
              [user.email, user.name || '', user.image || '', 'google', account.providerAccountId]
            );
          }
        }
        return true;
      } catch (error) {
        console.error('用户注册/更新失败:', error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      // 持久化OAuth访问令牌到JWT令牌中
      if (account) {
        token.accessToken = account.access_token
      }
      
      // 添加用户数据库ID到token
      if (user?.email) {
        const dbUser = await executeQuerySingle(
          'SELECT id FROM web3_users WHERE email = ?',
          [user.email]
        );
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      
      return token
    },
    async session({ session, token }) {
      // 将用户ID添加到session，并实时查询管理员权限
      if (token.userId && session.user) {
        session.user.id = token.userId as string;
        
        // 每次都查询数据库获取最新的管理员权限
        try {
          const dbUser = await executeQuerySingle(
            'SELECT is_admin FROM web3_users WHERE id = ?',
            [token.userId]
          );
          session.user.isAdmin = dbUser ? dbUser.is_admin === 1 : false;
        } catch (error) {
          console.error('Error fetching user admin status:', error);
          session.user.isAdmin = false;
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }