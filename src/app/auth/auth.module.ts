import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LockscreenComponent } from './lockscreen';
import { LoginComponent } from './login';
import { PasswordResetComponent } from './password-reset';
import { RegisterComponent } from './register';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'lockscreen', component: LockscreenComponent, title: ' Lockscreen | VRISTO  Multipurpose Tailwind Dashboard Template' },
    { path: 'login', component: LoginComponent, title: ' Login | VRISTO  Multipurpose Tailwind Dashboard Template' },
    { path: 'password-reset',component: PasswordResetComponent, title: ' Password Reset | VRISTO  Multipurpose Tailwind Dashboard Template'},
    { path: 'register', component: RegisterComponent, title: ' Register | VRISTO - Multipurpose Tailwind Dashboard Template' },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
    ],
    declarations: [

        LockscreenComponent,
        LoginComponent,
        PasswordResetComponent,
        RegisterComponent,
    ],
})
export class AuthModule {}
