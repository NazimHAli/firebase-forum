(async () => {
  let esbuild = require("esbuild");

  let result = await esbuild.build({
    platform: "node",
    entryPoints: ["src/index.ts"],
    outfile: "../../dist/cloud-functions/index.js",
    minify: true,
    metafile: true,
  });

  let text = await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  });
  console.log(text);
})();
