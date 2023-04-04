import {comments, listElement, textInputElement, textareaInputElement, buttonComment} from "./script.js"
import { getDate } from "./dataFunctions.js";


// функция проверки что все поля заполнены
export const isValidForm = () => {
    if (textInputElement.value === "" || textareaInputElement.value === "") {
        buttonComment.disabled = true;
        return false;
      } else {
        buttonComment.disabled = false;
        return true;
      }
    };



// функция добавления лайка
export const initAddLike = () => {
  
    const addLikeButtons = document.querySelectorAll(".like-button");

    for (let addLikeButton of addLikeButtons) {

      const index = addLikeButton.dataset.index;

      addLikeButton.addEventListener("click", (event)=> {

        event.stopPropagation();

        if (comments[index].isLiked === false) {
          comments[index].isLiked = true;
          comments[index].likes +=1;
        }
        else if (comments[index].isLiked === true) {
          comments[index].isLiked = false;
          comments[index].likes -=1;
        }

        renderComments ();
      })
    }
  }


// функция ответа на комментарий

export const answer =() => {

  const answerCommentElements = document.querySelectorAll(".answer-button");

  for (let answerComment of answerCommentElements) {
    
    answerComment.addEventListener("click", ()=> {

      const index = answerComment.dataset.index;
      textareaInputElement.textContent = `QUOTE_BEGINS ${comments[index].author.name} : \n ${comments[index].text} QUOTE_ENDS`;
    
    })
  }
}

// функция рендер комментариев

export const renderComments = () => {

    const listElementHtml = comments
    .map((comment, index) => {

      return  `<li class="comment answer-button" data-index="${index}">
      <div class="comment-header">
        <div> ${comment.author.name} </div>
        <div>${getDate(comment.date)}</div>
      </div>
      <div class="comment-body">
      
        <div class="comment-text"> 
          ${comment.text} 
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="${comment.isLiked ? "like-button -active-like " : "like-button "}" id ="like-input"></button>
        </div>
      </div>
    </li>`
    })
    .join("") ;

  listElement.innerHTML = listElementHtml;
  textInputElement.classList.remove("error");
  textareaInputElement.classList.remove("error");
  

  initAddLike();
  answer();
}