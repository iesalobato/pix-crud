import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './views/cadastro/cadastro.component';
import { PagamentosComponent } from './views/pagamentos/pagamentos.component';


const routes: Routes = [
  {path:"", component:PagamentosComponent},
  {path:"new", component:CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
