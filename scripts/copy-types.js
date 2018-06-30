const fs = require('fs');
const path = require('path');
const glob = require('glob');

glob(`./src/types/*.d.ts`, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(file => {
    fs.copyFileSync(file, `./lib/types/${path.basename(file)}`);
  });
});
