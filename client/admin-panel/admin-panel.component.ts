import {Component} from '@angular/core';

@Component({
    selector: 'admin-panel',
    template: require('./admin-panel.component.html'),
    styles: [require('./admin-panel.component.scss')]
})
export class AdminPanelComponent{
    isLogged : boolean = false;
    isAbout: boolean = false;
    isPortfolio: boolean = false;
    isSettings: boolean = false;
    constructor() { }

    showOptions(tab) {

        switch (tab) {
            case 'About':
                this.isAbout = true;
                this.isPortfolio = false;
                this.isSettings = false;
                break;
            case 'Portfolio':
                this.isAbout = false;
                this.isPortfolio = true;
                this.isSettings = false;
                break;
            case 'Settings':
                this.isAbout = false;
                this.isPortfolio = false;
                this.isSettings = true;
                break;
            default:
                this.isAbout = false;
                this.isPortfolio = false;
                this.isSettings = false;
        }
        
    }
}