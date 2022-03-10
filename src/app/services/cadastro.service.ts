import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from '../models/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  toggleSidebarPin() {
    throw new Error('Method not implemented.');
  }
  toggleSidebar() {
    throw new Error('Method not implemented.');
  }

  readonly baseUrl='https://localhost:7052/api/ClassTainas';
  formData: Cadastro = new Cadastro();
  list: Cadastro [] = [];
  constructor(private http: HttpClient) { }


  getCadastro(){
    return this.http.get(this.baseUrl);
 }

 postCadastro(){
  return this.http.post(this.baseUrl, this.formData);
 }

 putCadastro(){
  return this.http.put(`${this.baseUrl}/${this.formData.id}`, this.formData);
 }

 deleteCadastro(id: number){
   return this.http.delete(`${this.baseUrl}/${id}`);
 }

 refresh(){
  this.http.get(this.baseUrl)
 .toPromise()
 .then( res => this.list = res as Cadastro[]);
}

}

