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

changeTexture('#image1', "https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg");
requestAnimationFrame(animate);