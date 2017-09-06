import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AppService, Project } from './../../../app/app.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'project-detail',
    template: require('./project-detail.component.html')
})
export class ProjectDetailComponent implements OnInit {
    @Input() project: Project;
    constructor(private service: AppService, private route: ActivatedRoute, private location: Location) { }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.service.getProject(+params.get('id')))
            .subscribe(project => this.project = project);
    }

    goBack(): void {
        this.location.back();
    }
}