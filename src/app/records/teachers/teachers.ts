import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
    moduleId: module.id,
    templateUrl: './teachers.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class TeachersComponent implements OnInit{

    teachersList: any = []

    constructor(public fb: FormBuilder, private teacherService: TeacherService) {}
    displayType = 'list';
    @ViewChild('addTeacherModal') addTeacherModal!: ModalComponent;
    params!: FormGroup;
    filteredTeachersList: any = [];
    searchUser = '';

    initForm() {
        this.params = this.fb.group({
            id: [0],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            school: ['', Validators.required],
            role: ['', Validators.required],
            phone: ['', Validators.required],
            dob: ['', Validators.required],
            location: [''],
        });
    }

    ngOnInit() {
        this.searchTeachers();
        this.retrieveTeachers();
    }

    retrieveTeachers(): void {
        this.teacherService.getAll()
        .subscribe({
            next: (data) => {
            this.teachersList = data;
            console.log(data);
        },
        error:(e) => console.error(e)
        });

    }

    searchTeachers() {
        this.filteredTeachersList = this.teachersList.filter((d: any) => d.first_name.toLowerCase().includes(this.searchUser.toLowerCase()));
    }

    editUser(user: any = null) {
        this.addTeacherModal.open();
        this.initForm();
        if (user) {
            this.params.setValue({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                school: user.school,
                dob: user.dob,
                phone: user.phone,
                location: user.location,
            });
        }
    }

    saveUser() {
        if (this.params.controls['first_name'].errors) {
            this.showMessage('Name is required.', 'error');
            return;
        }
        if (this.params.controls['last_name'].errors) {
            this.showMessage('Last name is required.', 'error');
            return;
        }
        if (this.params.controls['email'].errors) {
            this.showMessage('Email is required.', 'error');
            return;
        }
        if (this.params.controls['phone'].errors) {
            this.showMessage('Phone is required.', 'error');
            return;
        }
        if (this.params.controls['role'].errors) {
            this.showMessage('Occupation is required.', 'error');
            return;
        }
        if (this.params.controls['school'].errors) {
            this.showMessage('School name is required.', 'error');
            return;
        }

        if (this.params.value.id) {
            //update user
            let user: any = this.teachersList.find((d: any) => d.id === this.params.value.id);
            user.first_name = this.params.value.first_name;
            user.last_name = this.params.value.last_name;
            user.email = this.params.value.email;
            user.role = this.params.value.role;
            user.phone = this.params.value.phone;
            user.location = this.params.value.location;
            user.dob = this.params.value.location;
            user.school = this.params.value.location;
        } else {
            //add user
            let maxUserId = this.teachersList.length
                ? this.teachersList.reduce((max: any, character: any) => (character.id > max ? character.id : max), this.teachersList[0].id)
                : 0;

            let user = {
                id: maxUserId + 1,
                first_name: this.params.value.first_name,
                last_name: this.params.value.last_name,
                name: this.params.value.name,
                email: this.params.value.email,
                role: this.params.value.role,
                phone: this.params.value.phone,
                location: this.params.value.location,
                dob: this.params.value.dob,
                school: this.params.value.school,
            };
            this.teachersList.splice(0, 0, user);
            this.searchTeachers();
        }

        this.showMessage('User has been saved successfully.');
        this.addTeacherModal.close();
    }

    deleteUser(user: any = null) {
        this.teachersList = this.teachersList.filter((d: any) => d.id != user.id);
        this.searchTeachers();
        this.showMessage('User has been deleted successfully.');
    }

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }
}
