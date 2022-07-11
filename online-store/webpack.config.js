const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            { 
                test: /\.ts$/i,
                use: 'ts-loader' 
            },

            {
                test: /\.(ttf|png|svg|jpg|jpeg|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts','.js', '.ttf']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ 
            extensions: 'ts'
        }),
        new CopyPlugin({
            patterns: [
            { from: "src/assets/images", to: "assets/images" },
            { from: "src/assets/fonts", to: "assets/fonts" },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
