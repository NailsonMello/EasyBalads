import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { EasybaladsDetailsComponent } from './easybalads-details/easybalads-details.component';
import { EasybaladsListComponent } from './easybalads-details/easybalads-list/easybalads-list.component';
import { EasybaladsDetailComponent } from './easybalads-details/easybalads-detail/easybalads-detail.component';
import { EasybaladsDetailService } from './shared/easybalads-detail.service';
import { CepComponent } from './cep/cep.component';
import { CepService } from './shared/cep.service';

import { AgmCoreModule } from '@agm/core';


@NgModule({
   declarations: [
      AppComponent,
      EasybaladsDetailsComponent,
      EasybaladsListComponent,
      EasybaladsDetailComponent,
      CepComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      ModalModule.forRoot(),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCCXrsP1YrD9t7nqmSXUr4Rs6uBd607tA8'
       })
   ],
   providers: [
      EasybaladsDetailService,
      BsModalRef,
      CepService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      EasybaladsDetailComponent
   ]
})
export class AppModule { }
