import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cep } from './cep';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  URL = 'http://localhost:5000/api';
 
constructor(private http: HttpClient) { }

buscar(cep: string){
  return this.http.get(this.URL + '/easybalads/cep/' + cep)
          .toPromise()
          .then(response => this.converterRespostaParaCep(response));
}

cadastrarEvento(dados: Cep): Observable<any>{
  return this.http.post(this.URL + '/easybalads', dados);
}

postUpload(file: File, name: string){
  const fileToUplaod = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileToUplaod, name);
  return this.http.post('http://localhost:5000/api/easybalads/upload', formData)
  .subscribe(res => {console.log('ok! ');});
}

private converterRespostaParaCep(cepResposta): Cep{
  let cep = new Cep();
  cep.cep = cepResposta.cep;
  cep.address = cepResposta.address;
  cep.address_name = cepResposta.address_name;
  cep.address_type = cepResposta.address_type;
  cep.city = cepResposta.city;
  cep.city_ibge = cepResposta.city_ibge;
  cep.lng = cepResposta.lng;
  cep.lat = cepResposta.lat;
  cep.ddd = cepResposta.ddd;
  cep.district = cepResposta.district;
  cep.state = cepResposta.state;
  return cep;
}
}
