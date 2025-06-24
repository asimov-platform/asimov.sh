import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { ZUPLO_API_URL } from './src/lib/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: ZUPLO_API_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
				secure: true
			}
		}
	}
});
