import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roles: string[] = [];

  @Output()
  userSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      birthday: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),      
      password: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.usersService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userSubmitted.emit(this.userForm.value);
      this.userForm.reset();
    }
  }
}