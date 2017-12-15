let path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, 
            {
                test: /\.(ttf|eot|woff|woff2|jpg|png)$/,
                use: 'file-loader?name=[path][name].[ext]'
            },
        ]
    }
};