const path = require('path');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: 'dist',
    filename: 'bundle.js'
    },
  resolve : {
    alias: {
      'jquery': 'node_modules/jquery/dist/jquery.min.js',
      'assets': '/assets'
    }
  },
  module: {
    rules : [
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use:{
          loader:"file-loader",
          options:{

            name:'images/[name].[ext]',
            context: path.resolve(__dirname, "src/"),
            outputPath: 'dist/images',
            publicPath: 'dist/images',
            useRelativePaths: true 
            }
        }
        
      },
       // JavaScript/JSX Files
       {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
              name:'fonts/[name].[ext]',
              context: path.resolve(__dirname, "src/"),
              outputPath: 'dist',
              publicPath: 'dist',
              useRelativePaths: true 
            }
        }]
    }

    ]
  },
   // Plugins
   plugins: [
    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery'",
        "window.$": "jquery"
    })
    
  ]
};
