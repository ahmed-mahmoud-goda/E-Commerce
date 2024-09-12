import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  isCodeForm: boolean = false;
  isResetForm: boolean = false;

isLoading:boolean = false;
errorMsg!:string

  constructor(private _auth: AuthService, private _router:Router) { }

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })
  resetDataForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6}/)])
  })


  sendEmail() {

    this.isLoading = true;

    this._auth.sendEmailApi(this.emailForm.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.isCodeForm = true;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error.message;
      }
    })
  }

  sendCode() {
    this.isLoading = true;

    this._auth.sendCodeApi(this.codeForm.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.isCodeForm = false;
          this.isResetForm = true;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error.message;
      }
    })
  }

  resetData() {
    this.isLoading = true;

    this._auth.resetDataApi(this.resetDataForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('userToken',res.token)
        this._auth.decodeData()
        this._router.navigate(['/home'])
        
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error.message;
      }
    })
  }
}
