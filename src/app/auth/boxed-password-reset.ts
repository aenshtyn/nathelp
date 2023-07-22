import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './boxed-password-reset.html',
})
export class BoxedPasswordResetComponent {
    constructor(public router: Router) {}
}
