import { Backend } from "./backend.js";

const API = new Backend();
API.setBaseUrl("https://api.github.com");
const list = document.querySelector("#list");
let html = "";
const searchfield = document.querySelector("#search");

window.addEventListener("DOMContentLoaded", () => {
  API.get("/emojis")
    .then((data) => {
      console.log(data);
      for (let key in data) {
        html += `<li><img alt="emoji" src="${data[key]}"><p class="emoji">:${key}:</p></li>`;
        new Image().src = data[key];
      }

      //   print emojis
      list.insertAdjacentHTML("beforeend", html);

      //   search functionality
      searchfield.addEventListener("keyup", (e) => {
        html = "";
        list.innerHTML = "";
        for (let key in data) {
          if (key.includes(e.target.value)) {
            html += `<li><img alt="emoji" src="${data[key]}"><p class="emoji">:${key}:</p></li>`;
          }
        }
        list.insertAdjacentHTML("beforeend", html);
        document.querySelectorAll(".emoji").forEach((text) => {
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
      });

      // copy to clipboard
      document.querySelectorAll(".emoji").forEach((text) => {
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
