import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    constructor(private storageService: StorageService, private router: Router) {}

    canActivate(): boolean {
        const user = this.storageService.getUser();

        // Check if the user is logged in
        if (this.storageService.isLoggedIn()) {
            // Define a configuration object for roles and allowed pages
            const roleConfig = {
                admin: ['page1', 'page2', 'page3', /*... 17 more pages ...*/, 'page20'],
                moderator: ['page1', 'page2', /*... 13 more pages ...*/, 'page15'],
                user: ['page1', 'page2', 'page3', 'page4', 'page5'],
            };

            // Check user roles
            if (user.roles.includes('admin')) {
                // Admin has access to all pages
                return true;
            } else if (user.roles.includes('moderator')) {
                // Moderator has access to pages defined in roleConfig.moderator
                const allowedPages = roleConfig.moderator;
                if (allowedPages.includes(this.router.url.substring(1))) {
                    return true;
                } else {
                    // Redirect to moderator dashboard if trying to access other pages
                    this.router.navigate(['/moderator-dashboard']);
                    return false;
                }
            } else if (user.roles.includes('user')) {
                // User has access to pages defined in roleConfig.user
                const allowedPages = roleConfig.user;
                if (allowedPages.includes(this.router.url.substring(1))) {
                    return true;
                } else {
                    // Redirect to user dashboard if trying to access other pages
                    this.router.navigate(['/user-dashboard']);
                    return false;
                }
            }
        }

        // Redirect to login if not logged in or no matching role
        this.router.navigate(['/login']);
        return false;
    }
}
