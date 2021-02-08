const { PythonShell } = require('python-shell');
const Logger = require(`./src/bin/Logger`);
PythonShell.run('./src/bin/ExecHandler.py', null, function(err, res) {
    if (!err) {
        Logger.log(`Python client online`, "ready");
    } else {
        Logger.log(err, 'error');
    }
})
require(`./src/bin/Client`).init();