const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	// mode: '', // Specify mode explicitly 
	entry: './src/index.js', // Application input
	output: { // Bundle output
		path: path.resolve(__dirname, 'dist'), // Output directory
		filename: '[name].[contenthash].bundle.js', // Output filename
		assetModuleFilename: 'assets/images/[hash][ext][query]', // 
	},
	resolve: {
		extensions: [ '.js' ], // File extensions to be processed by webpack
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@templates': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/'),
		}
	},
	module: {
		rules: [ // Webpack rules
			{	
				test: /\.m?js$/, // Files extensions to be processed
				exclude: /node_modules/, // Exclude folders and/or files
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css|.styl$/i,
				use: [
					MiniCSSExtractPlugin.loader, // Minify CSS files
					'css-loader', // Allow include CSS in JS
					'stylus-loader', // Allow include stylus files in JS
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i, // Copy images into dist folder
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000, // Maximum file size of bytes
						mimetype: 'application/font-woff', // Linked MIME file type
						name: '[name].[contenthash].[ext]', // File output name [name] => Input filename, [ext] => Input file extension
						outputPath: './assets/fonts/', // Output directory
						publicPath: './assets/fonts/', // Public directory
						esModule: false, // Allow to file-loader generate JS modules
					},
				},
			},
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			inject: true, // Inject bundle into HTML template
			template: './public/index.html', // HTML template
			filename: './index.html' // Output file
		}),
		new MiniCSSExtractPlugin({
			filename: 'assets/css/[name].[contenthash].css',
		}), // Initialize plugin
		new CopyPlugin({ // Initialize plugin and pass settings
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'), // Inout folder
					to: 'assets/images' // Output folder
				}
			]
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CSSMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
}
