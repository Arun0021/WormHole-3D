// import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import gsap from 'gsap'
import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'


const scene=new THREE.Scene()
const camera = new THREE.
PerspectiveCamera(
  75,innerWidth/innerHeight,
  0.1,1000
)
const renderer = new THREE.WebGLRenderer(
  {
    antialias:true
  }
)
renderer.setSize(innerWidth,innerHeight)
// renderer.setPixelRation(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
//create a sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    // color:0xff0000
    // map:new THREE.TextureLoader().load('./img/globe2.jpg')
    // vertexShader:vertexShader,
    // fragmentShader:fragmentShader,
    vertexShader,
    fragmentShader,
    uniforms:{
      globeTexture:{
        value:new THREE.TextureLoader().load('./img/worm.jpg')
      }
    }
  
  })
)
// scene.add(sphere)
//create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    // color:0xff0000,
    // map:new THREE.TextureLoader().load('./img/globe2.jpg')
    vertexShader:atmosphereVertexShader,
    fragmentShader:atmosphereFragmentShader,
    blending:THREE.AdditiveBlending,
    side:THREE.BackSide
  
  })
)
atmosphere.scale.set(1.1,1.1,1.1)
// scene.add(atmosphere)
const group = new THREE.Group()
group.add(sphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color:0xffffff
})
const starVertices = []
for(let i=0;i<10000;i++){
  const x=(Math.random()-0.5)*2000
  const y=(Math.random()-0.5)*2000
  const z=-Math.random()*3000
  starVertices.push(x,y,z)
}

starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(
  starVertices,3
))



// console.log(starVertices)
const stars = new THREE.Points(
  starGeometry,starMaterial
)
scene.add(stars)



camera.position.z=15
const mouse={
  x:undefined,
  y:undefined

}
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
  sphere.rotation.y+=0.002
  // group.rotation.y=mouse.x*0.5
  // gsap.to(group.rotation,{
  //   x:-mouse.y*0.3,
  //   y:mouse.x*0.5,
  //   duration:2
  // })
  // sphere.rotation.z+=0.01
  // sphere.rotation.x+=0.01
}
animate()

///mouse movement

addEventListener('mousemove',()=>{
  mouse.x=(event.clientX/innerWidth)*2-1
  mouse.y=(event.clientX/innerHeight)*2+1
  // console.log(mouse)
})