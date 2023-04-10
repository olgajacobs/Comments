import { renderLoginComponent } from './login-component.js';
import { addComment, getComments} from './api.js';
import { getListComments, initLikeListeners, initCommentListeners } from './export_function.js';
import { siteView } from './siteView.js';


const appEl = document.getElementById("app");
let listComments = [];
let token =null;
let user = null;

const updateComments = (firstLoading = false) => {

  // Первая загрузка
  if (firstLoading) {
    renderComments(listComments, true);
  }
  // Чтение данных по API и обновление экрана
  getComments(token).then((responseData) => {
    const listComments= responseData.comments.map((comment) => getListComments(comment));


    renderComments(listComments);
  });
};

function postComment(TextAreaElement, InputElement) {

  const name = InputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const text = TextAreaElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  addComment(token,name, text).then(() => {
    TextAreaElement.value = "";
    InputElement.value = "";
    updateComments();
  }).catch((error) => {
    if (error.message === 'Сервер не отвечает') {
      console.log('500');
      postComment(TextAreaElement, InputElement);
    }
    const oldInputElement = InputElement.value;
    const oldTextAreaElement = TextAreaElement.value;

    renderComments(listComments);

    InputElement.value = oldInputElement;
    TextAreaElement.value = oldTextAreaElement;
  })
}
// Завешиваем обработчик кнопки "Написать" (добавление комментария)
const buttonListener = () => {
  
  const buttonElement = document.getElementById("add-form-button");
  const InputElement = document.getElementById("add-form-name");
  const TextAreaElement = document.getElementById("add-form-text");
  buttonElement.addEventListener("click", () => {

    if (InputElement.value === "") {
      alert("Не введено имя");
      return;
    }
    if (TextAreaElement.value === "") {
      alert("Пустой комментарий");
      return;
    }
    // Меняем форму ввода на сообщение 'Комментарий добавляется'
    // isLoading = true;
    renderComments(listComments, false, true);
    postComment(TextAreaElement, InputElement);
  });
}

      // удалить последний комментарий
// const deleteComment = () => {
//      const removeComment = document.getElementById("remove-comment");
 //     removeComment.addEventListener("click", ()=> {
//      listComments.pop();
 //     renderComments(listComments)
 //     })
//    }



const AutorizationButtonListener = () => {
    // Завешиваем обработчик кнопки "Авторизуйтесь" Переход к форме Логин/Регистрация
    
    const AutorizationButtonElement = document.getElementById("autorization-button");
  
    AutorizationButtonElement.addEventListener("click", () => {
      renderLoginComponent({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
          updateComments,
          setUser: (newUser) => {
            user = newUser;
          },
      });
      
      });
  }

  const renderComments = (listComments, firstLoading = false, isLoading = false,isLogin =false) => {

    const commentsHtml = siteView(listComments, firstLoading, isLoading,token? true:false,isLogin)
  
    // const buttonElement = document.getElementById("add-form-button");
    appEl.innerHTML = commentsHtml;
    const a=!(isLoading || firstLoading || isLogin || token === null);
    if (!(isLoading || firstLoading || isLoading ||isLogin ||token===null)) {
      
      const InputElement = document.getElementById("add-form-name");
      const TextAreaElement = document.getElementById("add-form-text");
      TextAreaElement.value = "";
      InputElement.value = user;

    //  deleteComment();
      buttonListener();
      initLikeListeners(renderComments, listComments);
      initCommentListeners(listComments);
    }
    if (!(isLoading || firstLoading || isLoading || isLogin) && token === null) {
      AutorizationButtonListener();
    }
  };
  
  updateComments(true);






