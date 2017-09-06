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

import {enableProdMode} from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: '',      component: WelcomeComponent },
    { path: 'account-list', component: AccountListComponent },
    { path: 'detail/:id', component: ProjectDetailComponent },
    { path: 'app', component: AccountListComponent }
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
             ],
    providers: [AppService],
    bootstrap: [AppComponent]
})

export class AppModule {}