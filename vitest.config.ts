import { defineConfig } from 'vitest/config'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  test: {
    root: 'src',
    name: 'shader-tailor',
  },
  plugins: [glsl()]
})