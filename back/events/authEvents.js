import { login } from "../services/authService.js";

export function initAuth() {

  document
    .getElementById("auth-form")
    .addEventListener("submit", login);

}