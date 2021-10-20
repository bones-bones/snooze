const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
    {
        entry: './src/projection/index.tsx',
        //mode
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.html$/, //todo add terser-webpack-plugin
                    use: [
                        {
                            loader: 'html-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/projection.html',
                filename: './projection.html',
                favicon: './public/favicon.ico',
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'projection.js',
            path: path.resolve(__dirname, 'dist/public'),
        },
    },
    {
        entry: './src/index.tsx',
        optimization: {
            minimize: false,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                        },
                    ],
                },
                {
                    test: /\.(webm|png|jpg|mp4|mp3|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html',
                favicon: './public/favicon.ico',
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist/public'),
        },
    },
    {
        entry: './server/server.ts',
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, 'dist'),
        },
        node: { __dirname: false },
    },
];
