import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagamento } from '../../models/pagamento';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pagamento: Pagamento = new Pagamento();
  data_pagamento: Date;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  salvar():void{
    this.pagamento.data_pagamento = moment(this.data_pagamento.toString()).format("YYYY-MM-DD");
    this.http.post(environment.api+"/pagamentos", this.pagamento).subscribe(
      result => {
        this.toastr.success("PAGAMENTO SALVO!")
        this.router.navigate(['/'])
      }, erro => {
        this.toastr.error("ERRO: "+erro.error.message)
      }
    )
  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}
