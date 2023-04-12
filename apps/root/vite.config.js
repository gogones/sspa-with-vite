import { defineConfig, loadEnv } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const config = {
		base: './',
		server: {
			port: 9000
		},
		build: {
			rollupOptions: {
				input: {
					index: './index.html',
					'root-config': './src/react-mf-root-config.js'
				},
				output: {
					format: 'system',
					entryFileNames: '[name].js',
					assetFileNames: 'assets/[name][ext]',
					globals: {
						'single-spa': 'singleSpa',
						'single-spa-layout': 'singleSpaLayout',
						'react': 'react',
						'react-dom': 'reactDom'
					}
				},
				preserveEntrySignatures: 'strict',
				external: ['single-spa', 'single-spa-layout', 'react', 'react-dom']
			}
		},
		plugins: [
			handlebars({
				context: {
					isLocal: mode === 'development'
				}
			})
		]
	};

	return config;
});
