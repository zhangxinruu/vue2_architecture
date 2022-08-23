<template>
  <div>
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  data(){

  },
  mounted() {
    this.initThree()
  },
  methods:{
    initThree(){
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#eee')
      const canvas = document.querySelector('#three')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 10
      animate()
    },
      animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
  }
};
</script>

<style scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>