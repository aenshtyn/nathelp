import { Component, ViewChild, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { School } from 'src/app/models/school.model';
import { SchoolService } from 'src/app/service/school.service';

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

    displayType = 'list';
    @ViewChild('addSchoolModal') addSchoolModal!: ModalComponent;
    params!: FormGroup;
    filteredSchoolsList: any = [];
    searchSchool = '';
    schoolsList: any[] = [];
    phoneMask =  ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
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

    constructor(private schoolService: SchoolService, public fb: FormBuilder) {}

    ngOnInit() {
        this.initForm();
        this.retrieveSchools();
    }

    retrieveSchools(): void {
        this.schoolService.getAll()
        .subscribe({
            next: (data) => {
                this.schoolsList = data;
                console.log(data);
                this.searchSchools();
            },

            error:(e: any) => console.error(e)
        });
    }

    initForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            // email: ['', Validators.required],
            tel: ['', Validators.required],
            address: ['', Validators.required],
            orientation: ['', Validators.required],
            level: [],
            curriculum: [],
            county: [],
            sub_county: [],
            // school_code: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            student_population: ['', Validators.required],
            teacher_population: ['', Validators.required],
        });
    }

    searchSchools() {
        this.filteredSchoolsList = this.schoolsList.filter((d) => d.name.toLowerCase().includes(this.searchSchool.toLowerCase()));
    }

    editSchool(school: any = null) {
        this.addSchoolModal.open();
        this.initForm();
        if (school) {
            this.params.setValue({
                id: school.id,
                name: school.name,
                // school_code: school.school_code,
                email: school.email,
                tel: school.tel,
                address: school.address,
                orientation: school.orientation,
                curriculum: school.curriculum,
                county: school.county,
                sub_county: school.sub_county,
                level: school.level,
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
        // if (this.params.controls['school_code'].errors) {
        //     this.showMessage('Code is required.', 'error');
        //     return;
        // }
        if (this.params.controls['email'].errors) {
            this.showMessage('Email is required.', 'error');
            return;
        }
        if (this.params.controls['tel'].errors) {
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

        const schoolData = this.params.value;

        if (schoolData.id) {
            this.schoolService.update(schoolData.id, schoolData).subscribe(
                () => {
                    this.retrieveSchools();
                    this.showMessage('School Details updated successfully.');
                },
                (error) => {
                    console.error('Error updating school details:', error);
                }
            );
        } else {
            this.schoolService.create(schoolData).subscribe(
                () => {
                    this.retrieveSchools();
                    this.showMessage('School details have been captured successfully.');
                },
                (error) => {
                    console.error('Error creating school:', error);
                }
                );
        }
        this.addSchoolModal.close();
    }


    deleteSchool(school: any = null) {
        if(!school) {
            return;
        }

        this.schoolService.delete(school.id).subscribe(
            () => {
                this.retrieveSchools();
                this.showMessage('School has been deleted successfully.');
            },
            (error) => {
                console.error('Error deleting issue:', error);
            }

        );
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
