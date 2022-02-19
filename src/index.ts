import "./style.css";
import { UsersService } from "./scripts/User";

const usersService = new UsersService();
const btn = document.getElementById("btn");
const input = document.getElementById("userId");
const loading = document.getElementById("loading");
if (btn)
  btn.addEventListener("click", async () => {
    if (loading) {
      loading.innerHTML = "loading";
      await usersService
        .getUserById(+(input as HTMLInputElement).value)
        .then((x) => console.log(x));
      loading.innerHTML = "";
    }
  });
