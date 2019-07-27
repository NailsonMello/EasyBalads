import { EasybaladsDetailService } from 'src/app/shared/easybalads-detail.service';
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { EasybaladsDetail } from 'src/app/shared/easybalads-detail.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-easybalads-detail',
  templateUrl: './easybalads-detail.component.html',
  styles: []
})
export class EasybaladsDetailComponent implements OnInit {

 
  formEvento: FormGroup;
  formCep: FormGroup;
  formulario: FormGroup;
  modalRefer: BsModalRef;
  mmodalRefer: BsModalRef;
  temp: TemplateRef<any>;
  evento: any;
  dados: EasybaladsDetail;
  eventos: Array<any>;
  eves: any;

  constructor(private service: EasybaladsDetailService,  private formBuilder: FormBuilder, private toastr: ToastrService,
   private modalService: BsModalService, private http: HttpClient) { }

  
  ngOnInit() {
    this.evento = {};
    this.eves = {};

    this.formulario = this.formBuilder.group({
      Nome: [null],
      Descricao: [null],
      Local: [null],
      DataEvento: [null],
      QtdPessoas: [null],
      ImagemURL: [null],
      Telefone: [null],
      Email: [null],
      cep: [null],
      // tslint[null],-next-line: variable-name
      address_type: [null],
      // tslint[null],-next-line: variable-name
      address_name: [null],
      address: [null],
      district: [null],
      city: [null],
      state: [null],
      lat: [null],
      lng: [null],
      // tslint[null],-next-line: variable-name
      city_ibge: [null],
      ddd: [null]
    })
    
  }
  onSubmit(){
    console.log(this.formulario);
    this.http.post('http://localhost:54742/api/EasyBaladsDetalhes',
    JSON.stringify(this.formulario.value)) 
    .subscribe(res => console.log(res));
    
  }

  onSubmitCep(formCep: FormGroup){
    console.log(this.evento.cep);
    this.service.getCep(this.evento.cep).subscribe(respostaCep =>
    this.dados = respostaCep as EasybaladsDetail);
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRefer = this.modalService.show(template);
  }
  confirm(template: TemplateRef<any>) {
     this.modalRefer = this.modalService.show(template);
     this.modalRefer.hide();
     console.log(this.dados.address);
  }
}
