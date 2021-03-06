var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR_LIBS = [
    "faker",
    "lodash",
    "react",
    "react-dom",
    "react-input-range",
    "react-redux",
    "react-router",
    "redux",
    "redux-form",
    "redux-thunk"
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },

    // Pro Tip!
    // Don’t use [chunkhash] in development since this will increase compilation time.
    // Separate development and production configs and use [name].js
    // for development and [name].[chunkhash].js in production.
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },

    // plugins look at the sum of files in input or output
    // loaders look at the invdidual files
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        // maybe if i made an index.html which simply included a jinja2 file,
        // i can still use this plugin?
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]

};
