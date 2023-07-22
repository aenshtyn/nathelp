import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsComponent } from './contact-us';
import { ComingSoonComponent } from './coming-soon';
import { Error404Component } from './error404';
import { Error500Component } from './error500';
import { Error503Component } from './error503';
import { MaintenenceComponent } from './maintenence';

const routes: Routes = [
    { path: 'pages/contact-us', component: ContactUsComponent, title: 'Contact Form | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'pages/coming-soon', component: ComingSoonComponent, title: 'Coming Soon | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'pages/error404', component: Error404Component, title: 'Error 404 | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'pages/error500', component: Error500Component, title: 'Error 500 | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'pages/error503', component: Error503Component, title: 'Error 503 | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'pages/maintenence', component: MaintenenceComponent, title: 'Maintenence | VRISTO - Multipurpose Tailwind Dashboard Template' },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule],
    declarations: [

        ContactUsComponent,
        ComingSoonComponent,
        Error404Component,
        Error500Component,
        Error503Component,
        MaintenenceComponent,
    ],
})
export class PagesModule {}
