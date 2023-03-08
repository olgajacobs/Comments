const addForm = document.querySelector('input');
const buttonComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const textInputElement = document.getElementById("name-input");
const textareaInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");


    buttonComment.addEventListener("click", () => {

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
      const oldListHtml = listElement.innerHTML;

      listElement.innerHTML = oldListHtml +
      `<li class="comment" >
      <div class="comment-header">
        <div>${textInputElement.value}</div>
        <div>${today}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${textareaInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button" id ="like-input"></button>
        </div>
      </div>
    </li>`;

    buttonComment.disabled = true;
    textInputElement.value = "";
    textareaInputElement.value = "";
    });



    removeComment.addEventListener("click", () => {
         listElement.removeChild(listElement.lastElementChild);
     })
   
    

    // Код писать здесь
    console.log("It works!");