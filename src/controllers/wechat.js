const path = require('path');
const config = require('../config');
const execute = require('../utils/execute');

const { toolPath, projects } = config;

async function resetCode(projectPath) {
  try {
    await execute('git checkout .', { cwd: projectPath });
  } catch (error) {
    error.name = '取消代码修改';
    throw error;
  }
}

async function checkoutBranch(projectPath, branch) {
  try {
    await execute(`git checkout ${branch}`, { cwd: projectPath });
  } catch (error) {
    error.name = '切换代码分支';
    throw error;
  }
}

async function updateCode(projectPath) {
  try {
    await execute('git pull', { cwd: projectPath });
  } catch (error) {
    error.name = '更新代码';
    throw error;
  }
}

async function generateQRCode(projectPath, outputPath) {
  try {
    const result = await execute(`${toolPath} preview --project ${projectPath} --qr-format image --qr-output ${outputPath}`);

    // 需要登录微信开发者工具
    if (result.indexOf('需要重新登录') > -1) {
      const error = new Error();

      error.code = 401;
      throw error;
    }
  } catch (error) {
    error.name = '生成二维码';
    throw error;
  }
}

async function qrcode(project, branch) {
  const projectPath = projects[project].path;
  const returnPath = `\\${project}.jpg`;
  const outputPath = path.join(__dirname, `../../static/${project}.jpg`);
  
  try {
    // 取消代码修改
    await resetCode(projectPath);
    // 切换代码分支
    await checkoutBranch(projectPath, branch);
    // 更新代码
    await updateCode(projectPath);
    // 生成小程序二维码
    await generateQRCode(projectPath, outputPath);

    return returnPath;
  } catch (error) {
    const { name, message } = error;

    error.message = `${name}执行失败，原因如下：${message}`;
    throw error;
  }
}

module.exports = {
  qrcode
};
