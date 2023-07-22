import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolsComponent } from '../schools/schools';

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
export class StudentsComponent {
    constructor(public fb: FormBuilder) {}
    displayType = 'list';
    @ViewChild('addStudentModal') addStudentModal!: ModalComponent;
    params!: FormGroup;
    filteredStudentsList: any = [];
    searchStudent = '';
    schoolInput : string | undefined
    schoolList = [
        'Kilimani Primary', 'Nairobi Primary School', 'St Georges Primary School'
    ]
    studentList = [

        { id: 1, name: 'John Doe', uid: '00001', school: 'Kilimani Primary School', grade : 5, date_joined: '01/01/2023'},
        { id: 2, name: 'Jane Doe', uid: '00002', school: 'Kilimani Primary School', grade : 4, date_joined: '01/01/2023'},
        { id: 3, name: 'Alex ', uid: '00003', school: 'Nairobi Primary School', grade : 5, date_joined: '01/01/2023'},
        { id: 4, name: 'Tim Cook', uid: '00004', school: 'Kilimani Primary School', grade : 7, date_joined: '01/01/2023'},
        { id: 5, name: 'John Doe', uid: '00005', school: 'Nairobi Primary School', grade : 6, date_joined: '01/01/2023'},
        { id: 6, name: 'John Doe', uid: '00006', school: 'Kilimani Primary School', grade : 5, date_joined: '01/01/2023'},

    ];

    initForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            uid: ['', Validators.required],
            school: ['', Validators.required],
            grade: ['', Validators.required],
            date_joined: [''],
        });
    }

    ngOnInit() {
        this.searchStudents();
    }

    searchStudents() {
        this.filteredStudentsList = this.studentList.filter((d) => d.name.toLowerCase().includes(this.searchStudent.toLowerCase()));
    }

    editStudent(student: any = null) {
        this.addStudentModal.open();
        this.initForm();
        if (student) {
            this.params.setValue({
                id: student.id,
                name: student.name,
                uid: student.uid,
                school: student.school,
                grade: student.grade,
                date_joined: student.date_joined,
            });
        }
    }

    saveStudent() {
        if (this.params.controls['name'].errors) {
            this.showMessage('Name is required.', 'error');
            return;
        }
        if (this.params.controls['uid'].errors) {
            this.showMessage('Unique ID is required.', 'error');
            return;
        }
        if (this.params.controls['grade'].errors) {
            this.showMessage('Grade is required.', 'error');
            return;
        }


        if (this.params.value.id) {
            //update student
            let student: any = this.studentList.find((d) => d.id === this.params.value.id);
            student.name = this.params.value.name;
            student.uid = this.params.value.uid;
            student.school = this.params.value.school;
            student.grade = this.params.value.grade;
            student.date_joined = this.params.value.date_joined;
        } else {
            //add student
            let maxStudentId = this.studentList.length
                ? this.studentList.reduce((max, character) => (character.id > max ? character.id : max), this.studentList[0].id)
                : 0;

            let student = {
                id: maxStudentId + 1,
                path: 'profile-35.png',
                name : this.params.value.name,
                uid : this.params.value.uid,
                school : this.params.value.school,
                grade : this.params.value.grade,
                date_joined : this.params.value.date_joined,
            };
            this.studentList.splice(0, 0, student);
            this.searchStudents();
        }

        this.showMessage('Student has been saved successfully.');
        this.addStudentModal.close();
    }

    deleteStudent(student: any = null) {
        this.studentList = this.studentList.filter((d) => d.id != student.id);
        this.searchStudents();
        this.showMessage('Student has been deleted successfully.');
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
