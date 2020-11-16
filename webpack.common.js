const nodeExternals = require('webpack-node-externals');

module.exports = {
entry:{
        bot: "./src/bot.ts",
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js', '.tsx', ".webpack.js", ".web.js", ".mjs", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
              },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(svg|png|jpeg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }

            }
        ]
    }

};
