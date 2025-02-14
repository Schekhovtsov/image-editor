import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// @ts-expect-error See https://github.com/gxmari007/vite-plugin-eslint/issues/79
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    base: './',
    resolve: {
        alias: {
          widgets: path.resolve(__dirname, './src/widgets'),
          shared: path.resolve(__dirname, './src/shared'),
        },
    },
    plugins: [react(), svgr(), eslint(), tsconfigPaths()],
});
