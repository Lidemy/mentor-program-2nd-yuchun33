const path = require('path');
module.exports = {
    entry: './index.js',
    mode: 'none',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, './none'),
    }
};