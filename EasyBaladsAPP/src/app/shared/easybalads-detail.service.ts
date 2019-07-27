import { EasybaladsDetail } from './easybalads-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EasybaladsDetailService {

  formData: EasybaladsDetail;
  readonly URL = 'http://localhost:5000/api';
  list: EasybaladsDetail[];
  eve: EasybaladsDetail;

  constructor(private http: HttpClient) { }

  postEasyBaladsDetalhes(){
   return this.http.post(this.URL + '/easybalads', this.formData);
  }

  putEasyBaladsDetalhes()
  {
   return this.http.put(this.URL + '/easybalads/' + this.formData.Id, this.formData);
  }

  
  deleteEasyBaladsDetalhes(id)
  {
   return this.http.delete(this.URL + '/easybalads/' + id);
  }

  getEventos(){
    this.http.get(this.URL + '/easybalads')
    .toPromise()
    .then(res =>
      this.list = res as EasybaladsDetail[]
    );
  }

  getEvento(id){
    return this.http.get(this.URL + '/easybalads/' + id);
  }

  getCep(cep){
   
   return this.http.get(this.URL + '/easybalads/cep/' + cep)
  
  }

  criarEasyBalad(eves: any){
    return this.http.post(this.URL + '/easybalads', eves);
  }
}
