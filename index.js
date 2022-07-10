$ = (queryString) => document.querySelector(queryString);

const shiftHue = (hue) => (hue + 0.1) % 360;

let hue = 0;

const animate = () => {
    hue = shiftHue(hue);
    const color = `hsl(${hue}, 100%, 50%)`;
    // $('#box2').setAttribute('color', color);

    //animate position of box2
    const position = `-1 ${2 + Math.sin(Date.now() / 1000)} -5`;
    $('#box2').setAttribute('position', position);

    requestAnimationFrame(animate);
}

// function to change texture of plane
const changeTexture = (objectID,texture) => {
    $(objectID).setAttribute('src', texture);
}

changeTexture('#image1', "assets/vs-bot.png");
// requestAnimationFrame(animate);