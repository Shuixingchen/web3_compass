import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
  host: 'bpool-ordi-develop-net.mysql.polardb.singapore.rds.aliyuncs.com',
  port: 3306,
  user: 'ordi_parser_rw',
  password: 'Aq82q4G6mgAUzT9YkJxq',
  database: 'news',
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// 创建连接池
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 数据库连接实例
export const db = pool;

// 测试数据库连接
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('数据库连接成功');
    return true;
  } catch (error) {
    console.error('数据库连接失败:', error);
    return false;
  }
}

// 执行查询的辅助函数
export async function executeQuery<T = any>(query: string, params?: any[]): Promise<T[]> {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('查询执行失败:', error);
    throw error;
  }
}

// 执行单个查询的辅助函数
export async function executeQuerySingle<T = any>(query: string, params?: any[]): Promise<T | null> {
  try {
    const [rows] = await pool.execute(query, params);
    const result = rows as T[];
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('查询执行失败:', error);
    throw error;
  }
}