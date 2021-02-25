import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Pagamento } from 'src/app/models/pagamento';
import { environment } from 'src/environments/environment';

export interface DialogData{
  id:number,
  pagamento:Pagamento
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  pagamento: Pagamento;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.pagamento = data.pagamento;
    this.id = data.id;
  }

  ngOnInit(): void {
  }

  salvar():void{
    this.http.put(environment.api+'/pagamentos/'+this.id, this.pagamento).subscribe(
      result => {
        this.toastr.success("PRODUTO ATUALIZADO!")
        this.dialogRef.close();
      }, erro => {
        this.toastr.error("ERRO: "+erro.error.message)
      }
    )
  }

}
