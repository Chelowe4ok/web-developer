import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { AppService, Contact } from './../../app/app.service';

@Component({
    selector: 'about-admin',
    template: require('./about-admin.component.html'),
    styles: [require('./about-admin.component.scss')]
})
export class AboutAdminComponent {
    skillsControls: FormArray;
    aboutForm: FormGroup;
     
    constructor(private fb: FormBuilder, private service: AppService) { }

    ngOnInit() {
        this.service.getAboutData().subscribe(response => {

            response.skills.forEach(skill => {
                this.skillsControls.push(this.fb.control(skill));
            });
            
            this.aboutForm.setValue({
                'header': response.header,
                'description': response.description,
                'skills': null
            });
        });

        this.createForm();
    }

    private createForm() {
        this.aboutForm = this.fb.group({
            'header': new FormControl(null, Validators.required),
            'description': new FormControl(null, [Validators.required, Validators.minLength(50)]),
            'skills': new FormArray([])
        });

        this.skillsControls = this.aboutForm.get('skills') as FormArray;
    }

    onSubmit(data) {
        this.service.updateAboutData(data).subscribe(response => {
            console.log('data update successful');
        });
    }

    addSkill() {
        this.skillsControls.push(this.fb.control(null));
        console.log(this.aboutForm);
    }

    removeSkill(index) {
        this.skillsControls.removeAt(index);
        console.log(this.aboutForm);
    }
}