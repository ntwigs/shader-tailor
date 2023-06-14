type Options = {
  token?: string
  insertBefore?: string
  insertAfter?: string
  replace?: string
}

type Config = {
  shader: string
} & Options

type ShaderTailorBuilder = {
  token: (token: string) => ShaderTailorBuilder
  replace: (content: string) => ShaderTailorBuilder
  insertBefore: (content: string) => ShaderTailorBuilder
  insertAfter: (content: string) => ShaderTailorBuilder
  exec: () => string
}

/**
 * A builder to tailor shaders.
 */
export const shaderTailor = (shader: string): ShaderTailorBuilder =>
  shaderTailorBuilder({ shader })

const shaderTailorBuilder = (config: Config) => ({
  /**
   * Sets the token string to look for in the shader code. This must be called before exec.
   */
  token: (token: string) =>
    shaderTailorBuilder({
      ...config,
      token,
    }),

  /**
   * Sets the string that will replace the token in the shader code. This is optional and can be called before exec.
   */
  replace: (content: string) =>
    shaderTailorBuilder({
      ...config,
      replace: content,
    }),

  /**
   * Sets the string that will be inserted before the token in the shader code. This is optional and can be called before exec.
   */
  insertBefore: (content: string) =>
    shaderTailorBuilder({
      ...config,
      insertBefore: content,
    }),

  /**
   * Sets the string that will be inserted after the token in the shader code. This is optional and can be called before exec.
   */
  insertAfter: (content: string) =>
    shaderTailorBuilder({
      ...config,
      insertAfter: content,
    }),

  /**
   * Executes the shader modification based on the provided configurations. This must be called last in the chain to get the modified shader code.
   */
  exec: () => {
    const replacement = `
      ${config.insertBefore || ''}
      ${config.replace || config.token || ''}
      ${config.insertAfter || ''}
    `
    return config.shader.replace(config.token || '', replacement.trim())
  },
})
