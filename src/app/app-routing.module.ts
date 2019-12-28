import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';

const routes: Routes = [
  {path : 'presupuestos', component: IssueListComponent, data: {table: 'presupuestos'}},
  {path : 'items', component: IssueListComponent, data: {table: 'items'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
