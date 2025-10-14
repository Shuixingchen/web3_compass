import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { executeQuery, executeQuerySingle } from '@/lib/database';

// 添加收藏
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const { projectId } = await request.json();
    
    if (!projectId) {
      return NextResponse.json(
        { error: '项目ID不能为空' },
        { status: 400 }
      );
    }

    // 检查项目是否存在
    const project = await executeQuerySingle(
      'SELECT id FROM web3_projects WHERE id = ?',
      [projectId]
    );

    if (!project) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      );
    }

    // 检查是否已经收藏
    const existingBookmark = await executeQuerySingle(
      'SELECT id FROM web3_user_bookmarks WHERE user_id = ? AND project_id = ?',
      [session.user.id, projectId]
    );

    if (existingBookmark) {
      return NextResponse.json(
        { error: '已经收藏过该项目' },
        { status: 409 }
      );
    }

    // 添加收藏
    await executeQuery(
      'INSERT INTO web3_user_bookmarks (user_id, project_id) VALUES (?, ?)',
      [session.user.id, projectId]
    );

    return NextResponse.json(
      { message: '收藏成功', bookmarked: true },
      { status: 201 }
    );

  } catch (error) {
    console.error('添加收藏失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除收藏
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json(
        { error: '项目ID不能为空' },
        { status: 400 }
      );
    }

    // 检查收藏是否存在
    const existingBookmark = await executeQuerySingle(
      'SELECT id FROM web3_user_bookmarks WHERE user_id = ? AND project_id = ?',
      [session.user.id, projectId]
    );

    if (!existingBookmark) {
      return NextResponse.json(
        { error: '未收藏该项目' },
        { status: 404 }
      );
    }

    // 删除收藏
    await executeQuery(
      'DELETE FROM web3_user_bookmarks WHERE user_id = ? AND project_id = ?',
      [session.user.id, projectId]
    );

    return NextResponse.json(
      { message: '取消收藏成功', bookmarked: false },
      { status: 200 }
    );

  } catch (error) {
    console.error('取消收藏失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 获取用户收藏状态
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json(
        { error: '项目ID不能为空' },
        { status: 400 }
      );
    }

    // 检查收藏状态
    const bookmark = await executeQuerySingle(
      'SELECT id FROM web3_user_bookmarks WHERE user_id = ? AND project_id = ?',
      [session.user.id, projectId]
    );

    return NextResponse.json(
      { bookmarked: !!bookmark },
      { status: 200 }
    );

  } catch (error) {
    console.error('获取收藏状态失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}