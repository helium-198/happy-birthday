import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const assetDirectory = join(outputDirectory, "assets");
const assets = await readdir(assetDirectory);
const entryScript = assets.find((file) => /^index-.*\.js$/.test(file));
const stylesheet = assets.find((file) => /^styles-.*\.css$/.test(file));

if (!entryScript || !stylesheet) {
  throw new Error("Could not find the generated client entry assets.");
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy Birthday Aashi!</title>
    <meta name="description" content="A quiet birthday keepsake for Aashi, with 22 poems written by her love." />
    <meta property="og:title" content="Happy Birthday Aashi!" />
    <meta property="og:description" content="A quiet birthday keepsake for Aashi, with 22 poems written by her love." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Happy Birthday Aashi!" />
    <meta name="twitter:description" content="A quiet birthday keepsake for Aashi, with 22 poems written by her love." />
    <link rel="icon" href="/happy-birthday/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/happy-birthday/assets/${stylesheet}" />
  </head>
  <body>
    <script type="module" src="/happy-birthday/assets/${entryScript}"></script>
  </body>
</html>
`;

await writeFile(join(outputDirectory, "index.html"), html);
console.log(`Prepared Pages entry using ${entryScript} and ${stylesheet}.`);
