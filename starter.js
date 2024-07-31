const { exec } = require('child_process');

function userIsOnline() {
    return true;
}

if (userIsOnline()) {

    exec('node server.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
}
