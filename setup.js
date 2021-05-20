var fs = require('fs');
var resolve = require('path').resolve;
var join = require('path').join;
var cp = require('child_process');
var os = require('os');

var root = resolve(__dirname, './');

fs.readdirSync(root).forEach(function (mod) {
    var modPath = join(root, mod);


    if (!fs.existsSync(join(modPath, 'package.json'))) {
        return;
    }

    var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';


    cp.spawnSync(npmCmd, ['i'], {
        env: process.env,
        cwd: modPath,
        stdio: 'inherit'
    });
})

cp.spawnSync('docker-compose', ['up', "--build"], {
    env: process.env,
    cwd: "./",
    stdio: 'inherit'
});