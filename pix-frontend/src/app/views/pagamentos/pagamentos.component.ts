import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { Pagamento } from '../../models/pagamento';
import { ConfirmComponent } from '../../componentes/modal/confirm/confirm.component';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {
  
  displayedColumns: string[] = ['destinatario', 'chave', 'banco', 'valor', 'porcentagem', 'data', 'cpf', 'descricao', 'actions'];
  dataSource = new MatTableDataSource<Pagamento>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getPagamentos();
  }

  getPagamentos():void{
    this.http.get(environment.api+"/pagamentos").subscribe(
      (result: any)=>{
        this.dataSource.data = result;
      }, erro => {
        
      }
    )
  }

  openEditModal(item: Pagamento, id:number):void{
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '500px',
      height: '500px',
      data: {id: id, pagamento: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPagamentos()
    });
  }

  openDeleteModal(id: number):void{
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      height: '250px',
      data: {title: 'Atenção!', message: 'Você confirma a exclusão deste pagamento?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.excluirPagamento(id);
      }
    });
  }

  excluirPagamento(id:number):void{
    this.http.delete(environment.api+'/pagamentos/'+id).subscribe(
      result => {
        this.toastr.success("PRODUTO EXCLUÍDO!")
        this.getPagamentos();
      }, erro => {
        this.toastr.error("ERRO: "+erro.message)
      }
    )
  }

  novoPagamento():void{
    this.router.navigate(['/new'])
  }

}
