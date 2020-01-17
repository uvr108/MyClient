import {Component,  Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { NAVEGA, TABLAS } from '../../tabla';

export interface Hijo {
  name: string;
  // monto: number;
}

@Component({
  selector: 'app-tree',
  template: `

  <ng-template #mostraTemplate let-peopleCounter="numberOfPeople">
      
      <!--div> Hay {{ peopleCounter }} personas </div-->
      
      <!--p>{{ref}}</p>
      <p>{{name}}</p>
      <p>{{padre | json}}</p>
      <p>[{{campos[index]}}]</p-->

      <button class="btn btn-link" (click)="marcar_mostra()">[*]</button>
      <button class="btn btn-link" (click)="mensage(name, ref)">{{out | json}}</button>
      <div *ngIf="mostra" style="padding-left: 25px;">
          <h4>{{tablas[index+1]}}</h4>
          <table>
          <tr><td>
          <button class="btn btn-link btn-sm" (click)="marcar_nuevo()">(+)</button>
          </td><td>{{campos[index+1] | json}}</td></tr>
          <tr *ngFor="let h of hijo; index as Id">
              <td>
              <div>
              <a [routerLink]="['/**/']" >[*]</a>
              </div>
              </td>
              <td>
              <button type="button" class="btn btn-link btn-sm"
              (click)="modifica(h, h.id)"> {{detalle[Id] | json}}
              </button>
              </td>
          </tr>
          </table>
      </div>

      <div *ngIf="nuevo" style="padding-left: 20px; padding-right: 20px; ">
      <br>
      <form [formGroup]="listForm" (ngSubmit)="onSubmit()">
        <p>

          <span *ngFor="let c of components">
              
                  <div *ngIf="!c[2]; else required">
                      <input type="{{c[0]}}" formControlName="{{c[1]}}">&nbsp;
                  </div>

                  <ng-template #required>
                      <input type="{{c[0]}}" formControlName="{{c[1]}}" required>&nbsp;
                  </ng-template>
                         
              
              
          </span>

        

          <button *ngIf="!editTable" class="btn btn-info btn-sm" type="submit"
          [disabled]="!listForm.valid">Agregar</button>

          <button *ngIf="editTable" class="btn btn-info btn-sm" type="button"
          [disabled]="!listForm.valid" (click)="Update()">Modificar</button>&nbsp;

          <button *ngIf="editTable" class="btn btn-info btn-sm" type="button"
          [disabled]="!listForm.valid" (click)="Borrar()">Borrar</button>&nbsp;

          <button class="btn btn-info btn-sm" type="button"
         (click)="cerrar()">Cerrar</button>

        </p>
      </form>
      </div>

       
  </ng-template>

  <ng-container *ngTemplateOutlet="mostraTemplate;context:ctx"></ng-container>
  `
})
export class TreeComponent implements OnInit {

  @Input() ref: number;
  @Input() name: string;
  @Input() padre: {};
  @Input() index: number;
  @Input() listForm: FormGroup;
  @Input() components: Array<Array<string|boolean>>;
  @Output() enviar = new EventEmitter<object>();

  totalPeople = 4;
  ctx = {numberOfPeople: this.totalPeople};

  hijo: Array<any>;
  // table = 'items';
  id = 0;

  /*
  treeForm = this.fb.group({
    name: ['', Validators.required]
  });
  */

  mostra = false; // muestra listado hijo
  nuevo = false;  // muestra treeForm
  editTable = false; // habilita/desabilita boton editar / agregar
  detalle: Array<any>;

  campos = NAVEGA;
  tablas = TABLAS;
  // presupuestoId = 0;

  
  load(id: number) {
    let out = [];
    // console.log(this.tablas[this.index], this.tablas[this.index+1]);
    return this.crudService.GetIssue(this.tablas[this.index], this.tablas[this.index+1], id).subscribe((data: Array<{}>) => {
      this.hijo = data;

      if (Object(this.hijo).length > 0) {
        let out2=[];
        this.hijo.forEach((a) => 
        {
          
          this.campos[this.index+1].forEach((b: any) => out2.push(a[b])), out.push(out2), out2=[]
        }), this.detalle = out, console.log(`out : ${JSON.stringify(out)}`);
      }
    });

  }

  mensage(name: string, id: number) {
    this.enviar.emit({name, id});
  }

  public marcar_mostra() {
    this.mostra = this.mostra === true ? false : true;
  }

  marcar_nuevo() {
    this.nuevo = this.nuevo === true ? false : true;
    this.editTable = false;
    this.updateTree();
  }

  modifica(h: Hijo, id: number) {
    // console.log(h);
    this.editTable = true;
    this.nuevo = this.nuevo === true ? false : true;
    this.updateTree(h);
    this.id = id;

  }

  updateTree(h: Hijo = null) {
    if (h === null) {
        this.listForm.patchValue({name: ''});
    } else {
        this.listForm.patchValue({
        name: h.name,
        // monto: h.monto
        });
    }
  }


  Update() {
    console.log(`Form : ${JSON.stringify(this.listForm.value)} | ${this.id} | ${this.index+1}`);
    this.crudService.Update(this.id, this.listForm.value, this.tablas[this.index+1]).subscribe(() => this.load(this.ref));
  }

  Borrar() {
      // console.log(this.id, this.table);
      this.crudService.Delete(this.id, this.tablas[this.index+1]).subscribe(() => this.load(this.ref));
      this.nuevo = false;
  }

  cerrar() { this.nuevo = false; }

  constructor(private crudService: CrudService, private fb: FormBuilder) { }

  onSubmit() {

    this.editTable = false;
    // console.log(`treeForm : ${JSON.stringify(this.treeForm.value)}`);
    
    this.crudService.adds_hijo(this.tablas[this.index], this.tablas[this.index+1], this.ref , this.listForm.value).
    subscribe(() => this.load(this.ref));
    this.updateTree({name: ''});
    
  }

  out = [];

  ngOnInit() {
    // console.log(`campos : ${JSON.stringify(this.campos[this.index])} | ${this.index}`);
    this.campos[this.index].forEach((a) => this.out.push(this.padre[a]));
    this.load(this.ref);
    
    console.log(`index: ${this.index}`);
  }

}
