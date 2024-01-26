import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ConditionService } from 'src/app/service/condition.service';
import { Condition } from 'src/app/models/condition.model';

@Component({
    moduleId: module.id,
    templateUrl: './conditions.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class ConditionsComponent {

    displayType = 'list';
    @ViewChild('addConditionModal') addConditionModal!: ModalComponent;
    params!: FormGroup;
    filteredConditionsList: any = [];
    searchCondition = '';
    conditionsList: any[] = [];

    constructor(public fb: FormBuilder, private conditionService: ConditionService) {}

    ngOnInit() {
        this.initForm();
        this.loadConditions();
    }

    loadConditions(): void {
        this.conditionService.getAll()
        .subscribe({
            next: (data) => {
                this.conditionsList = data;
                console.log(data);
                this.searchConditions();
            },
            error: (error) => {
                console.log('Error loading conditions:', error);
            },
        });
    }
    initForm() {
        this.params = this.fb.group({
            id: [0],
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
    }


    searchConditions() {
        this.filteredConditionsList = this.conditionsList.filter((d) => d.name.toLowerCase().includes(this.searchCondition.toLowerCase()));
    }

    editCondition(condition: any = null) {
        this.addConditionModal.open();
        this.initForm();
        if (condition) {
            this.params.setValue({
                id: condition.id,
                name: condition.name,
               description: condition.description,
            });
        }
    }

    saveCondition() {
        if (this.params.controls['name'].errors) {
            this.showMessage('Name is required.', 'error');
            return;
        }
        if (this.params.controls['description'].errors) {
            this.showMessage('Description is required.', 'error');
            return;
        }

        const conditionData = this.params.value;

        if (conditionData.id) {
            this.conditionService.update(conditionData.id, conditionData).subscribe(
                () => {
                    this.loadConditions();
                    this.showMessage('Condition updated successfully.');
                },
                (error) => {
                    console.error('Error updating condition:', error);
                }
            );
        } else {
            this.conditionService.create(conditionData).subscribe(
                () => {
                    this.loadConditions();
                    this.showMessage('Condition has been created successfully.');
                },
                (error) => {
                    console.error('Error creating condition:', error);
                }
            );
        }

        this.addConditionModal.close();
    }

    deleteCondition(condition: any = null) {
        if(!condition) {
            return;
        }

        this.conditionService.delete(condition.id).subscribe(
            () => {
                this.loadConditions();
                this.showMessage('Condition has been deleted successfully.');
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
