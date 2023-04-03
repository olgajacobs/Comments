import {comments, loader, listElement, textInputElement, textareaInputElement, mainForm,} from "./script.js"
import { getDate } from "./dataFunctions.js";

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
            postComment();
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