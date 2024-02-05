import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.scss'
})
export class CourseModalComponent {
  courseForm: FormGroup;
  modalities: string[] = ['Anual', 'Cuatrimestral'];

  isEdition = false;

  constructor(    
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) private editedCourse?: Course,
    ) {
      this.courseForm = this.fb.group({
        id: this.fb.control('', Validators.required),
        name: this.fb.control('', Validators.required),
        hours: this.fb.control('', Validators.required),
        modality: this.fb.control('', Validators.required),
      });
      
      if (editedCourse) {
        this.courseForm.patchValue(editedCourse);
        this.isEdition = true;
      }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {      
      this.dialogRef.close(this.courseForm.value);
    }    
  }

  onClose(): void {
    this.dialogRef.close();   
  }  
}
