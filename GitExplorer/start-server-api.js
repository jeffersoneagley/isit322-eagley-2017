/**
 * Created by fish on 5/30/17.
 */

const args = ['start'];
const opts = {stdio: 'inherit', cwd: 'server', shell: true};
const cp = require('child_process');
cp.spawn('npm', args, opts);
