import replace from "@rollup/plugin-replace";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { loadEnv } from "vite";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        build: {
            emptyOutDir: true,
            outDir: "../../dist/forum",
            minify: "terser",
            terserOptions: {
                format: {
                    comments: false,
                },
            },
        },
        plugins: [
            svelte(),
            replace({
                preventAssignment: true,
                "process.env.apiKey": JSON.stringify(process.env.VITE_apiKey),
                "process.env.appId": JSON.stringify(process.env.VITE_appId),
                "process.env.authDomain": JSON.stringify(
                    process.env.VITE_authDomain
                ),
                "process.env.measurementId": JSON.stringify(
                    process.env.VITE_measurementId
                ),
                "process.env.messagingSenderId": JSON.stringify(
                    process.env.VITE_messagingSenderId
                ),
                "process.env.projectId": JSON.stringify(
                    process.env.VITE_projectId
                ),
                "process.env.storageBucket": JSON.stringify(
                    process.env.VITE_storageBucket
                ),
            }),
        ],
        resolve: {
            alias: {
                "@": resolve(".", "src"),
            },
        },
        server: {
            https: true,
        },
    });
};
