import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';

@Component({
    selector: 'about',
    template: require('./about.component.html'),
    styles: [require('./about.component.scss')]
})
export class AboutComponent {
    @ViewChild('effect') effect: ElementRef;

    constructor(private el: ElementRef, private rd: Renderer) { }
    loadPhoto(elem) {
        console.log(elem);
    }
    ngOnInit() {
        console.log(this.effect.nativeElement);

    }
}
