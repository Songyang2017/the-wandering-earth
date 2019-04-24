<template>
  <div class="container">
    <canvas
      ref="cans"
      width="800px"
      height="600px"
    ></canvas>
  </div>
</template>
<script>
import tx from './earth.jpg'
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

export default {
  name: 'chapter1',
  data () {
    return {
    }
  },
  mounted () {
    var renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.cans,
      antialias: true
    })

    var scene = new THREE.Scene()
    var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 20)

    camera.position.set(4, -3, 10)

    // var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1, 0, 0, 0), new THREE.MeshBasicMaterial({
    //   color: 0xff0000,
    //   wireframe: true
    // }))
    var texture = new THREE.TextureLoader().load(tx)
    // var material = new THREE.MeshBasicMaterial({
    //   map: texture
    // })
    var material = new THREE.MeshLambertMaterial({
      map: texture
    })

    // light
    var light = new THREE.PointLight(0xffffff, 1.2, 1000)
    light.position.set(10, 25, 20)
    scene.add(light)

    var cube = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), material)

    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)
    scene.add(cube)

    var controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(0, 0, 0)// 控制焦点

    var clock = new THREE.Clock()
    function render () {
      var delta = clock.getDelta()
      controls.update(delta)
      requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    function draw () {
      cube.rotation.y = (cube.rotation.y + 0.01) % (Math.PI * 2)
      renderer.render(scene, camera)
      requestAnimationFrame(draw)
    }
    draw()
    // setInterval(draw, 6)
    render()
  }
}
</script>
<style lang="less" scoped>
.container {
}
</style>
