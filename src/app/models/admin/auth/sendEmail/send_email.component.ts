import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send_email',
  templateUrl: './send_email.component.html',
  styleUrls: ['./send_email.component.scss']
})
export class SendEmailComponent implements OnInit {
  sendForm!: FormGroup;

  submitForm(): void {
    if (this.sendForm.valid) {
      console.log('submit', this.sendForm.value);
    } else {
      Object.values(this.sendForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sendForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],

    });
  }

}
