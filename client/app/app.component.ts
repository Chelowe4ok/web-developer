import {Component} from "@angular/core";

@Component({
    selector:'my-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],

})
export class AppComponent{
    isOpen: boolean = false;

    toggle() {
        this.isOpen = !this.isOpen;
    }
    
}