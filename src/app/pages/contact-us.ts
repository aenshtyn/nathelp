import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './contact-us.html',
})
export class ContactUsComponent {
    constructor(public router: Router) {}
}
