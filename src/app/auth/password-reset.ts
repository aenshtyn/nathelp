import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './password-reset.html',
})
export class PasswordResetComponent {
    constructor(public router: Router) {}
}
