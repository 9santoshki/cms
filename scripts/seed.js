
    const { exec } = require('child_process');

    exec('npx ts-node -r tsconfig-paths/register scripts/seedProducts.ts', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
    