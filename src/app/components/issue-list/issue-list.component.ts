import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { CAMPOS } from '../../campos';
import { FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// vscode://github.vscode-pull-request-github/did-authenticate?
// windowId=1&code=b653a26be7b08d688288&state=a68afe53-d54b-46a5-8668-3c9b9bf6908e

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit, AfterViewInit {

  padre: any = [];
  hijo: any = [];

  table: string;
  campos: {};

  nuevo = false;

  // @ViewChild('TreeComponent', {static: true}) tree: TreeComponent;

  listForm = this.fb.group({
    name: ['', Validators.required]
  });

  enviar(name) {
    if (!this.nuevo) { this.marcar_nuevo(); }
    this.updateTree({name});
    console.log(`mostra en padre [hijo]: ${name} | ${this.nuevo}`);
  }

  cerrar() { this.nuevo = false; }

  public marcar_nuevo() {
    this.updateTree({"nombre": ''});
    this.nuevo = this.nuevo === true ? false : true;
  }

  updateTree(h: any) {
    this.listForm.patchValue({
      name: h.name
    });
  }

  ngOnInit() {
    this.route
      .data
      // tslint:disable-next-line: no-string-literal
      .subscribe(v => this.table = v['table']);

    this.campos = CAMPOS;
    this.load('presupuestos');
  }

  onSubmit() { console.log(this.listForm.value); }

  ngAfterViewInit() {
    // console.log(this.tree.mostra);

  }

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

   // Issues list
   load(table: string) {
    return this.crudService.GetIssues(table).subscribe((data: Array<{}>) => {
      this.padre = data;
    });
   }

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
