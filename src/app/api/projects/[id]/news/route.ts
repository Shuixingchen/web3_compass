import { NextRequest, NextResponse } from 'next/server';
import { getProjectNews } from '@/lib/data-access';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: '无效的项目ID' },
        { status: 400 }
      );
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 验证分页参数
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: '无效的分页参数' },
        { status: 400 }
      );
    }

    // 获取新闻数据
    const result = await getProjectNews(projectId, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('获取项目新闻失败:', error);
    return NextResponse.json(
      { error: '获取新闻数据失败' },
      { status: 500 }
    );
  }
}