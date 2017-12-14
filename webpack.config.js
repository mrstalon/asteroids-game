let path = require('path');

module.exports = {
    entry: './app.js',
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
            }, 
            {
                test: /\.(ttf|eot|woff|woff2|jpg|png)$/,
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[ext]"
                },
              },
        ]
    }
};