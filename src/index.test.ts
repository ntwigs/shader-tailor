import { describe, it, expect, beforeEach, vi, afterAll } from 'vitest'
import { shaderTailor } from '.'
import shader from './__mocks__/shader.glsl'

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  vi.clearAllMocks()
})

describe('shader-tailor', () => {
  it('should add token', () => {
    expect(() => shaderTailor(shader).token('token')).to.not.throw()
  })

  it('should be executed with missing token', () => {
    const result = shaderTailor(shader).token('').exec()

    expect(console.error).toHaveBeenCalled()
    expect(result).toMatchInlineSnapshot(`
      "uniform float uAlpha;

      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
      }"
    `)
  })

  it('should replace at token', () => {
    const result = shaderTailor(shader)
      .token('gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha)')
      .replace('gl_FragColor = vec4(vec3(1.0), uAlpha)')
      .exec()

    expect(result).toMatchInlineSnapshot(`
      "uniform float uAlpha;

      void main() {
        gl_FragColor = vec4(vec3(1.0), uAlpha);
      }"
    `)
  })

  it('should insert before token', () => {
    const result = shaderTailor(shader)
      .token('void main() {')
      .insertBefore('uniform float uWave')
      .exec()

    expect(result).toMatchInlineSnapshot(`
      "uniform float uAlpha;

      uniform float uWave
            void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
      }"
    `)
  })

  it('should insert after token', () => {
    const result = shaderTailor(shader)
      .token('void main() {')
      .insertAfter('gl_FragColor = vec4(vec3(1.0), 0.0);')
      .exec()

    expect(result).toMatchInlineSnapshot(`
      "uniform float uAlpha;

      void main() {
            gl_FragColor = vec4(vec3(1.0), 0.0);
        gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
      }"
    `)
  })

  it('should work with multiple actions', () => {
    const result = shaderTailor(shader)
      .token('void main() {')
      .insertBefore('uniform float uWave;')
      .insertAfter('gl_FragColor = vec4(gl_FragColor.rgb, uWave);')
      .replace('void main(){')
      .exec()

    expect(result).toMatchInlineSnapshot(`
        "uniform float uAlpha;

        uniform float uWave;
              void main(){
              gl_FragColor = vec4(gl_FragColor.rgb, uWave);
          gl_FragColor = vec4(1.0, 1.0, 1.0, uAlpha);
        }"
      `)
  })

  it('should log error on no action taken', () => {
    shaderTailor(shader).token('s').exec()
    expect(console.error).toHaveBeenCalledWith('⚠️ No actions taken')
  })

  it('should log to error console on no token provided', () => {
    shaderTailor(shader).token('')
    expect(console.error).toHaveBeenCalledWith('⚠️ No token provided')
  })
})
