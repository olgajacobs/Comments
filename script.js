const addForm = document.querySelector('input');
const buttonComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const textInputElement = document.getElementById("name-input");
const textareaInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");


let comments = [];

const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
  method: "GET"
});

fetchPromise.then((response) => {

  const jsonPromise = response.json();

  jsonPromise.then((responseData) => {
    const relevantComments = responseData.comments.map((comment) => {

      const dateToday = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      };

      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString('ru-RU', dateToday),
        text: comment.text,
        likes: comment.likes,
        like: true,
      }
    });

    comments = relevantComments;
    renderComments();
  });
});


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

      fetch("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
        method: "POST",
        body: JSON.stringify({
          name: textInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
          text: textareaInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("QUOTE_BEGINS", "<div class='quote'>").replaceAll("QUOTE_ENDS", "</div>")
        })
      }).then((response) => {
        response.json().then((responseData) => {
          // получили данные и рендерим их в приложении
          tasks = responseData.todos;
          renderComments();
        });
      });
      
      //comments.push({name: textInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;"),
      //date: today,
     // text: textareaInputElement.value.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("QUOTE_BEGINS", "<div class='quote'>").replaceAll("QUOTE_ENDS", "</div>"),
    //  likes: 0,
     // like: true}

   // );   
  

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

   // const id = deleteButton.dataset.id;

    fetch("https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/comments", {
      method: "DELETE"
    }).then((response) => {
      response.json().then((responseData) => {
        const listElement = document.getElementById("comments");
        comments  = responseData.comments.removeChild(listElement.lastElementChild);
        renderComments();
      });
      
    });

    //     listElement.removeChild(listElement.lastElementChild);
     });

  const initAddLike = () => {
  
    const addLikeButtons = document.querySelectorAll(".like-button");

    for (let addLikeButton of addLikeButtons) {

      const id = addLikeButton.dataset.id;

      addLikeButton.addEventListener("click", (event)=> {

        event.stopPropagation();

        if (comments[id].like === true) {
          comments[id].like = false;
          comments[id].likes +=1;
        }
        else if (comments[id].like === false) {
          comments[id].like = true;
          comments[id].likes -=1;
        }

        renderComments ();
      })
  
    }
    
  }
const answer =() => {

  const answerCommentElements = document.querySelectorAll(".answer-button");

  for (let answerComment of answerCommentElements) {
    

    answerComment.addEventListener("click", ()=> {

      const id = answerComment.dataset.id;
   
      textareaInputElement.textContent = `QUOTE_BEGINS ${comments[id].name} : \n ${comments[id].text} QUOTE_ENDS`;
      
      renderComments();
      
    })
  
  }
}
    
  
  const renderComments = () => {

   
    const listElementHtml = comments
    .map((comment, id) => {

      return  `<li class="comment answer-button" data-id="${id}">
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
          <button data-id="${id}" class="${comment.like ? "like-button" : "like-button -active-like "}" id ="like-input"></button>
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