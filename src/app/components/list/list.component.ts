import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute } from '@angular/router';
import { NAVEGA } from '../../tabla';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [CrudService],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

padre: any = [];
hijo: any = [];

table: string;
Tabla: Array<string>;
navega: Array<Array<string>> = NAVEGA;
index:number;
nuevo = false;
editTabla = true;

/*
lgroup = {
  name: ['', Validators.required]
};

listForm: FormGroup = this.fb.group(this.lgroup);
*/

listForm: FormGroup;

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
  } else {
      this.listForm.patchValue({id : msg['id'], name: msg['name']});
  }
}

carga_index() : number {

    let index: number;
    let lgroup: object;

    if (this.table === "presupuestos") { 
      index = 0;
      lgroup = { 
        name: ['', Validators.required] 
      } 
    }
    else if (this.table === "items") { 
      index = 1;
      lgroup = { 
        name: ['', Validators.required] 
      }  
    }
    else if (this.table === "subitems") { 
      index = 2;
      lgroup = {
          name: ['', Validators.required],
          monto: ['', Validators.required]
      }
    }

    this.Tabla = this.navega[index];

    this.listForm = this.fb.group(lgroup);
    return index;
    
}

cargar_form() {

  let lgroup: object;
  lgroup = { name: ['', Validators.required] };
  
  
}

ngOnInit() {
  this.route
    .data
    .subscribe(v => this.table = v['table']);
  
  this.index = this.carga_index();  
  // console.log(`index : ${this.index}`);
  // console.log(`table : ${this.table}`);
  // console.log(`Tabla : ${JSON.stringify(this.Tabla)}`);
  this.load();
  // console.log(`padrexx : ${JSON.stringify(this.padre)}`);
}

load(): void {

  // console.log(`table: Tabla -> ${this.table}, ${JSON.stringify(this.Tabla)}`);
  this.crudService.getList(this.table).subscribe(data => {
  this.padre = data;});

}

// agregar

  onSubmit() {
  const tab: {} = this.listForm.value;
  // console.log(`tab: ${JSON.stringify(tab)}`);
  
  this.crudService
    .adds(tab, this.table)
    .subscribe(() => { this.load(); this.updateTabla(); } );
    
}
// editar

  editar() {
  const list = this.listForm.value;
  const id = list['id'];
  const tab = {name : list['name'], monto: list['monto']};
  // console.log(`Editar : ${id} | ${JSON.stringify(presu)}`);
  this.crudService.
    Update(id, tab, this.table).
    subscribe(() => this.load());
}


// borrar

  borrar() {
      const list = this.listForm.value;
      const id = list['id'];
      // console.log(`Borrar : ${JSON.stringify(this.listForm.value)}`);
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

 
}
