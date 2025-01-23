const canvas = document.getElementById("mycanvas");
const pizarra = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const size = 10;
let rgb = [0,0,0]




function grid(m, n) {
    let mapa = [];
    for (let i = 0; i < n; i++) { 
        let fila = Array(m).fill(0);
        mapa.push(fila);
    }
    return mapa;
}

function crear_mapa(width, height) {
    const m = Math.floor(width / size);
    const n = Math.floor(height / size);
    let mapa = grid(m, n);
    return mapa;
}

function mostrar_mapa(mapa) {
    for (let fila = 0; fila < mapa.length; fila++) { 
        for (let columna = 0; columna < mapa[0].length; columna++) { 
            let x = columna * size;
            let y = fila * size;
            if (mapa[fila][columna] === 1) {
                pizarra.fillStyle = "black"; 
                pizarra.fillRect(x, y, size, size);
            }
        }
    }
}

function actualizar(mapa) {
    let nuevoMapa = grid(mapa[0].length, mapa.length);

    for (let fila = mapa.length - 1; fila >= 0; fila--) { 
        for (let columna = 0; columna < mapa[0].length; columna++) {
            if (mapa[fila][columna] === 1) {
                if (fila + 1 < mapa.length && mapa[fila + 1][columna] === 0) { // si esta dentro del limite y abajo hay un 0, el pixel cae
                    nuevoMapa[fila + 1][columna] = 1; 

                } else if (fila + 1 < mapa.length && mapa[fila + 1][columna + 1] === 0){ //fisicas de la arena izquierda y derecha
                    nuevoMapa[fila+1][columna+1] = 1;
                } else if (fila + 1 < mapa.length && mapa[fila + 1][columna - 1] === 0){
                    nuevoMapa[fila-1][columna-1] = 1;
                } else {
                    nuevoMapa[fila][columna] = 1;                   // si no se queda ahi mismo
                }

            }
        }
    }

    return nuevoMapa;
}

function click(event) {
    let columna = Math.floor(event.offsetX / size);
    let fila = Math.floor(event.offsetY / size);
    if (event.buttons === 1){ // si el boton esta apretado dibuja, si no, no.
        if (fila >= 0 && fila < mapa.length && columna >= 0 && columna < mapa[0].length) {
            mapa[fila][columna] = 1;
            mapa[fila][columna+1] = 1;
            mapa[fila][columna-1] = 1; //pincel mas grande
            mapa[fila-1][columna] = 1;
            mapa[fila+1][columna] = 1;
    }
    }
}
canvas.addEventListener("mousemove", click);



let mapa = crear_mapa(width, height);


function animar() {
    pizarra.clearRect(0, 0, width, height); 
    mostrar_mapa(mapa); 
    mapa = actualizar(mapa);

    requestAnimationFrame(animar); 
}

animar();
