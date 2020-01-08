import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Tabla } from '../../tabla';
import { FormBuilder, Validators } from '@angular/forms';

// vscode://github.vscode-pull-request-github/did-authenticate?
// windowId=1&code=b653a26be7b08d688288&state=a68afe53-d54b-46a5-8668-3c9b9bf6908e

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

editTabla = true;
tabla: Tabla[];

lgroup = {
  id: [''],
  name: ['', Validators.required]
};

listForm = this.fb.group(this.lgroup);

enviar(msg: object) {
  if (!this.nuevo) { this.marcar_nuevo(); }
  this.updateTabla(msg);
  this.editTabla = true;
}

cerrar() { this.nuevo = false; }

marcar_nuevo() {
  this.updateTabla();
  this.nuevo = this.nuevo === true ? false : true;
  this.editTabla = false;
}

  updateTabla(msg: object = null) {
    if (msg === null) {
        this.listForm.patchValue({id : '', name: ''});
        console.log('Por aqui');
    } else {
        this.listForm.patchValue({id : msg['id'], name: msg['name']});
        console.log('Por aca');
    }
  }

  ngOnInit() {
  this.route
    .data
    // tslint:disable-next-line: no-string-literal
    .subscribe(v => this.table = v['table']);
  // this.campos = CAMPOS;
  this.load();
}

// agregar

  onSubmit() {
  const tab: Tabla = this.listForm.value;
  this.crudService
    .adds(tab, this.table)
    .subscribe(() => { this.load(); this.updateTabla(); } );
}
// editar

  editar() {
  const list = this.listForm.value;
  const id = list['id'];
  const tab = {name : list['name']};
  // console.log(`Editar : ${id} | ${JSON.stringify(presu)}`);
  this.crudService.
    Update(id, tab, this.table).
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
  this.crudService.Delete(id, this.table).subscribe(() => this.load());

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
