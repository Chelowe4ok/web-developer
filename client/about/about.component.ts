import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';

@Component({
    selector: 'about',
    template: require('./about.component.html'),
    styles: [require('./about.component.scss')]
})
export class AboutComponent {
    @ViewChild('photoEffect') photoEffect: ElementRef;

    constructor(private el: ElementRef, private rd: Renderer) { }
    loadPhoto(elem) {
        console.log();
        let photoWidth = elem.path[0].offsetWidth;
        let photoHeight = elem.path[0].offsetHeight;
        this.photoEffect.nativeElement.style.height = photoHeight;
        this.photoEffect.nativeElement.style.width = photoWidth;
        this.photoEffect.nativeElement.classList.add('active');
    }
}
