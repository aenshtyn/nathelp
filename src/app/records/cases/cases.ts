import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './cases.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class CasesComponent {
    constructor(public fb: FormBuilder) {}
    displayType = 'list';
    @ViewChild('addIssueModal') addIssueModal!: ModalComponent;
    params!: FormGroup;
    filteredIssuesList: any = [];
    searchIssue = '';
    issueList = [
        {id: 1, name: 'Hard Drugs', description: 'Use of Hard Drugs like Cocaiie'},
        {id: 2, name: 'Smoking', description: 'Use of Tobbaco and Cannabis'},
        {id: 3, name: 'Alcohol', description: 'Use of alcoholic substances'},
        {id: 4, name: 'Depression', description: 'Feeling unmotivated'},
        {id: 5, name: 'Anxiety', description: 'Feeling nervous, fear and panic'},
    ];

    initForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.searchIssues();
    }

    searchIssues() {
        this.filteredIssuesList = this.issueList.filter((d) => d.name.toLowerCase().includes(this.searchIssue.toLowerCase()));
    }

    editIssue(issue: any = null) {
        this.addIssueModal.open();
        this.initForm();
        if (issue) {
            this.params.setValue({
                id: issue.id,
                name: issue.name,
               description: issue.description,
            });
        }
    }

    saveIssue() {
        if (this.params.controls['name'].errors) {
            this.showMessage('Name is required.', 'error');
            return;
        }
        if (this.params.controls['description'].errors) {
            this.showMessage('Descritpiton is required.', 'error');
            return;
        }

        if (this.params.value.id) {
            //update issue
            let issue: any = this.issueList.find((d) => d.id === this.params.value.id);
            issue.name = this.params.value.name;
            issue.description = this.params.value.description;
        } else {
            //add issue
            let maxIssueId = this.issueList.length
                ? this.issueList.reduce((max, character) => (character.id > max ? character.id : max), this.issueList[0].id)
                : 0;

            let issue = {
                id: maxIssueId + 1,
                name: this.params.value.name,
                description: this.params.value.description,
            };
            this.issueList.splice(0, 0, issue);
            this.searchIssues();
        }

        this.showMessage('Issue has been saved successfully.');
        this.addIssueModal.close();
    }

    deleteIssue(issue: any = null) {
        this.issueList = this.issueList.filter((d) => d.id != issue.id);
        this.searchIssues();
        this.showMessage('Issue has been deleted successfully.');
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
