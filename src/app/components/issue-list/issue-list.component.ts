import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { CAMPOS } from '../../campos';
import { TreeComponent } from '../tree/tree.component';

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


  // @ViewChild('TreeComponent', {static: true}) tree: TreeComponent;

  ngOnInit() {
    this.route
      .data
      // tslint:disable-next-line: no-string-literal
      .subscribe(v => this.table = v['table']);

    this.campos = CAMPOS;

    this.load('presupuestos');

  }


  ngAfterViewInit() {
    // console.log(this.tree.mostra);

  }

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute
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
