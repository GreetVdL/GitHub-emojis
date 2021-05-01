import { Backend } from "./backend.js";

const API = new Backend();
API.setBaseUrl("https://api.github.com");
const list = document.querySelector("#list");
let html = "";

window.addEventListener("DOMContentLoaded", () => {
  API.get("/emojis")
    .then((data) => {
      console.log(data);
      for (let key in data) {
        html += `<li><img alt="emoji" src="${data[key]}"><p>:${key}:</p></li>`;
      }
      for (let key in data) {
        new Image().src = data[key];
      }
      list.insertAdjacentHTML("beforeend", html);
    })
    .catch((err) => console.log(err));
});
