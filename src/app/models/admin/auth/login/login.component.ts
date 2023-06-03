import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { LoginUsuario } from 'src/app/shared/utils/model/model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validateForm!: FormGroup;
  public isLogged:boolean=false;

  constructor(private fb: FormBuilder,private auth:AuthService,
    private message: NzMessageService,private AuthServices:TokenService,
    private router:Router,private scrypt:ScriptionService) {}

  ngOnInit(): void {

    if(this.AuthServices.getToken()){
      this.router.navigateByUrl('/admin')
      this.message.info('ya has iniciado session')
    }
    this.createForm();
  }

  createForm(){
    this.validateForm = this.fb.group({
      nombreUsuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

  }


  submitForm(): void {
    const id = this.message.loading('Cargando..', { nzDuration: 0 }).messageId;
    const login:LoginUsuario= new LoginUsuario(
     this.scrypt.encrypt(this.validateForm.controls['nombreUsuario'].value),
     this.scrypt.encrypt(this.validateForm.controls['password'].value)
    )
    if (this.validateForm.valid) {
      this.auth.login(login).subscribe({
        next:data=>{
        this.isLogged=true;
        this.message.remove(id);
        this.AuthServices.setToken(data.token);
        this.router.navigateByUrl('/admin/auth/process')
        console.log(data);
       },
       error:err=>{
        this.isLogged=false;
        this.message.remove(id);
        this.message.error(err.error.mensaje,{nzDuration: 10000})
       }
      }
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
