const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild =false /*!(env && env.prod)*/;

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: { extensions: ['.web.js', '.js', '.json', ".jsx"] },
        output: {
            filename: '[name].js',
            publicPath: 'build/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                {
                    test: /(\.js$)|(\.jsx$)/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000',
                    exclude:/node_modules/
                }
            ]
        },
        plugins: []
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/build';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './app/boot-client.jsx' },
        module: {
            rules: [
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize', fallback: "style-loader" }) }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        externals: {
            jquery: 'window.$'
        },
        plugins: [
            new ExtractTextPlugin('site.css'),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/build/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './App/boot-server.js' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./App/build/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './App/build')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};