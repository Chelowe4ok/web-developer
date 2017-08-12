import {Component, ElementRef, Renderer, ViewChild} from "@angular/core";

import * as THREE from 'three';

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
    
    constructor(private renderer: Renderer){}

    ngOnInit(){
        this.calculateSize(this.responsive.nativeElement.offsetWidth, this.responsive.nativeElement.offsetHeight);
    }
    
    onResize(event, responsive) {
        
        this.calculateSize(responsive.offsetWidth, responsive.offsetHeight);

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
}