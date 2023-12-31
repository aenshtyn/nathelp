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


import { CasesComponent } from './cases/cases';
import { StudentsComponent } from './students/students';
import { SchoolsComponent } from './schools/schools';
import { TeachersComponent } from './teachers/teachers';


const routes: Routes = [


    { path: 'records/students', component: StudentsComponent, title: 'Students | CBT - Natural Helpers'},
    { path: 'records/cases', component: CasesComponent, title: 'Cases | CBT - Natural Helpers'},
    { path: 'records/schools', component: SchoolsComponent, title: 'Schools | CBT - Natural Helpers'},
    { path: 'records/teachers', component: TeachersComponent, title: 'Teachers | CBT - Natural Helpers'},

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
        StudentsComponent,
        SchoolsComponent,
        TeachersComponent,
    ],
})
export class RecordsModule {}
