import * as THREE from '../../libs/three/three.module.js'
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js'

class App {
	constructor() {
		console.log('Lecture 2-1')

		const container = document.createElement('div')
		document.body.appendChild(container)

		window.addEventListener('resize', this.resize.bind(this))
	}

	resize() {}

	render() {}
}

export { App }
