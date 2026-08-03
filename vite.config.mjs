import { defineConfig } from 'vite'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = import.meta.dirname
const htmlDir = resolve(root, 'Html')

const pages = Object.fromEntries(
    readdirSync(htmlDir)
        .filter((file) => file.endsWith('.html'))
        .map((file) => [file.replace(/\.html$/, ''), resolve(htmlDir, file)])
)

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                ...pages,
            },
        },
    },
})
