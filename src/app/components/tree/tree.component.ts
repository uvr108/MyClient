import {Component,  Input, OnInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';

@Component({
  selector: 'app-tree',
  template: `

  <ng-template #numberPeopleTemplate let-peopleCounter="numberOfPeople">
      <!--
      // <div> Hay {{ peopleCounter }} personas </div>
      -->
      <button class="btn btn-link" (click)="marcar()">[+]</button><a href="#">{{name}}</a>
      <div *ngIf="mostra" style="padding-left: 25px;">
          <h4>Items</h4>
          <p>item | monto</p>
          <div *ngFor="let h of hijo">
              <p><a href="{{ h.id }}">[+]&nbsp;</a> | <a href="#">{{ h.name }}</a> | {{ h.monto }} </p>
          </div>
      </div>
  </ng-template>

  <ng-container *ngTemplateOutlet="numberPeopleTemplate;context:ctx"></ng-container>
  `
})
export class TreeComponent implements OnInit {

  @Input() ref: number;
  @Input() name: string;

  totalPeople = 4;
  ctx = {numberOfPeople: this.totalPeople};
  hijo: Array<any>;

  mostra = false;
  presupuestoId = 0;

  load(table: string, id: number) {
    return this.crudService.GetIssue(table, id).subscribe((data: Array<{}>) => {
      this.hijo = data;
      if (Object(this.hijo).length > 0) {
          // console.log(this.hijo[0].presupuestoId);
          this.presupuestoId = this.hijo[0].presupuestoId;
      }
    });

  }

  public marcar() {
    this.mostra = this.mostra === true ? false : true;
  }


  constructor(public crudService: CrudService) { }

  ngOnInit() {
    this.load('item', this.ref);

  }

}
