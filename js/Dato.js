
export class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion;  // Asignamos directamente a this._descripcion
        this._valor = valor;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(value) {
        this._descripcion = value; // Corrección del setter
    }
    get valor() {
        return this._valor;
    }
    set valor(value) {
        this._valor = value;
    }
 }