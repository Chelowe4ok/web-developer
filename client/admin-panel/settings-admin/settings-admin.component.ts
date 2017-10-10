import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AppService, Contact } from './../../app/app.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'settings-admin',
    template: require('./settings-admin.component.html'),
    styles: [require('./settings-admin.component.scss')]
})
export class SettingsAdminComponent {
    settingsForm: FormGroup;

    contact: Contact;

    constructor(private fb: FormBuilder, private service: AppService) { }

    ngOnInit() {
        this.service.getSettingsData().subscribe(response => {
            this.settingsForm.setValue(response)
        });
        
        this.createForm();
    }

    createForm() {
        this.settingsForm = this.fb.group({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'phone': new FormControl(null, [Validators.required, Validators.minLength(7)]),
            'resume': new FormControl(null)
        });
    }

    onSubmit(data) {
        this.service.updateSettingsData(data).subscribe(response => this.contact = response);
        
    }

    revert() { this.ngOnChanges(); }

    ngOnChanges() { }
}