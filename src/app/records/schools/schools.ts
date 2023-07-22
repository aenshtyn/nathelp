import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './schools.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class SchoolsComponent {
    constructor(public fb: FormBuilder) {}
    displayType = 'list';
    @ViewChild('addSchoolModal') addSchoolModal!: ModalComponent;
    params!: FormGroup;
    filteredSchoolsList: any = [];
    phoneMask =  ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    searchSchool = '';
    countyInput : string | undefined
    levelInput : string | undefined
    levelList = [
        'primary', 'junior secondary', 'secondary'
    ]
    countyList = [


        {
            name: "Mombasa",
            code: 1,
            capital: "Mombasa City"
        }, {
            name: "Kwale",
            code: 2,
            capital: "Kwale"
        }, {
            name: "Kilifi",
            code: 3,
            capital: "Kilifi"
        }, {
            name: "Tana River",
            code: 4,
            capital: "Hola"

        }, {
            name: "Lamu",
            code: 5,
            capital: "Lamu"
        }, {
            name: "Taita-Taveta",
            code: 6,
            capital: "Voi"
        }, {
            name: "Garissa",
            code: 7,
            capital: "Garissa"
        }, {
            name: "Wajir",
            code: 8,
            capital: "Wajir"
        }, {
            name: "Mandera",
            code: 9,
            capital: "Mandera"
        }, {
            name: "Marsabit",
            code: 10,
            capital: "Marsabit"
        }, {
            name: "Isiolo",
            code: 11,
            capital: "Isiolo"
        }, {
            name: "Meru",
            code: 12,
            capital: "Meru"
        }, {
            name: "Tharaka-Nithi",
            code: 13,
            capital: "Chuka"
        }, {
            name: "Embu",
            code: 14,
            capital: "Embu"
        }, {
            name: "Kitui",
            code: 15,
            capital: "Kitui"
        }, {
            name: "Machakos",
            code: 16,
            capital: "Machakos"
        }, {
            name: "Makueni",
            code: 17,
            capital: "Wote"
        }, {
            name: "Nyandarua",
            code: 18,
            capital: "Ol Kalou"
        }, {
            name: "Nyeri",
            code: 19,
            capital: "Nyeri"
        }, {
            name: "Kirinyaga",
            code: 20,
            capital: "Kerugoya/Kutus"
        }, {
            name: "Murang'a",
            code: 21,
            capital: "Murang'a"
        }, {
            name: "Kiambu",
            code: 22,
            capital: "Kiambu"
        }, {
            name: "Turkana",
            code: 23,
            capital: "Lodwar"
        }, {
            name: "West Pokot",
            code: 24,
            capital: "Kapenguria"
        }, {
            name: "Samburu",
            code: 25,
            capital: "Maralal"
        }, {
            name: "Trans-Nzoia",
            code: 26,
            capital: "Kitale"
        }, {
            name: "Uasin Gishu",
            code: 27,
            capital: "Eldoret"
        }, {
            name: "Elgeyo-Marakwet",
            code: 28,
            capital: "Iten"
        }, {
            name: "Nandi",
            code: 29,
            capital: "Kapsabet"
        }, {
            name: "Baringo",
            code: 30,
            capital: "Kabarnet"
        }, {
            name: "Laikipia",
            code: 31,
            capital: "Rumuruti"
        }, {
            name: "Nakuru",
            code: 32,
            capital: "Nakuru"
        }, {
            name: "Narok",
            code: 33,
            capital: "Narok"
        }, {
            name: "Kajiado",
            code: 34,
            capital: "Kajiado"
        }, {
            name: "Kericho",
            code: 35,
            capital: "Kericho"
        }, {
            name: "Bomet",
            code: 36,
            capital: "Bomet"
        }, {
            name: "Kakamega",
            code: 37,
            capital: "Kakamega"
        }, {
            name: "Vihiga",
            code: 38,
            capital: "Vihiga"
        }, {
            name: "Bungoma",
            code: 39,
            capital: "Bungoma"
        }, {
            name: "Busia",
            code: 40,
            capital: "Busia"
        }, {
            name: "Siaya",
            code: 41,
            capital: "Siaya"
        }, {
            name: "Kisumu",
            code: 42,
            capital: "Kisumu"
        }, {
            name: "Homa Bay",
            code: 43,
            capital: "Homa Bay"
        }, {
            name: "Migori",
            code: 44,
            capital: "Migori"
        }, {
            name: "Kisii",
            code: 45,
            capital: "Kisii"
        }, {
            name: "Nyamira",
            code: 46,
            capital: "Nyamira"
        }, {
            name: "Nairobi",
            code: 47,
            capital: "Nairobi City"
        }]


    schoolList = [
        {
            id: 1,
            name: 'Kilimani Primary School',
            school_code: 47004,
            email: 'kilimani@primary',
            phone: '712345678',
            county: 'Nairobi',
            level: 'Primary',
            student_population: 1200,
            teacher_population: 67,
        },
        {
            id: 2,
            name: 'Nairobi Primary School',
            school_code: 47001,
            email: 'nairobi@primary',
            phone: '712345678',
            county: 'Nairobi',
            level: 'Primary',
            student_population: 1500,
            teacher_population: 100,
        },

    ];

    initForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            school_code: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            county: [],
            level: [],
            student_population: ['', Validators.required],
            teacher_population: ['', Validators.required],
            phone: [ Validators.required],
        });
    }

    ngOnInit() {
        this.searchSchools();
    }

    searchSchools() {
        this.filteredSchoolsList = this.schoolList.filter((d) => d.name.toLowerCase().includes(this.searchSchool.toLowerCase()));
    }

    editSchool(school: any = null) {
        this.addSchoolModal.open();
        this.initForm();
        if (school) {
            this.params.setValue({
                id: school.id,
                name: school.name,
                school_code: school.school_code,
                email: school.email,
                county: school.county,
                level: school.level,
                phone: school.phone,
                student_population: school.student_population,
                teacher_population: school.teacher_population,
            });
        }
    }


    saveSchool() {
        if (this.params.controls['name'].errors) {
            this.showMessage('Name is required.', 'error');
            return;
        }
        if (this.params.controls['school_code'].errors) {
            this.showMessage('Code is required.', 'error');
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
        if (this.params.controls['county'].errors) {
            this.showMessage('Please select County.', 'error');
            return;
        }
        if (this.params.controls['level'].errors) {
            this.showMessage('Please select level.', 'error');
            return;
        }
        if (this.params.controls['student_population'].errors) {
            this.showMessage('Please enter student population.', 'error');
            return;
        }
        if (this.params.controls['teacher_population'].errors) {
            this.showMessage('Please enter teacher population.', 'error');
            return;
        }


        if (this.params.value.id) {
            //update school
            let school: any = this.schoolList.find((d) => d.id === this.params.value.id);
            school.name = this.params.value.name;
            school.school_code = this.params.value.school_code;
            school.email = this.params.value.email;
            school.county = this.params.value.county;
            school.phone = this.params.value.phone;
            school.level = this.params.value.level;
            school.student_population = this.params.value.student_population;
            school.teacher_population = this.params.value.teacher_population;

        } else {
            //add school
            let maxSchoolId = this.schoolList.length
                ? this.schoolList.reduce((max, character) => (character.id > max ? character.id : max), this.schoolList[0].id)
                : 0;

            let school = {
                id: maxSchoolId + 1,
                name: this.params.value.name,
                school_code: this.params.value.school_code,
                email: this.params.value.email,
                level: this.params.value.level,
                phone: this.params.value.phone,
                county: this.params.value.county,
               student_population : this.params.value.student_population,
              teacher_population : this.params.value.teacher_population,

            };
            this.schoolList.splice(0, 0, school);
            this.searchSchools();
        }

        this.showMessage('School has been saved successfully.');
        this.addSchoolModal.close();
    }

    deleteSchool(school: any = null) {
        this.schoolList = this.schoolList.filter((d) => d.id != school.id);
        this.searchSchools();
        this.showMessage('School has been deleted successfully.');
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
