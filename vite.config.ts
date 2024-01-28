import vue from '@vitejs/plugin-vue2';
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, type UserConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
// const path = require('path');

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    plugins: [
      vue(),
      Components({
        // generate `components.d.ts` global declarations
        // https://github.com/antfu/unplugin-vue-components#typescript
        dts: true,
        // auto import for directives
        directives: false,
        // resolvers for custom components
        resolvers: [
          // Vuetify
          VuetifyResolver(),
        ],
        // https://github.com/antfu/unplugin-vue-components#types-for-global-registered-components
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
        // Vue version of project.
        version: 2.7,
      }),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        // vueTsc: true,
        // eslint: {lintCommand:'eslint '},
      }),
    ],
    define: {
      // 'process.env': process.env,
      // https://vitejs.dev/config/#define
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
    },
    // https://vitejs.dev/config/server-options.html
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    css: {
      postcss: {
        plugins: [
          // Fix vite build includes @charset problem
          // https://github.com/vitejs/vite/issues/5655
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      // https://vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        sass: {
          additionalData: [
            // vuetify variable overrides
            '@import "@/styles/variables.scss"',
            '@import "@/styles/main.scss"',
            '',
          ].join('\n'),
        },
      },
    },
    build: {
      // Build Target
      // https://vitejs.dev/config/build-options.html#build-target
      target: 'esnext',
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: ['vue', 'vue-router', 'vuex'],
            vuetify: ['vuetify/lib'],
            materialdesignicons: ['@mdi/font/css/materialdesignicons.css'],
          },
          plugins: [
            mode === 'analyze'
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: 'dist/stats.html',
                  // gzipSize: true,
                  // brotliSize: true,
                })
              : undefined,
          ],
        },
      },
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      minify: 'esbuild',
    },
    esbuild: {
      // Drop console when production build.
      drop: command === 'serve' ? [] : ['console'],
    },
  };
  return config;
});
