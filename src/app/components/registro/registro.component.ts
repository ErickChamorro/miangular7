import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroform: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router, public http: HttpClient, public apiService: ApiService) {
  }

  ngOnInit() {
    this.registroform = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required, Validators.minLength(6)]
    });
  }

  // esto es para que no tengas que escribir en el HTML: "registroform.controls.............."
  // ANTES: registroformcontrols['txt'].value
  // AHORA: f['txt'].value
  get f() {
    return this.registroform.controls;
  }

  registrar() {
    const array_registro = {
      email: this.registroform.get('email').value,
      password: this.registroform.get('password').value
    };

    this.apiService.registrar_usuario(array_registro)
    .subscribe(data => {
      const token = data['token'];
      alert('registro existoso, token: ' + JSON.stringify(token));
      console.log('registro existoso, token: ' + JSON.stringify(token));
    }, error => {
      alert(error['error']['error']);
      console.log(error['error']['error']);
    });
  }

}
