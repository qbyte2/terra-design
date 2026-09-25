import { copyFileSync, readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "tsup"

const sourceStyles = fileURLToPath(new URL("./src/styles.css", import.meta.url))
const outputStyles = fileURLToPath(
  new URL("./dist/styles.css", import.meta.url)
)
const clientEntries = ["dist/button.js", "dist/index.js"]

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: {
    index: "src/index.ts",
    button: "src/button.tsx",
    card: "src/card.tsx",
  },
  format: ["esm"],
  minify: true,
  outDir: "dist",
  sourcemap: false,
  target: "esnext",
  treeshake: true,
  plugins: [
    useClientDirectivePlugin(clientEntries),
    {
      name: "copy-styles",
      buildEnd() {
        copyFileSync(sourceStyles, outputStyles)
      },
    },
  ],
}))

function useClientDirectivePlugin(entries: string[]) {
  return {
    name: "use-client-directive",
    buildEnd({ writtenFiles }: { writtenFiles: { name: string }[] }) {
      const clientFiles = writtenFiles.filter((file) =>
        entries.some((entry) => file.name.replace(/\\/g, "/").endsWith(entry))
      )

      for (const file of clientFiles) {
        const code = readFileSync(file.name, "utf8")

        if (!/^['\"]use client['\"];?/.test(code)) {
          writeFileSync(file.name, `"use client";\n${code}`)
        }
      }
    },
  }
}
