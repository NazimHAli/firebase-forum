const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");
const stylelint = require("stylelint");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    plugins: [
        stylelint(),
        autoprefixer({
            grid: false, // Disable IE support
        }),
        isProd &&
            cssnano({
                preset: [
                    "default",
                    {
                        discardComments: {
                            removeAll: true,
                        },
                    },
                ],
            }),
        isProd &&
            purgecss({
                keyframes: true,
                content: ["./src/**/*.svelte", "./*.html"],
                safelist: [/svelte-/, /tailwindcss\/\/base/],
                defaultExtractor: (content) =>
                    content.match(/[A-Za-z0-9-_:/]+/g) || [],
            }),
    ],
};
