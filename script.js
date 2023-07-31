import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://shopping-cart-9edb2-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

let global_id;
let global_item;

// Initialize app and connect it to the firebase database
const app = initializeApp(appSettings);
// Makes an instance of the firebase database
// with the reference to the initilized app
const database = getDatabase(app);
// Makes a reference value for database elements
const groceriesInDB = ref(database, "groceries");

const addBtn = document.getElementById("add-button");
const inputField = document.getElementById("input-field");

const groceriesList = document.getElementById("groceries-list");

const modalDiv = document.getElementById("modal");
const canBtn = document.getElementById("cancel");
const delBtn = document.getElementById("delete");

canBtn.addEventListener("click", () => {
  modalDiv.classList.add("hidden");
});

delBtn.addEventListener("click", () => {
  clearInputField();
  let itemLocation = ref(database, `groceries/${global_id}`);
  remove(itemLocation);
  modalDiv.classList.add("hidden");
});

addBtn.addEventListener("click", () => {
  const inputValue = inputField.value;

  clearInputField();
  addNewListElem(inputValue);

  push(groceriesInDB, inputValue);
  console.log(`${inputValue} added to the database`);
});

onValue(groceriesInDB, (snapshot) => {
  let arrayObj = Object.entries(snapshot.val());
  arrayObj.forEach(([id, item]) => {
    addNewListElem(id, item);
  });
});

function addNewListElem(id, item) {
  console.log("id", id);
  console.log("item", item);
  const listDiv = document.createElement("li");
  let itemValue = item;
  listDiv.classList.add("list-element");
  listDiv.id = "list-element";
  listDiv.innerText = itemValue;

  listDiv.addEventListener("click", () => {
    console.log(itemValue);
    global_id = id;
    global_item = itemValue;
    modalDiv.classList.remove("hidden");
  });

  if (item != undefined) {
    groceriesList.appendChild(listDiv);
  }
}
function clearInputField() {
  inputField.value = "";
  groceriesList.innerText = "";
}
