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
// tablas: Array<string> = TABLAS;
index:number;
lgroup: object;
nuevo = false;
editTabla = true;
components: Array<Array<string|boolean>>;

listForm: FormGroup;

constructor( private crudService: CrudService, private route: ActivatedRoute, private fb: FormBuilder) { }

ngOnInit() {

    this.crudService.Mostra();
    this.route.data.subscribe(v => this.table = v['table']);
    this.carga_index();
    this.load();
 
}



carga_index() : void {

  

  if (this.table === "presupuestos") { 
    this.index = 0;
    this.lgroup = { 
      id: [''],
      name: ['', Validators.required]
    }
    this.components = [['hidden','id',''],['text','name','yes']]; 
  }
  else if (this.table === "items") { 
    this.index = 1;
    this.lgroup = { 
      id: [''],
      name: ['', Validators.required] 
    }
    this.components = [['hidden','id',''],['text','name','yes']]; 
  }
  else if (this.table === "subitems") { 
    this.index = 2;
    this.lgroup = {
        name: ['', Validators.required],
        monto: ['', Validators.required]
    }
    this.components = [['hidden','id',''],['text','name','yes'],['text','monto','yes']]; 
  }

  this.Tabla = this.navega[this.index];

  this.listForm = this.fb.group(this.lgroup);

  
}

load(): void {

  // console.log(`table: Tabla -> ${this.table}, ${JSON.stringify(this.Tabla)}`);
  this.crudService.getList(this.table)
  .subscribe(data => { this.padre = data; });

}

marcar_nuevo() {
  this.updateTabla();
  this.nuevo = this.nuevo === true ? false : true;
  this.editTabla = false;
}

updateTabla(msg: object = null) {

  let json = {};
  for ( let k in this.lgroup){
    let value = this.lgroup[k];
    json[k] = '';
  }
  
  if (msg === null) {
      this.listForm.patchValue(json);
  } else {
      console.log(`msg : ${JSON.stringify(msg)}`); 
      this.listForm.patchValue(msg);
  }
}


// agregar

  onSubmit() {
  
  this.crudService
    .adds(this.listForm.value, this.table)
    .subscribe(() => { this.load(); this.updateTabla(); } );
    
}
// editar

  editar() {
      const list = this.listForm.value;
      const id = list['id'];
  
      this.crudService.
      Update(id, this.listForm.value, this.table).
      subscribe(() => this.load());
}


// borrar

borrar() {
      const list = this.listForm.value;
      const id = list['id'];
      
      this.crudService.Delete(id, this.table).subscribe(() => this.load());

      this.cerrar();
}

  ngAfterViewInit() {
}

enviar(msg: object) {

  if (!this.nuevo) { this.marcar_nuevo(); }
  this.updateTabla(msg);
  this.editTabla = true;

}


cerrar() { this.nuevo = false; }


/*

cargar_form() {

  let lgroup: object;
  lgroup = { name: ['', Validators.required] };
  
  
}
*/
 
}
