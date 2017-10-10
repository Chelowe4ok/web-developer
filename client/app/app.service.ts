import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

    private adminUrls = { admin: 'api/admin', settings: 'api/settings', about: 'api/aboutadmin' };

    constructor(private http: Http) { }

    getProjects(): Promise<Project[]> {
        return Promise.resolve(PROJECTS);
    }

    getProject(url: string): Promise<Project> {
        console.log(url);
        return this.getProjects()
            .then(projects => projects.find(project => project.url === url));
    }

    // Admin panel

    getAdmin(): Observable<any> {
        return this.http.get(this.adminUrls.admin).map(response => {
            let data = response.json();
            return data;
        });
    }

    getSettingsData(): Observable<any> {
        return this.http.get(this.adminUrls.settings).map(response => {
            let data = response.json();
            return data;
        });
    }

    updateSettingsData(data): Observable<any> {
        return this.http.post(this.adminUrls.settings, data).map(response => {
            let data = response.json();
            let contact = new Contact(data.email, data.phone, data.resume);
            return contact;
        });
    }

    getAboutData(): Observable<any> {
        return this.http.get(this.adminUrls.about).map(response => {
            let data = response.json();
            return data;
        });
    }

    updateAboutData(data): Observable<any> {
        return this.http.post(this.adminUrls.about, data).map(response => {
            let data = response.json();
            return data;
        });
    }


}

export class Contact {
    email: string;
    phone: string;
    resume: string;

    constructor(email, phone, resume) {
        this.email = email;
        this.phone = phone;
        this.resume = resume;
    }
    
}

export const PROJECTS: Project[] = [
    { id: 11, name: 'MDVD site', description: 'Develop companies site MDVD', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/07/default.jpg', url: 'mdvd' },
    { id: 12, name: 'Armadio site', description: 'Develop companies site Armadio', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/05/small-business.jpg', url: 'armadio'},
    { id: 13, name: 'Else', description: 'Description project', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/07/landing-classic-300x197.jpg', url: 'else' }
];

export class Project {
    id: number;
    name: string;
    description: string;
    image: string;
    url: string;
}

