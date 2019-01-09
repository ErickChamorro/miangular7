import { ApiService } from './../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public apiService: ApiService) {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
   }

  ngOnInit() {

    // if (localStorage.getItem('token')) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  iniciar_sesion() {
    this.apiService.iniciar_sesion(this.loginform.value)
    .subscribe(respuesta => {
      localStorage.setItem('access_token', JSON.stringify(respuesta));
      this.router.navigate(['/dashboard']);
    }, error => {
      alert(JSON.stringify(error['error']['error']));
    });
  }

}
