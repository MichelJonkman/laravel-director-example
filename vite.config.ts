import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import svgLoader from 'vite-svg-loader';
import path from "path";
import mkcert from 'vite-plugin-mkcert';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode, ssrBuild }) => {
    const env = loadEnv(mode, process.cwd());

    const extraPlugins = [];

    if(env.VITE_HTTPS === 'true') {
        extraPlugins.push(mkcert({
            savePath: './.certs'
        }) as Plugin);
    }

    if(env.VITE_HTTPS === 'fake') {
        extraPlugins.push(basicSsl());
    }

    let publicDirectory = './build';

    if(command === 'serve' && env.VITE_PROJECT_PUBLIC_DIRECTORY) {
        publicDirectory = env.VITE_PROJECT_PUBLIC_DIRECTORY;
    }

    return {
        plugins: [
            vue({
                reactivityTransform: true
            }),
            laravel({
                hotFile: publicDirectory + '/director-example.hot',
                input: ['resources/js/Fieldtypes/init.ts'],
                refresh: true,
                publicDirectory: publicDirectory,
                buildDirectory: 'director/example'
            }),
            svgLoader(),
            ...extraPlugins
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@micheljonkman/laravel-director/scss/variables.scss";`,
                },
            }
        },
        resolve:{
            alias:{
                '~' : path.resolve(__dirname, './resources')
            },
        },
        server: {
            host: env.VITE_HOST
        },
    };
});
