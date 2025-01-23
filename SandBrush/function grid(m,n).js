function grid(m,n)
{
    let mapa = [];
    for (let i = 0; i <= m; i++) {
        let fila = Array(n).fill(0)
        mapa.push(fila)
        }
    return mapa
}





let mapa = grid(5,5);
console.log(mapa)
