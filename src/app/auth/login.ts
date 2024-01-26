import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './login.html',
})


export class LoginComponent implements OnInit {
    form: any = {
      email: null,
      password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    // constructor(private authService: AuthService, private storageService: StorageService) { }
    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

    ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
      }
    }

    onSubmit(): void {
      const { email, password } = this.form;

      this.authService.login(email, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;

          if (this.roles.includes('admin')) {
            this.router.navigate(['/admin-dashboard']);
        } else if (this.roles.includes('moderator')) {
            this.router.navigate(['/moderator-dashboard']);
        } else {
            this.router.navigate(['/user-dashboard']);
        }
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }

    reloadPage(): void {
      window.location.reload();
    }
}
