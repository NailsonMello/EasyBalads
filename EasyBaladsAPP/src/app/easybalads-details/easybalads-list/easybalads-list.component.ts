import { Component, OnInit, TemplateRef  } from '@angular/core';
import { EasybaladsDetailService } from 'src/app/shared/easybalads-detail.service';
import { EasybaladsDetail } from 'src/app/shared/easybalads-detail.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EasybaladsDetailComponent } from '../easybalads-detail/easybalads-detail.component';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { isNumber } from 'util';

@Component({
  selector: 'app-easybalads-list',
  templateUrl: './easybalads-list.component.html',
  styles: []
})
export class EasybaladsListComponent implements OnInit {

  lat;
  lng;
  zoom: number = 15;

  dados: EasybaladsDetail = new EasybaladsDetail();

  registerForm: FormGroup;
  bodyDeletarEvento = '';
  modalRef: BsModalRef;
  constructor(private service: EasybaladsDetailService, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.service.getEventos();
   
  }

  deleteEvento(Id){
    if(confirm('Tem certeza que deseja excluir o evento?'))
    {
    this.service.deleteEasyBaladsDetalhes(Id)
    .subscribe( res => {
      this.toastr.warning('Excluido com sucesso!!!', 'O evento foi excluido!');
      this.service.getEventos();
    },
    err => {
      this.toastr.error('OPS', err);
      console.log(err);
    })
   }
  }

  editarEvento(evento: EasybaladsDetail, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.service.formData = Object.assign({}, evento);
    this.service.putEasyBaladsDetalhes()
    .subscribe();
    
  }
  
  onSubmit(form: NgForm){
    if (this.service.formData.Id != 0) 
       console.log(form.value);
    this.service.putEasyBaladsDetalhes().subscribe(
          res => {
            this.modalRef.hide();
            this.toastr.info('Editado com sucesso!!!', 'O evento foi editado!');
            this.service.getEventos();
          },
          err => {
            this.toastr.error('OPS', err);
            console.log(err);
          }
        )
    
  }
  openModal(Id, tem: TemplateRef<any>) {
   this.modalRef = this.modalService.show(tem);
  
   this.service.getEvento(Id)
   .toPromise()
   .then(res => {
     this.dados = res as EasybaladsDetail
     this.lat = parseFloat(this.dados.lat);
     this.lng = parseFloat(this.dados.lng);
     console.log(parseFloat(this.dados.lng));
   });
   console.log(this.service.eve.lat);
  }
 
}

