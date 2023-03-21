const addForm = document.querySelector('input');
const buttonComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const textInputElement = document.getElementById("name-input");
const textareaInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");


const comments = [
  {
    name: "Глеб Фокин",
   date: "12.02.22 12:18",
   text: "Это будет первый комментарий на этой странице",
   likes: 16,
   like: true,
  },

  {
    name: "Варвара Н.",
  date: "13.02.22 19:22",
  text: "Мне нравится как оформлена эта страница! ❤",
  likes: 5,
  like: true,
}

];


const enter = () => { 

     if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
      }

      else if (textareaInputElement.value === "") {
        textareaInputElement.classList.add("error");
        return;
      }

      const dateToday = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      };

      const today = new Date().toLocaleDateString('ru-RU', dateToday);
      
      comments.push({name: textInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
      date: today,
      text: textareaInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("QUOTE_BEGINS", "<div class='quote'>").replaceAll("QUOTE_ENDS", "</div>"),
      likes: 0,
      like: true}

    );   
  

    renderComments();
     

    buttonComment.disabled = true;
    textInputElement.value = "";
    textareaInputElement.value = "";
  }
  
  document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      enter();
  
    }
      });
  buttonComment.addEventListener("click", enter) 


  removeComment.addEventListener("click", () => {
         listElement.removeChild(listElement.lastElementChild);
     })

  const initAddLike = () => {

    
      
    const addLikeButtons = document.querySelectorAll(".like-button");

    for (let addLikeButton of addLikeButtons) {

      const index = addLikeButton.dataset.index;

      addLikeButton.addEventListener("click", (event)=> {

        event.stopPropagation();

        if (comments[index].like === true) {
          comments[index].like = false;
          comments[index].likes +=1;
        }
        else if (comments[index].like === false) {
          comments[index].like = true;
          comments[index].likes -=1;
        }

        renderComments ();
      })
  
    }
    
  }
const answer =() => {

  const answerCommentElements = document.querySelectorAll(".answer-button");

  for (let answerComment of answerCommentElements) {
    

    answerComment.addEventListener("click", ()=> {

      const index = answerComment.dataset.index;
   
      textareaInputElement.textContent = `QUOTE_BEGINS ${comments[index].name} : \n ${comments[index].text} QUOTE_ENDS`;
      
      renderComments();
      
    })
  
  }
}
    
  
  const renderComments = () => {

   
    const listElementHtml = comments
    .map((comment, index) => {

      return  `<li class="comment answer-button" data-index="${index}">
      <div class="comment-header">
        <div> ${comment.name} </div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
      
        <div class="comment-text"> 
          ${comment.text} 
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="${comment.like ? "like-button" : "like-button -active-like "}" id ="like-input"></button>
        </div>
      </div>
    </li>`;

   
    })
    .join("") 

  
  listElement.innerHTML = listElementHtml;
  textInputElement.classList.remove("error");
  textareaInputElement.classList.remove("error");

  initAddLike();
  answer();
 
  
};

renderComments ();

    // Код писать здесь
    console.log("It works!");