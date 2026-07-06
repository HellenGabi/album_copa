import { auth } from "./firebase.js";
import { state } from "./state.js";

function init() {
    console.log("Álbum Copa iniciado");

    if (!auth) {
        console.log("Modo local");
    } else {
        console.log("Modo Firebase");
    }
}

document.addEventListener("DOMContentLoaded", init);