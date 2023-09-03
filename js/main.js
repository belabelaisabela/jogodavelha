window.onload = () => {
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};


const jogador = document.querySelector(".jogador");

let selected;
let jog = "X";
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
function init() {
    selected = [];
    jogador.innerHTML = `Jogador: ${jog}`;
    document.querySelectorAll(".jogo button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = jog;
    e.target.removeEventListener("click", newMove);
    selected[index] = jog;

    setTimeout (() => {
        check();
    }, [100]);

    jog = jog === "X" ? "O" : "X";
    jogador.innerHTML = `Vez do jogador: ${jog}`;
}
function check() {
    let jogUltimoMov = jog === "X" ? "O" : "X"
    const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === jogUltimoMov)
    .map((item) => item[1]);
    for (posicao of positions) {
        if (posicao.every((item) => items.includes(item))) {
            alert("Jogador -" + jogUltimoMov + "- foi o ganhador da rodada!");
            init();
            return;
        }
    }
}