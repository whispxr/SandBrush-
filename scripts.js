const canvas = document.getElementById("mycanvas");
const pizarra = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const size = 5;




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
            let celda = mapa[fila][columna]
            if (celda.vel >= 1) {
                pizarra.fillStyle = celda.color; 
                pizarra.fillRect(x, y, size, size);
            } else if (celda.vel < 0){
                pizarra.fillStyle = "black"
                pizarra.fillRect(x, y, size, size);

            }
        }
    }
}

function actualizar(mapa) {
    let nuevoMapa = grid(mapa[0].length, mapa.length);

    for (let fila = mapa.length - 1; fila >= 0; fila--) { 
        for (let columna = 0; columna < mapa[0].length; columna++) {
            let celda = mapa[fila][columna]
            if (celda !== 0) {
                if (fila + celda.vel < mapa.length && mapa[fila + celda.vel][columna] === 0) {  // si esta dentro del limite y abajo hay un 0, el pixel cae
                    nuevoMapa[fila + celda.vel][columna] = celda; 
                    nuevoMapa[fila + celda.vel][columna].vel++


// de aqui para abajo no tocar :p
            
                } else if (fila + celda.vel < mapa.length && mapa[fila + 1][columna + 1] === 0){ //fisicas de la arena izquierda y derecha
                    nuevoMapa[fila+1][columna+1] = celda;
                    nuevoMapa[fila+1][columna+1].vel = 1   
                    
                } else if (fila + celda.vel < mapa.length && mapa[fila + 1][columna - 1] === 0){
                    nuevoMapa[fila-1][columna-1] = celda;
                    nuevoMapa[fila-1][columna-1].vel = 1   

                } else {
                    nuevoMapa[fila][columna] = celda;
                    nuevoMapa[fila][columna].vel = 1                   // si no se queda ahi mismo
                }

            }
        }
    }

    return nuevoMapa;
}

function colores(iteracion) {
    // Ajustar factores para un degradado más uniforme
    const red = Math.floor((Math.sin(iteracion * 0.1) + 1) * 127.5);
    const green = Math.floor((Math.sin(iteracion * 0.1 + 2) + 1) * 127.5);
    const blue = Math.floor((Math.sin(iteracion * 0.1 + 4) + 1) * 127.5);
  
    return `rgb(${red}, ${green}, ${blue})`;
  }
  
  
function click(event) {
    let columna = Math.floor(event.offsetX / size);
    let fila = Math.floor(event.offsetY / size);

    if (event.buttons === 1) { // Clic izquierdo
        if (fila >= 2 && fila < mapa.length && columna >= 1 && columna < mapa[0].length - 1) {
            mapa[fila][columna] = { color: colores(iteracion), vel: 1 };
            mapa[fila][columna + 1] = { color: colores(iteracion), vel: 1 };
            mapa[fila][columna - 1] = { color: colores(iteracion), vel: 1 }; // Pincel más grande
            mapa[fila - 1][columna] = { color: colores(iteracion), vel: 1 };
            mapa[fila + 1][columna] = { color: colores(iteracion), vel: 1 };
        }
    } else if (event.button === 2) { // Clic derecho
        if (fila >= 0 && fila < mapa.length && columna >= 0 && columna < mapa[0].length) {
            mapa[fila][columna] = {color: "black", vel: -2}; // Insertar el carácter '#' en la posición del clic derecho
        }
    }
}

canvas.addEventListener("mousemove", click);
canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});


let iteracion = 1;
let mapa = crear_mapa(width, height);


function animar() {
    pizarra.clearRect(0, 0, width, height); 
    mostrar_mapa(mapa); 
    mapa = actualizar(mapa);
    iteracion += 0.1 // con este valor se controla que tan brusco es el cambio de color

    requestAnimationFrame(animar); 
}

animar();
