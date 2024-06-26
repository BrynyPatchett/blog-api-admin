const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
     mode: 'development',
    entry: {
        app: ['./src/js/main.js',"./src/styles/blog.css","/src/js/navbar.js","./src/styles/index.css"],
        blogpost: ['./src/js/blogpost.js','/src/js/navbar.js',"./src/styles/index.css","./src/styles/blog.css"],
        login:["/src/js/login.js","./src/styles/index.css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Blog',
            template:'./src/index.html',
            filename:"index.html",
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            title: 'Blog',
            template:'./src/pages/blogpost.html',
            filename:"blog/index.html",
            chunks: ["blogpost"]
        }),
        new HtmlWebpackPlugin({
            title: 'Log In',
            template:'./src/pages/login.html',
            filename:"login/index.html",
            chunks: ["login"]
        }),
        new MiniCssExtractPlugin({
            filename:"styles/[name].css"
        }),

    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        watchFiles: ['./src'],
        hot:true,
      },
     
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
         clean: true,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ]
    }
};