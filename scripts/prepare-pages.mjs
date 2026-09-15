import { mkdir, rename, rm } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist", "client");
const nestedDirectory = join(outputDirectory, "pages");
const nestedEntry = join(nestedDirectory, "index.html");
const rootEntry = join(outputDirectory, "index.html");

await mkdir(outputDirectory, { recursive: true });
await rm(rootEntry, { force: true });
await rename(nestedEntry, rootEntry);
await rm(nestedDirectory, { recursive: true, force: true });
console.log("Prepared the client-only Pages entry at dist/client/index.html.");
