const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|ico|gif|svg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/tasks.html',
            filename: 'tasks.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/projects.html',
            filename: 'projects.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['main'],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    mode: 'development',
};