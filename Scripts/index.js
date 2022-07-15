$ = (queryString) => document.querySelector(queryString);

// function to change texture of plane
const changeTexture = (objectID,texture) => {
    $(objectID).setAttribute('src', texture);
}

changeTexture('#titleImage', "assets/vs-bot.png");
// requestAnimationFrame(animate);

