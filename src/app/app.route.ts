import { Routes } from '@angular/router';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { ExecutiveComponent } from './dashboards/executive';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [

            { path: '', component: ExecutiveComponent, title: 'Dashboard | CTB'},
            //records
            { path: '', loadChildren: () => import('./records/records.module').then((d) => d.RecordsModule) },

            //dashboards
            { path: '', loadChildren: () => import('./dashboards/dashboard.module').then((d) => d.DashboardModule) },


            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },


            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, title: 'Knowledge Base | CBT - Natural Helpers Tool' },
            { path: 'pages/faq', component: FaqComponent, title: 'FAQ | CBT - Natural Helpers Tool' },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
