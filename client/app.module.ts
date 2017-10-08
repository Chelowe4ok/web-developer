import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app/app.component';
import {WelcomeDirective} from './welcome/welcome.directive';
import {WelcomeComponent} from './welcome/welcome.component';
import { AccountListComponent } from './account-list/account-list.component';
import { ProjectsComponent } from './account-list/projects/projects.component';
import { ProjectDetailComponent } from './account-list/projects/project-detail/project-detail.component';
import { AppService } from './app/app.service';

// ADMIN PANEL
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SettingsAdminComponent } from './admin-panel/settings-admin/settings-admin.component';
import { AboutAdminComponent } from './admin-panel/about-admin/about-admin.component';
import { PortfolioAdminComponent } from './admin-panel/portfolio-admin/portfolio-admin.component';

import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';

import {enableProdMode} from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: '', component: WelcomeComponent },
    { path: 'account-list', component: AccountListComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'detail/:url', component: ProjectDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminPanelComponent}
]);

@NgModule({
    imports: [BrowserModule,
        routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
                   WelcomeDirective,
    			   WelcomeComponent,
        AccountListComponent,
        ProjectsComponent,
        ProjectDetailComponent,
        AboutComponent,
        ContactComponent,
        AdminPanelComponent,
        SettingsAdminComponent,
        AboutAdminComponent,
        PortfolioAdminComponent,

             ],
    providers: [AppService],
    bootstrap: [AppComponent]
})

export class AppModule {}