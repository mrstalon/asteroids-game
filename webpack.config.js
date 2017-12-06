let path = require('path');

module.exports = {
    entry: './sketch.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [

                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};