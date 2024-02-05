import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
  providers: [UsersService]
})
export class UserModalComponent implements OnInit {
  userForm: FormGroup;
  roles: string[] = [];

  constructor(    
    private fb: FormBuilder, 
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) private editedUser?: User,
    ) {
      this.userForm = this.fb.group({
        id: this.fb.control(''),
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        birthday: this.fb.control('', Validators.required),
        email: this.fb.control('', [Validators.required, Validators.email]),      
        password: this.fb.control('', Validators.required),
        role: this.fb.control('', Validators.required),
      });
      
      if (editedUser) {
        this.userForm.patchValue(editedUser);
      }
  }

  ngOnInit(): void {    
    this.usersService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
    });    
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {      
      this.dialogRef.close(this.userForm.value);
    }    
  }

  onClose(): void {
    this.dialogRef.close();   
  }  
}
