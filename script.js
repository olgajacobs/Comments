
import {initAddLike, answer, renderComments, isValidForm } from "./actionFunctions.js";

export const buttonComment = document.getElementById("add-button");
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



export let comments = [];


// функция загрузки комментариев

export const fetchAndLogComments = () => {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
  method: "GET"
})
.then((response) => {
  if (response.status === 500) {
      throw new Error("Кажется сервер сломался")};
      return  response.json();
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

// функция публикации комментария

export const postComment =() => {
        
  fetch ("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
  method: "POST",
  body: JSON.stringify({
    date: new Date,
    likes: 0,
    isLiked: false,
    name: textInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
    text: textareaInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("QUOTE_BEGINS", "<div class='quote'>").replaceAll("QUOTE_ENDS", "</div>"),

  })
})
.then((response) => {
  if (response.status === 400){
    throw new Error("Имя или текст короче 3 символов");
  } 
  if (response.status === 500) {
    throw new Error("Кажется сервер сломался");
  }

  mainForm.style.display = "none";
  loader.style.display = "flex";
  return fetchAndLogComments();
  })
.then(() => {
  mainForm.style.display = "flex";
  loader.style.display = "none";
  textInputElement.value = "";
  textareaInputElement.value = "";
})
.catch((error) => {
  if (error.message === "Кажется сервер сломался") {
      mainForm.style.display = "flex";
      loader.style.display = "none";
    alert("Сервер упал");   
    return;
  }
  if (error.message === "Имя или текст короче 3 символов") {
      mainForm.style.display = "flex";
      loader.style.display = "none";
    alert("Имя или текст не могут быть короче 3 символов")  ;
    return  ; 
  }

  mainForm.style.display = "flex";
  loader.style.display = "none";
  alert("Интернет соединение прервано, попробуйте позже");
  return;
})

}



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


answer();
initAddLike();
renderComments();


console.log("It works!");