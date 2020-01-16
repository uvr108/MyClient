import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';


const routes: Routes = [
  {path : 'presupuestos', component: ListComponent, data: {table: 'presupuestos'}},
  {path : 'items', component: ListComponent, data: {table: 'items'}},
  // {path : 'item/:id', component: TreeComponent},
  {path : 'subitems', component: ListComponent, data: {table: 'subitems'}},
  // {path : 'subitem/:id', component: IssueListComponent, data: {table: 'subitems'}},
  {path : 'tree', component: TreeComponent, data: {}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
