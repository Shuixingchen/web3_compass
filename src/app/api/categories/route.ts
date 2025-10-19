import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/data-access';

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategories();
    
    return NextResponse.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('获取分类失败:', error);
    return NextResponse.json(
      { error: true, message: '获取分类数据失败' },
      { status: 500 }
    );
  }
}