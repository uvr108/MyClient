import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { CAMPOS } from '../../campos';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  IssuesList: any = [];

  table: string;
  campos: {};

  ngOnInit() {
    this.route
      .data
      // tslint:disable-next-line: no-string-literal
      .subscribe(v => this.table = v['table']);

    this.campos = CAMPOS;

    this.loadIssues();
  }

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute
  ) { }

   // Issues list
   loadIssues() {
    return this.crudService.GetIssues(this.table).subscribe((data: {}) => {
      this.IssuesList = data;
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
