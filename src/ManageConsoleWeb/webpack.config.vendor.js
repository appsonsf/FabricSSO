const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = false;
    const extractCSS = new ExtractTextPlugin('vendor.css');

    const sharedConfig = {
        stats: { modules: true },
        resolve: { extensions: [ '.js' ] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                {
                    test: /(\.js$)|(\.jsx$)/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                }
            ]
        },
        entry: {
            vendor: [
                'react',
                'react-dom',
                'react-router-dom',
                'react-code-splitting',
                'react-redux',
                'react-router-redux',
                'redux',
                'redux-logger',
                'redux-thunk',
                'core-js',
                'babel-polyfill'
            ]
        },
        output: {
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'build') },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'build', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'App', 'build'),
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [ { test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' } ]
        },
        entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'App', 'build', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
};
