import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './lockscreen.html',
})
export class LockscreenComponent {
    constructor(public router: Router) {}
}
