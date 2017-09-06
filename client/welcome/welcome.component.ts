import {Component, ElementRef, Renderer, ViewChild} from "@angular/core";

import * as THREE from 'three';

import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
    selector:'welcome',
    template: require('./welcome.component.html'),
    styles: [require('./welcome.component.css')],
    })
export class WelcomeComponent{

    isResponsiveWidth = true;
    isResponsiveHeight = false;
    contentWidth: number;
    contentHeight: number;
        
    @ViewChild('responsive') responsive: ElementRef;
    
    @ViewChild('canvas') canvas: ElementRef;
    backgroundImages = ['./../../assets/images/rainbow-360.jpg','./../../assets/images/desk.png'];
    clock = new THREE.Clock();
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    renderer : THREE.WebGLRenderer;
    orbitControls;
    
    constructor(private rend: Renderer){}

    ngOnInit(){
        this.calculateSize(this.responsive.nativeElement.offsetWidth, this.responsive.nativeElement.offsetHeight);
    }
    
    onResize(event, responsive) {
        
        this.calculateSize(responsive.offsetWidth, responsive.offsetHeight);
        this.onWindowResize();

    }
    
    calculateSize( width, height ){
        
        if ( width / height >= 2.1275 ){
            this.isResponsiveWidth = false;
            this.isResponsiveHeight = true;
            this.contentWidth = height * 2.1275;
            this.contentHeight = height;
        }else {
            this.isResponsiveWidth = true;
            this.isResponsiveHeight = false;
            this.contentHeight = width / 2.1275;
            this.contentWidth = width;
        }
    }
    
    videoControls(event, item){
        if (event.target.paused){
            event.target.play();
        }else{
            event.target.pause();
        }
        
    }
    
    
    
    ngAfterViewInit(){
        //this.initCanvas();
    }
    
    initCanvas(){
        this.scene = new THREE.Scene();
        
        console.log('comp: ' + this.canvas.nativeElement.offsetWidth);
        this.camera = new THREE.PerspectiveCamera(70, this.canvas.nativeElement.offsetWidth / this.canvas.nativeElement.offsetHeight, 1, 26);
        let textureLoader = new THREE.TextureLoader();
        
        let viewerGeometry = new THREE.SphereGeometry(25, 6, 4);
        viewerGeometry.scale(-1,1,1);
        
        let viewerMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(this.backgroundImages[0])
        });
        
        let viewer = new THREE.Mesh(viewerGeometry, viewerMaterial);
        viewer.rotation.y = -Math.PI / 2;
        
        viewer.matrixAutoUpdate  = false;
        viewer.updateMatrix();
        
        this.scene.add(viewer);
        
        this.camera.position.z = 1;
        
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.nativeElement.offsetWidth, this.canvas.nativeElement.offsetHeight);
        this.canvas.nativeElement.appendChild(this.renderer.domElement);
        
        this.orbitControls =  new OrbitControls(this.camera,this.renderer.domElement);
        
        var mesh = null;
        
        
        var loader = new THREE.JSONLoader();
        let _this = this;        
        /*loader.load('./../assets/meteor.json', function (geometryMeteor, matMeteor) {
            let materialMeteor = new THREE.MeshBasicMaterial({
                color: '#333'
            });

            _this.getSmallMateor(geometryMeteor);

            let meshMeteor = new THREE.Mesh(geometryMeteor, materialMeteor);
            _this.scene.add(meshMeteor);
            meshMeteor.position.x = 0;
            meshMeteor.position.z = -101;
            meshMeteor.name = 'meshMeteor';
            _this.camera.lookAt(new THREE.Vector3(0,0,0));
        });*/
                
        this.update();
    }

    onWindowResize(){
        this.camera.aspect = this.canvas.nativeElement.offsetWidth / this.canvas.nativeElement.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.nativeElement.offsetWidth, this.canvas.nativeElement.offsetHeight);
    }

    getSmallMateor(geometry) {
    
        let sizes = [];
        for (let i = 0; i < 12; i++) {
            let mater = new THREE.MeshBasicMaterial({ color: '#333' });
            let newMet = new THREE.Mesh(geometry, mater);
                   
            switch(i){
                case 0:
                    let xPos = -1;
                    let yPos = 1;
                    break;
                case 1: 
                    let xPos = -1;
                    let yPos = 0;
                    break;
                case 2:
                    let xPos = -1;
                    let yPos = -1;
                    break;
                case 3: 
                    let xPos = -1.5;
                    let yPos = -1.5;
                    break;
                case 4:
                    let xPos = -2;
                    let yPos = -1;
                    break;
                case 5: 
                    let xPos = 1.5;
                    let yPos = 0.8;
                    break;
                case 6: 
                    let xPos = 1;
                    let yPos = 0.75;
                    break;
                case 7:
                    let xPos = 0.5;
                    let yPos = 0.2;
                    break;
                case 8:
                    let xPos = 1;
                    let yPos = -0.2;
                    break;
                case 9:
                    let xPos = 1.5;
                    let yPos = -0.6;
                    break;
                case 10:
                    let xPos = 1;
                    let yPos = -1.1;
                    break;
                case 11:
                    let xPos = 0.5;
                    let yPos = -1.2;
                    break;
                default:
                    let xPos = 0;
                    let yPos = -1;
                    break;
                
            }
            
            let scale = Math.random() / 5 + 0.1;
            newMet.position.x = xPos;
            newMet.position.y = yPos;
            newMet.position.z = -101 - i / 2;
            
            newMet.scale.set(scale, scale, scale);
            
            
            newMet.name = i.toString();
            this.scene.add(newMet);

        }
        
    }

    update(){
        let delta = this.clock.getDelta() * 60;
        this.renderer.render(this.scene, this.camera);
        
        let meshMeteor = this.scene.getObjectByName('meshMeteor');
        if (meshMeteor) {
            
            meshMeteor.rotation.x += 0.01;
            meshMeteor.rotation.y += 0.015;
            meshMeteor.position.z += 0.2;
            meshMeteor.position.x += 0.005;
        }
        
        let newMet = this.scene.getObjectByName('4');

        if (newMet) {
                
                for (let i=0; i < 12; i++){
                    let metI = this.scene.getObjectByName(i.toString());
                    metI.rotation.x += 0.005;
                    metI.rotation.y += 0.075;
                    if ( metI.position.z < -2 ){
                        metI.position.z += 0.2;
                    }else {
                        metI.position.x -= 0.005;
                        metI.position.z += 0.01;
                    }
                }
        }

        let _this = this;
        this.camera.rotation.y += 0.01 * Math.PI / 180;
        window.requestAnimationFrame(function(){_this.update()});
    }
}