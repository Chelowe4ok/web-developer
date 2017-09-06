import { Directive, ElementRef, Input, Renderer, HostListener, ViewChild} from "@angular/core";

import * as THREE from 'three';

import { OrbitControls } from 'three-orbitcontrols-ts';

//declare const require: (moduleId: string) => any;
//var OrbitControls = require('three-orbit-controls')(THREE)

@Directive({
    selector: '[canvas]'
})
export class WelcomeDirective{
    
    @ViewChild('canvas') canvas: ElementRef;
    backgroundImages = ['./../../assets/images/rainbow-360.jpg','./../../assets/images/desk.png'];
    clock = new THREE.Clock();
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    renderer : THREE.WebGLRenderer;
    orbitControls;
    constructor(private el: ElementRef, rend: Renderer){}
    
//    ngAfterContentInit(){
//        this.scene = new THREE.Scene();
//        
//        console.log(this.el.nativeElement.offsetWidth);
//        this.camera = new THREE.PerspectiveCamera(70, this.el.nativeElement.offsetWidth / this.el.nativeElement.offsetHeight, 1, 1000);
//        let textureLoader = new THREE.TextureLoader();
//        
//        let viewerGeometry = new THREE.SphereGeometry(500, 60, 40);
//        viewerGeometry.scale(-1,1,1);
//        
//        let viewerMaterial = new THREE.MeshBasicMaterial({
//            map: textureLoader.load(this.backgroundImages[0])
//        });
//        
//        let viewer = new THREE.Mesh(viewerGeometry, viewerMaterial);
//        viewer.rotation.y = -Math.PI / 2;
//        
//        viewer.matrixAutoUpdate  = false;
//        viewer.updateMatrix();
//        
//        this.scene.add(viewer);
//        
//        this.camera.position.z = -1;
//        
//        this.renderer = new THREE.WebGLRenderer({antialias: true});
//        this.renderer.setPixelRatio(window.devicePixelRatio);
//        this.renderer.setSize(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
//        this.el.nativeElement.appendChild(this.renderer.domElement);
//        
//        this.orbitControls =  new OrbitControls(this.camera,this.renderer.domElement);
//                
//        this.update();
//    }

    onWindowResize(){
        this.camera.aspect = this.el.nativeElement.offsetWidth / this.el.nativeElement.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.el.nativeElement.offsetWidth, this.el.nativeElement.offsetHeight);
    }

    update(){
        let delta = this.clock.getDelta() * 60;
        this.renderer.render(this.scene, this.camera);
        let _this = this;
        this.camera.rotation.y += 0.01 * Math.PI / 180;
        window.requestAnimationFrame(function(){_this.update()});
    }

}