module.exports = {
  // 微信开发者工具中命令行工具所在路径
  toolPath: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
  // 微信小程序项目配置
  projects: {
    'project1': {
      name: 'project1',
      desc: '小程序项目一',
      path: '/path/to/project1',
      branches: [
        {
          name: 'branch1',
          func: '需求一'
        },
        {
          name: 'branch2',
          func: '需求二'
        },
        {
          name: 'dev',
          func: '开发'
        },
        {
          name: 'release',
          func: '生产'
        }
      ]
    },
    'project2': {
      name: 'project2',
      desc: '小程序项目二',
      path: '/path/to/project2',
      branches: [
        {
          name: 'branch1',
          func: '需求一'
        },
        {
          name: 'branch2',
          func: '需求二'
        },
        {
          name: 'dev',
          func: '开发'
        },
        {
          name: 'release',
          func: '生产'
        }
      ]
    }
  }
};