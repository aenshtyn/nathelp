import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './boxed-lockscreen.html',
})
export class BoxedLockscreenComponent {
    constructor(public router: Router) {}
}
