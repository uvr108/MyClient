export const Presupuesto: Array<string> = ['id','name','monto'];
export const Item: Array<string> = ['name','presupuestoId','monto'];
export const Subitem: Array<string> = ['name','itemId','monto'];

export const NAVEGA: Array<Array<string>> = [Presupuesto, Item, Subitem];
export const TABLAS: Array<string> = ['presupuestos','items','subitems'];