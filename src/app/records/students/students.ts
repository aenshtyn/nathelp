import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student.service';
import { SchoolsComponent } from '../schools/schools';
import { Stream } from 'stream';

@Component({
    moduleId: module.id,
    templateUrl: './students.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class StudentsComponent implements OnInit {
    studentsList: any = [];
    params!: FormGroup;
    displayType = 'list';
    @ViewChild('addStudentModal') addStudentModal!: ModalComponent;
    filteredStudentsList: any = [];
    searchStudent = '';
    schoolInput: string | undefined;
    schoolList = ['Kilimani Primary', 'Nairobi Primary School', 'St Georges Primary School'];
    disabilityInput: string | undefined;
    disabilityList = ['physical', 'optical', 'hearing'];
    genderInput: string | undefined;
    genderList = ['male', 'female'];

    constructor(public fb: FormBuilder, private studentService: StudentService) {}
    initForm() {
        this.params = this.fb.group({
            id: [0],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            dob: ['', Validators.required],
            // gender: [''],
            gender: ['', Validators.required],
            disability: [''],
            school: [''],
            grade: ['', Validators.required],
            stream: ['', Validators.required],
            date_joined: [''],
        });
    }

    ngOnInit() {
        this.searchStudents();
        this.retrieveStudents();
    }

    // saveStudent() {
    //     this.studentService.create(this.params.value)
    //     .subscribe({
    //         next: (res) => {
    //         console.log(res);
    //     },
    //     error: (e) => console.error(e)
    // });

    // }

    retrieveStudents(): void {
        // Show a loading indicator
        // this.isLoading = true;

        this.studentService.getAll().subscribe({
            next: (data) => {
                // Update the studentsList
                this.studentsList = data;
                console.log('Students data retrieved successfully:', data);
            },
            error: (error) => {
                console.error('Error retrieving students:', error);
                // Handle the error and show an error message to the user
                this.showMessage('An error occurred while retrieving students.');
            },
            complete: () => {
                // Hide the loading indicator
                // this.isLoading = false;
            },
        });
    }

    // deleteStudent(student: any = null) {
    //     this.studentsList = this.studentsList.filter((d: any) => d.id != student.id);
    //     this.searchStudents();
    //     this.showMessage('Students records have been deleted successfully.');
    // }

    searchStudents() {
        // this.filteredStudentsList = this.studentsList.filter((d) => d.name.toLowerCase().includes(this.searchStudent.toLowerCase()));
    }
    editStudent(student: any = null) {
        this.addStudentModal.open();
        this.initForm();
        if (student) {
            this.params.setValue({
                id: student.id,
                first_name: student.first_name,
                last_name: student.last_name,
                dob: student.dob,
                gender: student.gender,
                disability: student.disability,
                school: student.school,
                grade: student.grade,
                stream: student.stream,
                date_joined: student.date_joined,
            });
        }
    }

    // saveStudent() {
    //     if (this.params.controls['first_name'].errors) {
    //         this.showMessage('First Name is required.', 'error');
    //         return;
    //     }
    //     // if (this.params.controls['last_name'].errors) {
    //     //     this.showMessage('Last Name is required.', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['dob'].errors) {
    //     //     this.showMessage('Date of Birth is required.', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['gender'].errors) {
    //     // this.showMessage('Please Select an option.', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['disability'].errors) {
    //     // this.showMessage('Please Select a valid option', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['school'].errors) {
    //     //     this.showMessage('Please Select School', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['grade'].errors) {
    //     //     this.showMessage('Please input students grade', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['stream'].errors) {
    //     //     this.showMessage('Please input students stream.', 'error');
    //     //     return;
    //     // }
    //     // if (this.params.controls['date_joined'].errors) {
    //     //     this.showMessage('Date Joined is required.', 'error');
    //     //     return;
    //     // }

    //     if (this.params.value.id) {
    //         // update student
    //         let student: any = this.studentsList.find((d: any) => d.id === this.params.value.id);
    //         student.first_name = this.params.value.first_name;
    //         student.last_name = this.params.value.last_name;
    //         student.dob = this.params.value.dob;
    //         student.gender = this.params.value.gender;
    //         student.disability = this.params.value.disability;
    //         student.school = this.params.value.school;
    //         student.grade = this.params.value.grade;
    //         student.stream = this.params.value.stream;
    //         student.date_joined = this.params.value.date_joined;
    //     } else {
    //         //add student
    //         let maxStudentId = this.studentsList.length
    //             ? this.studentsList.reduce((max: any, character: any) => (character.id > max ? character.id : max), this.studentsList[0].id)
    //             : 0;

    //         let student = {
    //             id: maxStudentId + 1,
    //             first_name: this.params.value.first_name,
    //             last_name: this.params.value.last_name,
    //             dob: this.params.value.dob,
    //             gender: this.params.value.gender,
    //             disability: this.params.value.disability,
    //             school: this.params.value.school,
    //             grade: this.params.value.grade,
    //             stream: this.params.value.stream,
    //             date_joined: this.params.value.date_joined,
    //         };

    //         this.studentService.create(student).subscribe({
    //             next: (res) => {
    //                 console.log(res);
    //             },
    //             error: (e) => console.error(e),
    //         });
    //     }

    //     this.showMessage('Student has been saved successfully.');
    //     this.addStudentModal.close();
    // }

    // saveStudent() {
    //     this.studentService.create(this.initForm.params);
    //     .subscribe({
    //         next: (res) => {
    //         console.log(res);
    //     })
    // }
    saveStudent() {
        // Form validation
        if (this.params.invalid) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (this.params.value.id) {
            // Update existing student
            const existingStudent: any = this.studentsList.find((d: any) => d.id === this.params.value.id);
            this.updateStudent(existingStudent);
        } else {
            // Add new student
            this.addStudent();
        }

        // Close the modal and display success message
        this.showMessage('Student has been saved successfully.');
        this.addStudentModal.close();
    }

    private updateStudent(student: any) {
        // Common logic for updating a student
        student.first_name = this.params.value.first_name;
        student.last_name = this.params.value.last_name;
        student.dob = this.params.value.dob;
        student.gender = this.params.value.gender;
        student.disability = this.params.value.disability;
        student.school = this.params.value.school;
        student.grade = this.params.value.grade;
        student.stream = this.params.value.stream;
        student.date_joined = this.params.value.date_joined;

        // Send update request to the service
        this.studentService.update(student.id, student).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (e) => console.error(e),
        });
    }

    private addStudent() {
        // Common logic for adding a new student
        const maxStudentId = this.studentsList.length
            ? this.studentsList.reduce((max: any, character: any) => (character.id > max ? character.id : max), this.studentsList[0].id)
            : 0;

        const newStudent = {
            id: maxStudentId + 1,
            first_name: this.params.value.first_name,
            last_name: this.params.value.last_name,
            dob: this.params.value.dob,
            gender: this.params.value.gender,
            disability: this.params.value.disability,
            school: this.params.value.school,
            grade: this.params.value.grade,
            stream: this.params.value.stream,
            date_joined: this.params.value.date_joined,
        };

        // Send create request to the service
        this.studentService.create(newStudent).subscribe({
            next: (res) => {
                console.log(res);
                // Update the local list with the newly created student
                this.studentsList.push(newStudent);
            },
            error: (e) => console.error(e),
        });
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

    deleteStudent(id: number) {
        this.studentService.delete(id).subscribe({
            next: () => {
                this.studentsList = this.studentsList.filter((d: any) => d.id !== id);
                console.log('Student details have been deleted successfully');
                this.showMessage('Student record has been deleted successfully.');
                this.retrieveStudents(); // Assuming this updates the list from the server
            },
            error: (error) => {
                console.error('Error deleting student:', error);
                // Handle the error, show an error message, etc.
                // You can also revert any changes made to the studentsList.
                this.showMessage('An error occurred while deleting the student.');
            },
        });
    }
}
