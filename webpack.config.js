const webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV || 'production',
	devtool: 'source-map',
	entry: './src/index.ts',
	output: {
		path: __dirname + "/dist",
		filename: 'ReactToastifyRedux.js',
		libraryTarget: 'umd',
		library: 'ReactToastifyRedux'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: ['babel-loader', 'awesome-typescript-loader']
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.tsx', '.ts']
	},
	externals: [
		'react',
		'react-dom',
		'react-toastify',
		'react-redux'
	],
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};