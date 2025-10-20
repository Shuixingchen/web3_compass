import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/lib/data-access';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: true, message: '项目ID不能为空' },
        { status: 400 }
      );
    }

    const project = await getProjectById(id);
    
    if (!project) {
      return NextResponse.json(
        { error: true, message: '项目不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('获取项目详情错误:', error);
    return NextResponse.json(
      { error: true, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}