document.addEventListener("DOMContentLoaded", () => {
    cargarApp();
});

function cargarApp() {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

function cargarCabecero() {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalIngresos() === 0 ? 0 : (totalEgresos() / totalIngresos());

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = totalIngresos() === 0 ? "0%" : formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
};

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", { style: "percent", maximumFractionDigits: 2 });
};

const ingresos = [];

const egresos = [];

const totalIngresos = () => ingresos.reduce((total, ingreso) => total + ingreso.valor, 0);
const totalEgresos = () => egresos.reduce((total, egreso) => total + egreso.valor, 0);

function cargarIngresos() {
    let ingresosHTML = "";
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

function crearIngresoHTML(ingreso) {
    return `
        <div class="elemento">
            <span class="elemento-descripcion">${ingreso.descripcion}</span>
            <span class="elemento-valor">${formatoMoneda(ingreso.valor)}</span>
            <button class="elemento-eliminar" onclick="eliminarIngreso(${ingreso.id})">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    `;
}
const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    if (indiceEliminar !== -1) {
        ingresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarIngresos();
    }
};

function cargarEgresos() {
    let egresosHTML = "";
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

function crearEgresoHTML(egreso) {
    return `
        <div class="elemento">
            <span class="elemento-descripcion">${egreso.descripcion}</span>
            <span class="elemento-valor">${formatoMoneda(egreso.valor)}</span>
            <button class="elemento-eliminar" onclick="eliminarEgreso(${egreso.id})">
                <ion-icon name="close-circle-outline"></ion-icon>
            </button>
        </div>
    `;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    if (indiceEliminar !== -1) {
        egresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarEgresos();
    }
};

const agregarDato = () => {
    const forma = document.getElementById("forma");
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const valor = parseFloat(document.getElementById("valor").value);
    
    if (descripcion !== "" && !isNaN(valor) && valor > 0) {
        if (tipo === "ingreso") {
            ingresos.push({ id: ingresos.length + 1, descripcion, valor });
            cargarCabecero();
            cargarIngresos();
        } else {
            egresos.push({ id: egresos.length + 1, descripcion, valor });
            cargarCabecero();
            cargarEgresos();
        }
        forma.reset();
    }
};

window.agregarDato = agregarDato;
window.eliminarIngreso = eliminarIngreso;
window.eliminarIngreso = eliminarEngreso;
