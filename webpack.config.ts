const path = require('path')
const outputPath = path.resolve(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    target: 'web',
    entry: path.join(__dirname, 'src/fireworks.ts'),
    output: {
        path: outputPath,
        filename: 'fireworks.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    },
    devServer: {
        writeToDisk: true,
        contentBase: outputPath
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'test/',
                    to: outputPath
                }
            ]
        })
    ]
}