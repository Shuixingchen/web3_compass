const fs = require('fs');
const path = require('path');

// 检查并导入fetch（Node.js 18+内置，较老版本需要polyfill）
let fetch;
try {
  fetch = globalThis.fetch;
  if (!fetch) {
    // 如果没有内置fetch，尝试使用node-fetch
    fetch = require('node-fetch');
  }
} catch (error) {
  console.error('❌ 需要安装node-fetch: npm install node-fetch');
  process.exit(1);
}

// API配置
const API_BASE_URL = 'http://localhost:3000';
const API_ENDPOINT = '/api/projects/submit';

/**
 * 验证项目数据格式
 */
function validateProject(project, index) {
  const errors = [];
  
  if (!project.name || typeof project.name !== 'string') {
    errors.push(`项目 ${index + 1}: 缺少或无效的项目名称`);
  }
  
  if (!project.description || typeof project.description !== 'string') {
    errors.push(`项目 ${index + 1}: 缺少或无效的项目描述`);
  }
  
  if (!project.category || typeof project.category !== 'string') {
    errors.push(`项目 ${index + 1}: 缺少或无效的项目分类`);
  }
  
  if (!project.url || typeof project.url !== 'string') {
    errors.push(`项目 ${index + 1}: 缺少或无效的项目URL`);
  }
  
  // 验证URL格式
  if (project.url) {
    try {
      new URL(project.url);
    } catch (e) {
      errors.push(`项目 ${index + 1}: URL格式无效`);
    }
  }
  
  // 验证logo URL格式（如果提供）
  if (project.logo) {
    try {
      new URL(project.logo);
    } catch (e) {
      errors.push(`项目 ${index + 1}: Logo URL格式无效`);
    }
  }
  
  // 验证数组字段
  if (project.tags && !Array.isArray(project.tags)) {
    errors.push(`项目 ${index + 1}: tags必须是数组`);
  }
  
  if (project.chains && !Array.isArray(project.chains)) {
    errors.push(`项目 ${index + 1}: chains必须是数组`);
  }
  
  // 验证官方链接
  if (project.officialLinks && typeof project.officialLinks !== 'object') {
    errors.push(`项目 ${index + 1}: officialLinks必须是对象`);
  }
  
  return errors;
}

/**
 * 通过API提交项目
 */
async function submitProjectViaAPI(project) {
  const url = `${API_BASE_URL}${API_ENDPOINT}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: project.name,
      description: project.description,
      detailedDescription: project.detailedDescription || '',
      category: project.category,
      subcategory: project.subcategory || '',
      url: project.url,
      logo: project.logo || '',
      tags: project.tags || [],
      chains: project.chains || [],
      officialLinks: project.officialLinks || {}
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API请求失败 (${response.status}): ${errorData}`);
  }
  
  const result = await response.json();
  return result;
}

/**
 * 检查项目是否已存在（通过API）
 */
async function checkProjectExistsViaAPI(projectName) {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn('无法检查重复项目，将继续提交');
      return false;
    }
    
    const data = await response.json();
    const existingProjects = data.submissions || [];
    
    return existingProjects.some(submission => 
      submission.name.toLowerCase() === projectName.toLowerCase()
    );
  } catch (error) {
    console.warn('检查重复项目时出错，将继续提交:', error.message);
    return false;
  }
}

/**
 * 批量导入项目
 */
async function batchImportProjects(jsonFilePath) {
  try {
    // 检查JSON文件是否存在
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`JSON文件不存在: ${jsonFilePath}`);
    }
    
    // 读取JSON文件
    console.log(`📖 正在读取JSON文件: ${jsonFilePath}`);
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    let projects;
    
    try {
      projects = JSON.parse(jsonData);
    } catch (e) {
      throw new Error(`JSON文件格式错误: ${e.message}`);
    }
    
    if (!Array.isArray(projects)) {
      throw new Error('JSON文件必须包含项目数组');
    }
    
    console.log(`📊 找到 ${projects.length} 个项目待导入`);
    
    // 验证所有项目数据
    console.log('🔍 正在验证项目数据...');
    const allErrors = [];
    projects.forEach((project, index) => {
      const errors = validateProject(project, index);
      allErrors.push(...errors);
    });
    
    if (allErrors.length > 0) {
      console.error('❌ 数据验证失败:');
      allErrors.forEach(error => console.error(`  - ${error}`));
      return;
    }
    
    console.log('✅ 数据验证通过');
    
    // 检查API服务是否可用
    console.log('🔌 正在检查API服务...');
    try {
      const testResponse = await fetch(`${API_BASE_URL}${API_ENDPOINT}`);
      if (testResponse.ok) {
        console.log('✅ API服务连接成功');
      } else {
        console.log('⚠️  API服务响应异常，但将继续尝试提交');
      }
    } catch (error) {
      console.error('❌ 无法连接到API服务，请确保开发服务器正在运行');
      console.error('   运行命令: npm run dev');
      return;
    }
    
    // 开始导入
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;
    
    console.log('🚀 开始批量导入...');
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      
      try {
        // 检查项目是否已存在
        const exists = await checkProjectExistsViaAPI(project.name);
        
        if (exists) {
          console.log(`⚠️  项目 "${project.name}" 已存在，跳过`);
          skipCount++;
          continue;
        }
        
        // 通过API提交项目
        const result = await submitProjectViaAPI(project);
        console.log(`✅ 项目 "${project.name}" 提交成功 (ID: ${result.submissionId})`);
        successCount++;
        
        // 添加延迟避免API请求过于频繁
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ 项目 "${project.name}" 提交失败: ${error.message}`);
        errorCount++;
      }
    }
    
    // 输出统计结果
    console.log('\n📈 导入完成统计:');
    console.log(`  ✅ 成功提交: ${successCount} 个项目`);
    console.log(`  ⚠️  跳过重复: ${skipCount} 个项目`);
    console.log(`  ❌ 提交失败: ${errorCount} 个项目`);
    console.log(`  📊 总计处理: ${projects.length} 个项目`);
    
  } catch (error) {
    console.error('❌ 批量导入失败:', error.message);
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('使用方法: node batch-import-projects.js <json文件路径>');
    console.log('示例: node batch-import-projects.js ./data/projects-import.json');
    return;
  }
  
  const jsonFilePath = path.resolve(args[0]);
  await batchImportProjects(jsonFilePath);
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { batchImportProjects, validateProject };