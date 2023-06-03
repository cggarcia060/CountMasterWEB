import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restablecer_password',
  templateUrl: './restablecer_password.component.html',
  styleUrls: ['./restablecer_password.component.scss']
})
export class RestablecerPasswordComponent implements OnInit {
  resetForm!: FormGroup;

  submitForm(): void {
    if (this.resetForm.valid) {
      console.log('submit', this.resetForm.value);
    } else {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],

    });
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.resetForm.controls['confirm'].updateValueAndValidity());
  }

}
