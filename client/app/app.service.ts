import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    getProjects(): Promise<Project[]> {
        return Promise.resolve(PROJECTS);
    }

    getProject(id: number): Promise<Project> {
        return this.getProjects()
            .then(projects => projects.find(project => project.id === id));
    }
}

export const PROJECTS: Project[] = [
    { id: 11, name: 'MDVD site', description: 'Develop companies site MDVD', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/07/default.jpg' },
    { id: 12, name: 'Armadio site', description: 'Develop companies site Armadio', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/05/small-business.jpg'},
    { id: 13, name: 'Else', description: 'Description project', image: 'http://codeless.co/folie/presentation/wp-content/uploads/2017/07/landing-classic-300x197.jpg' }
];

export class Project {
    id: number;
    name: string;
    description: string;
    image: string;
}