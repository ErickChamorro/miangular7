import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  mostrar_lista() {
    const api_url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(api_url);
  }

  iniciar_sesion(values) {
    const api_url = 'https://reqres.in/api/login';
    return this.http.post(api_url, values);
  }

  registrar_usuario(values) {
    const api_url = 'https://reqres.in/api/register';
    return this.http.post(api_url, values);
  }
}
