/**
 * Created by Jackie.Wu on 2018/6/20.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var extractLess = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false
});

var postCssOptions = {
    plugins: () => [
        autoprefixer({ browsers: ['last 2 versions'] }),
    ]
};

module.exports = {
    mode: 'development',
    entry: './demo/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: postCssOptions
                    }, {
                        loader: 'less-loader',
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            }, {
                test: /\.css$/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader',
                        options: { minimize: true }
                    }, {
                        loader: 'postcss-loader',
                        options: postCssOptions

                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            }
        ]
    },
    externals: {
        'echarts': 'window.echarts'
    },
    plugins: [
        extractLess,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: false,
        inline: false
    }
};
