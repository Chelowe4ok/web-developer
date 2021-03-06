import { Component } from '@angular/core';
import { AppService } from './../../app/app.service';
import { Project } from './../../app/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'projects-list',
    template: require('./projects.component.html'),
    styles: [require('./projects.component.scss')],
})

export class ProjectsComponent {
    projects: Project[];
    selectedProject: Project;

    constructor(private service: AppService, private router: Router) { }

    ngOnInit(): void{
        this.getProjects();
    }

    getProjects(): void {
        this.service.getProjects().then(projects => this.projects = projects);
    }

    gotoDetail(project): void {
        this.selectedProject = project;
        this.router.navigate(['/detail', project.url]);
    }
}