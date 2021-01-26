
const cp = require('child_process');

function execute(command, options) {
  return new Promise((resolve, reject) => {
    cp.exec(command, options, (error, stdout) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
    
      resolve(stdout);
    });
  });
}

module.exports = execute;