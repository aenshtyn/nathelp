import { Component } from '@angular/core';
import { slideDownUp } from '../shared/animations';

@Component({
    moduleId: module.id,
    templateUrl: './knowledge-base.html',
    animations: [slideDownUp],
})
export class KnowledgeBaseComponent {
    storeData: any;
    active:any = 0;
    constructor() {}
}
