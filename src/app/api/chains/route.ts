import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database';

interface ChainData {
  chain_symbol: string;
  chain_name: string;
  sort: number;
}

export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT chain_symbol, chain_name, sort
      FROM web3_chains 
      ORDER BY sort ASC, chain_name ASC
    `;
    
    const chains = await executeQuery<ChainData>(query, []);
    
    // 格式化返回数据，为了兼容前端组件，我们将chain_name作为name返回
    const formattedChains = chains.map(chain => ({
      symbol: chain.chain_symbol,
      name: chain.chain_name,
      sort: chain.sort
    }));
    
    return NextResponse.json({
      success: true,
      chains: formattedChains,
      total: formattedChains.length
    });
    
  } catch (error) {
    console.error('获取区块链数据失败:', error);
    return NextResponse.json(
      { error: true, message: '获取区块链数据失败' },
      { status: 500 }
    );
  }
}