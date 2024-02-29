import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../courses/model/course';
import { User } from '../../../users/model/user';
import { UsersService } from '../../../users/users.service';
import { CoursesService } from '../../../courses/courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { CreateInscriptionData, Inscription } from '../../models/inscription';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';

@Component({
  selector: 'app-inscription-modal',
  templateUrl: './inscription-modal.component.html',
  styleUrl: './inscription-modal.component.scss',
  providers: [UsersService, CoursesService]
})
export class InscriptionModalComponent implements OnInit, OnDestroy {

  inscriptionId: string = "";
  inscriptionForm: FormGroup;
  subscriptions: Subscription[] = [];
  users: User[] = [];
  courses: Course[] = [];

  constructor(    
    private fb: FormBuilder, 
    private usersService: UsersService,
    private coursesService: CoursesService,
    private store: Store,
    private dialogRef: MatDialogRef<InscriptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) private editedInscription?: Inscription,
    ) {
      this.inscriptionForm = this.fb.group({
        userId: this.fb.control(null, Validators.required),
        courseId: this.fb.control(null, Validators.required),
      });
      
      if (editedInscription) {
        this.inscriptionId = editedInscription.id.toString();
        this.inscriptionForm.patchValue(editedInscription);
      }
  }

  ngOnInit(): void {    
    this.subscriptions.push(
      this.usersService.getUsersByRole('STUDENT').subscribe({
        next: (users) => {
          this.users = users;
        },
      })
    );    

    this.subscriptions.push(
      this.coursesService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
        },
      })
    );     
  }

  onSave(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {      
      let oData: CreateInscriptionData = this.inscriptionForm.value;
      if (this.editedInscription) {        
        oData.id = this.inscriptionId;
        this.store.dispatch(InscriptionsActions.updateInscription({ data: oData }));
      } else {
        this.store.dispatch(InscriptionsActions.createInscription( { data: oData }));
      }
      this.dialogRef.close();
    }    
  }

  onClose(): void {
    this.dialogRef.close();   
  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

}
