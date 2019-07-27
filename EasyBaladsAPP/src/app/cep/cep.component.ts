import { Component, OnInit } from '@angular/core';
import { CepService } from '../shared/cep.service';
import { Cep } from '../shared/cep';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EasybaladsDetailService } from '../shared/easybalads-detail.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent implements OnInit {

  imageUrl: string = "/assets/img/easybalads.png";
  fileToUpload: File = null;
  formEvento: NgForm;
  cep: Cep = new Cep();
  dados: any;
  modalRefer: BsModalRef;
  mmodalRefer: BsModalRef;

  selectedFile: File = null;
 
  dataAtual: string;
  constructor(private cepService: CepService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private eventoService: EasybaladsDetailService,
              private http: HttpClient) { }

  ngOnInit() {
    this.eventoService.getEventos();
  }

 
  buscarCep(template: any){
    let ce = this.cep.cep;
    this.cepService.buscar(this.cep.cep)
    .then((cep: Cep) => {this.cep = cep;
                         if(this.cep.cep == null)
                         {
                          this.toastr.error('não encontrado...', `Cep: ${ce}`);
                          console.log(this.cep.cep + ' Invalido');
                         }else
                         {
                          this.modalRefer = this.modalService.show(template);
                         }
    })
    .catch(() =>{
      let cep = this.cep.cep;
      this.cep = new Cep();
      this.cep.cep = cep;
      this.toastr.error('não encontrado...', `cep ${this.cep.cep}`);
    });
  }

  onFileChange(event){
   console.log(event.target.files[0].name);
   this.selectedFile =<File> event.target.files[0];
   this.cep.ImagemURL = event.target.files[0].name;
  }

  uploadImagem() {
    const formData = new FormData();
    formData.append('ImagemURL', this.selectedFile, this.selectedFile.name);
    this.cep.ImagemURL = this.selectedFile.name;
    return this.http.post('http://localhost:5000/api/easybalads/upload', formData)
    .subscribe(res => {console.log('ok! ');
    });
  }

  salvar(){
    console.log(this.cep);
    this.uploadImagem();
    this.cepService.cadastrarEvento(this.cep).subscribe(dado => {
      this.cep = new Cep();
      this.toastr.success('o evento foi cadastrado...', 'Sucesso!!!');
      this.eventoService.getEventos();
    }, err =>{
      this.toastr.error('Evento não foi cadastrado...', 'Erro!!!');
    });
    this.modalRefer.hide();
  }

  openModal(template: any) {
    this.modalRefer = this.modalService.show(template);
  }

  
}
