const fs = require('fs');
const path = require('path');
const config = require('../config');
const execute = require('../utils/execute');

const { toolPath } = config;

function remove(oupputPath) {
  return new Promise((resolve, reject) => {
    fs.unlink(oupputPath, (error) => {
      if (error) {
        console.log(error);
      }

      resolve();
    });
  });
}

function check(oupputPath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fs.access(oupputPath, (error) => {
        if (error) {
          console.log(error);
        }
        
        resolve(error ? false : true);
      });
    }, 1000);
  });
}

async function login() {
  try {
    const returnPath = `\\login.jpg`;
    const oupputPath = path.join(__dirname, `../../static/login.jpg`);

    await remove(oupputPath);
    execute(`${toolPath} login --qr-format image --qr-output ${oupputPath}`);

    // 调用微信开发工具命令生成登录二维码时，命令不会触发回调，导致此处只能轮询判断登录二维码图片是否有生成来判断命令执行结果
    for (let i = 0; i < 10; i++) {
      const done = await check(oupputPath);

      if (done) {
        return returnPath;
      }
    }

    throw Error('生成登录二维码超时');
  } catch (error) {
    error.name = '生成登录二维码';
    throw error;
  }
}

module.exports = {
  login
};
