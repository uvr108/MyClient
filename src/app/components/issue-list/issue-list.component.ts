import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { CAMPOS } from '../../campos';
import { FormBuilder, Validators } from '@angular/forms';

// vscode://github.vscode-pull-request-github/did-authenticate?
// windowId=1&code=b653a26be7b08d688288&state=a68afe53-d54b-46a5-8668-3c9b9bf6908e

export interface Presupuesto {
  name: string;
}

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  providers: [CrudService],
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit, AfterViewInit {

padre: any = [];
hijo: any = [];

table: string;
campos: {};

nuevo = false;

editPresupuesto = true;
presupuestos: Presupuesto[];

listForm = this.fb.group({
  id: [''],
  name: ['', Validators.required]
});

enviar(msg: object) {
  if (!this.nuevo) { this.marcar_nuevo(); }
  this.updatePresupuesto(msg);
  this.editPresupuesto = true;
  // console.log(`mostra en padre [hijo]: ${JSON.stringify(msg)} | ${this.nuevo}`);
}

cerrar() { this.nuevo = false; }

public marcar_nuevo() {
  this.updatePresupuesto({'nombre': ''});
  this.nuevo = this.nuevo === true ? false : true;
  this.editPresupuesto = false;
}

updatePresupuesto(msg: object) {
  // console.log(`msg : ${JSON.stringify(msg['name'])}`);
  this.listForm.patchValue({
    id : msg['id'],
    name: msg['name']
  });
}

ngOnInit() {
  this.route
    .data
    // tslint:disable-next-line: no-string-literal
    .subscribe(v => this.table = v['table']);
  this.campos = CAMPOS;
  this.load();
}

// agregar

onSubmit() {
  let presu: Presupuesto = this.listForm.value;
  const add = this.crudService
    .adds(presu)
    .subscribe(() => this.load());
}
// editar

editar() {
  const list = this.listForm.value;
  const id = list['id'];
  const presu = {name : list['name']};
  // console.log(`Editar : ${id} | ${JSON.stringify(presu)}`);
  this.crudService.
    Update(id, presu).
    subscribe(() => this.load());
}

// Listar

load(): void {
  this.crudService.getList().subscribe(data => {
  this.padre = data;
  });
}

// borrar

borrar() {
  const list = this.listForm.value;
  const id = list['id'];
  console.log(`Borrar : ${JSON.stringify(this.listForm.value)}`);
  this.crudService.Delete(id).subscribe(() => this.load());
  this.cerrar();
}

ngAfterViewInit() {
}

constructor(
  private crudService: CrudService,
  private route: ActivatedRoute,
  private fb: FormBuilder
) { }


  // Delete issue

deleteIusse(data) {
/*
    const index: any = this.IssuesList.map(x: User => { return x.name}).indexOf(data.username);
    return this.crudService.DeleteIssue(data.id).subscribe(res => {
    this.IssuesList.splice(index, 1);
      console.log('Issue deleted!');
    });
*/
  }
}
