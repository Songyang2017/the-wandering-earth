import glow from './glow.png'
import alphaMap from './alphaMap.jpg'
import Bump from './Bump.jpg'
import ColorMap from './ColorMap.jpg'
import SpecMask from './SpecMask.jpg'
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

const earthRadius = 80
export const init = (el) => {
  // 渲染器
  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  el.appendChild(renderer.domElement)

  // 场景
  var scene = new THREE.Scene()

  // 照相机
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 0, 5)

  // 建立controls
  var controls = new OrbitControls(camera, renderer.domElement)
  controls.target = new THREE.Vector3(0, 0, 0)// 控制焦点
  controls.maxDistance = earthRadius * 8
  controls.minDistance = earthRadius * 4

  scene.add(camera)

  // 灯光
  var ambient = new THREE.AmbientLight(0x222222)
  scene.add(ambient)

  // The sun.
  var light = new THREE.PointLight(0xffeecc, 1, 5000)
  light.position.set(-400, 0, 100)
  scene.add(light)

  var light3 = new THREE.PointLight(0xffffff, 0.6, 4000)
  light3.position.set(-400, 0, -150)
  scene.add(light3)

  // 建立地球模型
  var loader = new THREE.TextureLoader()
  var texture = loader.load(ColorMap)
  var bump = loader.load(Bump)
  var spec = loader.load(SpecMask)
  var material = new THREE.MeshPhongMaterial({
    color: '#ffffff',
    map: texture,
    specularMap: spec,
    specular: '#666666',
    shininess: 5,
    bumpMap: bump
  })
  var earth = new THREE.SphereGeometry(earthRadius, 128, 128)
  var sphere = new THREE.Mesh(earth, material)
  sphere.position.set(0, 0, 0)
  sphere.rotation.y = Math.PI
  scene.add(sphere)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  var geometryCloud = new THREE.SphereGeometry(earthRadius + 0.2, 128, 128)
  var alpha = loader.load(alphaMap)

  var materialCloud = new THREE.MeshPhongMaterial({
    alphaMap: alpha
  })

  materialCloud.transparent = true
  var sphereCloud = new THREE.Mesh(geometryCloud, materialCloud)
  scene.add(sphereCloud)

  var glowMap = loader.load(glow)

  // Create the sprite to add the glow effect.
  var spriteMaterial = new THREE.SpriteMaterial({
    map: glowMap,
    color: 0x0099ff,
    transparent: false,
    blending: THREE.AdditiveBlending
  })
  var sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(earthRadius * 2.5, earthRadius * 2.5, 1.0)
  sphereCloud.add(sprite)

  var clock = new THREE.Clock()
  function render () {
    var delta = clock.getDelta()
    controls.update(delta)
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  function draw () {
    sphere.rotation.y = (sphere.rotation.y + 0.002) % (Math.PI * 2)
    sphereCloud.rotation.y = (sphereCloud.rotation.y + 0.005) % (Math.PI * 2)
    renderer.render(scene, camera)
    requestAnimationFrame(draw)
  }
  render()
  draw()
}
