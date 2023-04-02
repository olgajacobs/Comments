
import { postComment, initAddLike, answer, renderComments } from "./actionFunctions.js";

const buttonComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
export const listElement = document.getElementById("comments");
export const textInputElement = document.getElementById("name-input");
export const textareaInputElement = document.getElementById("comment-input");
export const mainForm = document.querySelector(".add-form");


// статус загрузки комментариев
export const loader = document.querySelector('.adding');
const loadingPage = document.querySelector(".loading_comments")

loader.style.display = "none";
loadingPage.style.display = "flex"

// функция проверки что все поля заполнены
const isValidForm = () => {
    if (textInputElement.value === "" || textareaInputElement.value === "") {
        buttonComment.disabled = true;
        return false;
      } else {
        buttonComment.disabled = false;
        return true;
      }
    };

export let comments = [];


// функция загрузки комментариев

const fetchAndLogComments = () => {
  return fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
  method: "GET"
})
.then((response) => {
  if (response.status === 500) {
      throw new Error("Кажется сервер сломался")};
      return  response.json()
})
.then((responseData) => {
  comments = responseData.comments;
  loadingPage.style.display = "none";
  renderComments();
  })
.catch((error) => {
    if (error.message === "Кажется сервер сломался") {
      alert("Сервер упал")
      return;
    }
})
};

fetchAndLogComments();



// отправка комментарий нажатием Enter

mainForm.addEventListener("keyup", (action) => {

  if (action.code === "Enter" && isValidForm()) {
    postComment();
 
}})

 // обработчик клика при нажатии на кнопку "написать"

buttonComment.addEventListener("click", () => {

  if (textInputElement.value === '' || textareaInputElement.value === '') {
    if (textInputElement.value === '') 
    textInputElement.classList.add('error');
    if (textareaInputElement.value === '')
      textareaInputElement.classList.add('error');
    return;
}
 postComment()

 textInputElement.classList.remove('error');
 textareaInputElement.classList.remove('error');

 renderComments();
}) 

// обработчик клика при нажатии на кнопку "удалить последний комментарий"

removeComment.addEventListener("click", () => {
    listElement.removeChild(listElement.lastElementChild);
});


postComment();
answer();
initAddLike();
renderComments();


console.log("It works!");