import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modal
import { ModalModule } from 'angular-custom-modal';

// input mask
import { TextMaskModule } from 'angular2-text-mask';

// select
import { NgSelectModule } from '@ng-select/ng-select';

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// quill editor
import { QuillModule } from 'ngx-quill';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// datatable
import { DataTableModule} from '@bhplugin/ng-datatable';

// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';


import { CasesComponent } from './cases';
import { ExecutiveComponent } from './executive';
import { HelpersComponent } from './helpers';
import { OutreachComponent } from './outreach';


const routes: Routes = [

    { path: 'cases', component: CasesComponent, title: 'Cases Dashboard | CBT'},
    { path: 'executive', component: ExecutiveComponent, title: 'Executive Dashboard | CBT'},
    { path: 'helpers', component: HelpersComponent, title: 'Helpers Dashboard | CBT'},
    { path: 'outreach', component: OutreachComponent, title: 'Outreach Dashboard | CBT'},

];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        NgSelectModule,
        TextMaskModule,
        ReactiveFormsModule,
        ModalModule,
        SortablejsModule,
        MenuModule,
        NgApexchartsModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        QuillModule.forRoot(),
        FullCalendarModule,
        NgxTippyModule,
        DataTableModule
    ],
    declarations: [
        CasesComponent,
        ExecutiveComponent,
        HelpersComponent,
        OutreachComponent,
    ],
})
export class DashboardModule {}
