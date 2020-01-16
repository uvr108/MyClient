export const Presupuesto: Array<string> = ['name','monto'];
export const Item: Array<string> = ['name','presupuestoId','monto'];
export const Subitem: Array<string> = ['name','itemId','monto'];

export const NAVEGA: Array<Array<string>> = [Presupuesto, Item, Subitem];