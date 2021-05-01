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
        new Image().src = data[key];
      }

      list.insertAdjacentHTML("beforeend", html);

      document.querySelectorAll("p").forEach((text) => {
        text.addEventListener("click", function (e) {
          var range = document.createRange();
          range.selectNode(e.target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          document.execCommand("copy");
          window.getSelection().removeAllRanges();
          e.target.style.color = "#f90975";
          setTimeout(() => {
            e.target.style.color = "#00b5e2";
          }, 500);
        });
      });
    })
    .catch((err) => console.log(err));
});
