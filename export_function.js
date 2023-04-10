export function getListComments(comment) {
    return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked
    }
}
export function initLikeListeners(renderComments,listComments) {
    // Запускаем обработчик кнопок  Like
    const likesElements = document.querySelectorAll('[data-likes]');
    for (const likeElement of likesElements) {

        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const id = likeElement.dataset.id;
            if (comments[id].isLiked) {
                comments[id].likes -= (comments[id].likes) ? 1 : 0;
                comments[id].isLiked = false;
            } else {
                comments[id].likes += 1;
                comments[id].isLiked = true;
            }
            renderComments(listComments);
        });

    }
};

export function initCommentListeners (listComments) {
    // Запускаем обработчик клика на комментарии. Формируем ответ на комментарий
    const commentsElements = document.querySelectorAll(".comment");
    const TextAreaElement = document.getElementById("add-form-text");

    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", (event) => {
            const id = commentElement.dataset.id;
            TextAreaElement.value =
                `BEGIN_QUOTE${"\n>" + listComments[id].text + "\n" + listComments[id].name + "\n"}END_QUOTE` + "\n";
        });
    }
};