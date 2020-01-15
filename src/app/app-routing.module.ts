import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { TreeComponent } from './components/tree/tree.component';


const routes: Routes = [
  {path : 'presupuestos', component: IssueListComponent, data: {table: 'presupuestos'}},
  {path : 'items', component: IssueListComponent, data: {table: 'items'}},
  {path : 'item/:id', component: TreeComponent},
  {path : 'subitems', component: IssueListComponent, data: {table: 'subitems'}},
  {path : 'subitem/:id', component: IssueListComponent, data: {table: 'subitems'}},
  {path : 'tree', component: TreeComponent, data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
