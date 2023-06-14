<p align="center">
  <img alt='shader-tailor-logo' src='https://github-production-user-asset-6210df.s3.amazonaws.com/14088342/245753040-bd0fc164-1d2b-4410-a984-4adad3e54fb5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230614%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230614T095956Z&X-Amz-Expires=300&X-Amz-Signature=638b65c95504c209ffd8652074ca19de97de953602286a1fb441fb55aed2b125&X-Amz-SignedHeaders=host&actor_id=14088342&key_id=0&repo_id=651415685' width='250'/>
  <h1 align="center">SHADER TAILOR</h1>
  <h2 align="center">💅 Your personal shader stylist 💅</h2>
</div>

<br>

# 🧵 What's this?

Unleash the power of your Three.js materials with ShaderTailor. Stitch your own shader code into existing Three.js materials, before, after, or in place of any line of shader code you choose. ShaderTailor, where you're the designer and your shaders are the runway models!

## 🚀 Getting Started

Simply install the package via Yarn:

`yarn add shader-tailor`

Or, if you prefer npm, you can use:

`npm install shader-tailor`

And import it into your project:

`import { shaderTailor } from 'shader-tailor'`

## 🛠️ How to Use

The core of ShaderTailor is the builder function. It starts with a shader code and you can chain various methods to modify it.

```
const myShader = '...'
const tailoredShader = shaderTailor(myShader)
  .token('...')
  .replace('...')
  .insertBefore('...')
  .insertAfter('...')
  .exec()
```

Here's the step-by-step guide on how to thread your masterpiece:

### Step 1: Choose your Fabric - `.shaderTailor(shader)`

Start with a shader code string that you want to modify. This is your raw material!

### Step 2: Set the Marker - `.token(token)`

Sets the token string to look for in the shader code. This is your reference point for the coming changes.

### Step 3: Stitch, Replace, or Add - `.replace(content)`, `.insertBefore(content)`, `.insertAfter(content)`

These methods allow you to modify the shader code around the specified token. You can either replace the token with your own code, insert code before the token, or insert code after the token. Or do all of them!

### Step 4: Showtime - `.exec()`

Finally, call the `.exec()` method to apply the modifications. This method returns your freshly tailored shader code. Voilà, your custom shader is ready for the runway!

## 💡 Examples

Here are some basic examples of how to use ShaderTailor:

```
const myShader = 'void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }'
const tailoredShader = shaderTailor(myShader)
  .token('gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);')
  .replace('gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);')
  .exec()

// tailoredShader now contains: 'void main() { gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); }'

```

Using ShaderTailor with Three.js materials' `onBeforeCompile` function:

```
import * as THREE from 'three'
import { shaderTailor } from 'shader-tailor'

const material = new THREE.MeshBasicMaterial()

material.onBeforeCompile = (shader) => {
  shader.fragmentShader = shaderTailor(shader.fragmentShader)
    .token('gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);')
    .replace('gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);')
    .exec()
}
```

Using ShaderTailor with [react-three-fiber](https://github.com/pmndrs/react-three-fiber) materials' `onBeforeCompile` function:

```
import * as THREE from 'three'
import { shaderTailor } from 'shader-tailor'

<meshBasicMaterial onBeforeCompile={shader => {
  shader.fragmentShader = shaderTailor(shader.fragmentShader)
    .token('gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);')
    .replace('gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);')
    .exec()
}} />
```

## 📖 License

This project is licensed under the terms of the MIT license.

## 🙋‍♂️ Got Questions?

Feel free to open an issue or submit a pull request. I appreciate your contributions! 🥰