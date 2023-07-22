import { Component } from '@angular/core';
import { slideDownUp } from '../shared/animations';

@Component({
    moduleId: module.id,
    templateUrl: './faq.html',
    animations: [slideDownUp],
})
export class FaqComponent {
    active :any = 0;
    constructor() {}
}
