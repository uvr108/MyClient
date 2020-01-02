import {Component,  Input, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';


@Component({
  selector: 'app-tree',
  template: `

  <ng-template #mostraTemplate let-peopleCounter="numberOfPeople">
      <!--
      // <div> Hay {{ peopleCounter }} personas </div>
      -->
      <button class="btn btn-link" (click)="marcar()">[ * ]</button>
      <button class="btn btn-link" (click)="mensage(name)">[{{name}}]</button>
      | 2020-01-02T12:23:40
      <div *ngIf="mostra" style="padding-left: 25px;">
          <h4>Items |
          <button type="button" class="btn btn-link btn-sm"
          >[ ^ ]
          </button></h4>
          <p>item | monto</p>
          <div *ngFor="let h of hijo">
              <p>
              <a href="{{ h.id }}">[ * ]&nbsp;</a> |
              <button type="button" class="btn btn-link btn-sm"
              (click)="modifica(h)">{{h.name}}
              </button>
              | {{ h.monto }}
              </p>
          </div>

          <button class="btn btn-link btn-sm" (click)="marcar_nuevo()">[ + ]</button>

      </div>

      <div *ngIf="nuevo" style="padding-left: 20px; padding-right: 20px; ">
      <hr>

      <form [formGroup]="treeForm" (ngSubmit)="onSubmit()">
        <p>
          Item:
          <input type="text" formControlName="name" required>
          Monto:
          <input type="text" formControlName="monto">
          &nbsp;
          <button class="btn btn-info btn-sm" type="submit"
          [disabled]="!treeForm.valid">Submit</button>
        </p>
      </form>

      <!--hr>
      <p>Form Value: {{ treeForm.value | json }</p>
      <p>Form Status: {{ treeForm.status }}</p>
      <p><button (click)="updateTree()">Update</button></p-->
      </div>
  </ng-template>

  <ng-container *ngTemplateOutlet="mostraTemplate;context:ctx"></ng-container>
  `
})
export class TreeComponent implements OnInit {

  @Input() ref: number;
  @Input() name: string;

  totalPeople = 4;
  ctx = {numberOfPeople: this.totalPeople};

  hijo: Array<any>;

  treeForm = this.fb.group({
    name: ['', Validators.required],
    monto: ['']
  });


  mostra = false;
  nuevo = false;

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

  mensage(name) { console.log(name); }

  public marcar() {
    this.mostra = this.mostra === true ? false : true;
  }

  public marcar_nuevo() {
    this.nuevo = this.nuevo === true ? false : true;
  }

  public modifica(h: {}) {
    console.log(h);
    this.marcar_nuevo();
    this.updateTree(h);
  }

  updateTree(h: any) {
    this.treeForm.patchValue({
      name: h.name,
      monto: h.monto
    });
  }

  constructor(private crudService: CrudService, private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.treeForm.value);
  }

  ngOnInit() {
    this.load('item', this.ref);

  }

}
