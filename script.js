const addForm = document.querySelector('input');
const buttonComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const textInputElement = document.getElementById("name-input");
const textareaInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");
const loadingPage = document.getElementById("loading_comments")

// статус загрузки комментариев

loadingPage.style.display = "flex";

// функция даты

function getDate(date) {
  const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
  }
  const newDate = new Date(date);
  return newDate.toLocaleString('ru-RU', options).replace(',', '');
}

let comments = [];


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

// функция публикации комментария

const postComment =() => {

  const formElement =  mainForm.innerHTML; 
      
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
        throw new Error("Кажется сервер сломался")
      }

      const formElement =  mainForm.innerHTML; 
      mainForm.innerHTML = `<div class="adding"> Комментарий отправляется..</div>`;
      return fetchAndLogComments();
      })
    .then(() => {
      mainForm.innerHTML = formElement;
    })
    .catch((error) => {
      if (error.message === "Кажется сервер сломался") {
        mainForm.innerHTML = formElement;
        alert("Сервер упал")   
      };
      if (error.message === "Имя или текст короче 3 символов") {
        mainForm.innerHTML = formElement;
        alert("Имя или текст не могут быть короче 3 символов")     
      }
    })
    .then(() => {
      textInputElement.value = "";
      textareaInputElement.value = "";
    })
    renderComments();

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

// функция добавления лайка

const initAddLike = () => {
  
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

const answer =() => {

  const answerCommentElements = document.querySelectorAll(".answer-button");

  for (let answerComment of answerCommentElements) {
    

    answerComment.addEventListener("click", ()=> {

      const index = answerComment.dataset.index;
   
      textareaInputElement.textContent = `QUOTE_BEGINS ${comments[index].author.name} : \n ${comments[index].text} QUOTE_ENDS`;
    
    })
  }
}


// функция рендер комментариев

  const renderComments = () => {

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


console.log("It works!");