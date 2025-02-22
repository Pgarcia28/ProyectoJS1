import { Dato } from "./Dato.js"; // Asegúrate de que Dato.js existe y tiene un export correcto


export class Ingreso extends Dato {
   static contadorIngresos = 0;
   constructor(descripcion, valor) {
       super(descripcion, valor);
       this._id = ++Ingreso.contadorIngresos;
   }

   
   get id() {
       return this._id;
   }
}