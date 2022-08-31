const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 8000,
		hot: true,
		compress: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/gui/resource/index.html',
		}),
	],
});
