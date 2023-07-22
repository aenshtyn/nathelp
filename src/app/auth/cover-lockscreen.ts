import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: './cover-lockscreen.html',
})
export class CoverLockscreenComponent {
    constructor(public router: Router) {}
}
