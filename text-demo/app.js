import * as THREE from '../libs/three/three.module.js'
import { OrbitControls } from '../libs/three/jsm/OrbitControls.js'

class App {
	constructor() {
		const container = document.createElement('div')
		document.body.appendChild(container)

		// Camera
		this.camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth,
			window.innerHeight,
			0.1,
			100
		)
		this.camera.position.set(5, 20, 70)
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()

		// Scene
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(0xffffff)

		// Light Sources
		this.light1 = new THREE.PointLight(0xff6666, 1, 100)
		this.light1.castShadow = true
		this.light1.shadow.mapSize.width = 4096
		this.light1.shadow.mapSize.height = 4096
		this.scene.add(this.light1)

		this.light2 = new THREE.PointLight(0x33ff33, 1, 100)
		this.light2.castShadow = true
		this.light2.shadow.mapSize.width = 4096
		this.light2.shadow.mapSize.height = 4096
		this.scene.add(this.light2)

		// Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.shadowMap.enabled = true
		container.appendChild(this.renderer.domElement)

		// Controls
		const controls = new OrbitControls(this.camera, this.renderer.domElement)
		controls.target = new THREE.Vector3(0, 0, -40)
		controls.update()

		// Floor
		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(200, 200),
			new THREE.MeshPhongMaterial({ color: 0xff0000 })
		)
		plane.rotation.x = -Math.PI / 2
		plane.receiveShadow = true
		this.scene.add(plane)

		// Text
		this.loader = new THREE.FontLoader()
		this.loader.load('./fonts/optimer_bold.typeface.json', (font) => {
			const geometry = new THREE.TextGeometry('State Farm', {
				font: font,
				size: 7,
				height: 1,
				curveSegments: 10,
				bevelEnabled: false,
				bevelOffset: 0,
				bevelSegments: 1,
				bevelSize: 0.3,
				bevelThickness: 1,
			})
			const materials = [
				new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
				new THREE.MeshPhongMaterial({ color: 0x0000ff }), // side
			]
			const textMesh1 = new THREE.Mesh(geometry, materials)
			textMesh1.castShadow = true
			textMesh1.position.y += 14
			textMesh1.position.x -= 20
			textMesh1.rotation.y = 0.2
			this.scene.add(textMesh1)
		})

		// this.loader.load('./fonts/optimer_bold.typeface.json', (font) => {
		// 	const geometry = new THREE.TextGeometry('In the Metaverse', {
		// 		font: font,
		// 		size: 4,
		// 		height: 2,
		// 		curveSegments: 10,
		// 		bevelEnabled: false,
		// 		bevelOffset: 0,
		// 		bevelSegments: 1,
		// 		bevelSize: 0.3,
		// 		bevelThickness: 1,
		// 	})
		// 	const materials = [
		// 		new THREE.MeshPhongMaterial({ color: 0xa8325c }), // front
		// 		new THREE.MeshPhongMaterial({ color: 0x540722 }), // side
		// 	]
		// 	const textMesh2 = new THREE.Mesh(geometry, materials)
		// 	textMesh2.castShadow = true
		// 	textMesh2.position.y += 12
		// 	textMesh2.position.x -= 13
		// 	textMesh2.rotation.y = 0.2
		// 	this.scene.add(textMesh2)
		// })

		window.addEventListener('resize', this.resize.bind(this))
		this.animate()
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	animate() {
		const now = Date.now() / 1000
		this.light1.position.y = 15
		this.light1.position.x = Math.cos(now) * 20
		this.light1.position.z = Math.sin(now) * 20

		this.light2.position.y = 15
		this.light2.position.x = Math.sin(now) * 20
		this.light2.position.z = Math.cos(now) * 20

		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.animate.bind(this))
	}
}

export { App }
