onclick = function () {
    document.body.style.backgroundColor = "red";
}

let background = document.body.style;
let content = document.getElementById("content");
let gyroscope = new Gyroscope({
    frequency: 60
});
let tilt_flag = false;

// gyroscope.addEventListener("reading", (e) => {
//     if (gyroscope.y >= 8) {
//         background.backgroundColor = "yellow";
//         // get_word();
//     }
//     if (gyroscope.y <= -8) {
//         background.backgroundColor = "lime";
//         // get_word();
//     }
// });
// gyroscope.start();

const options = {
    method: 'GET',
    headers: {}
};

function get_word() {
    // fetch('https://random-word-api.herokuapp.com/word', options)
    //     .then(response => response.json())
    //     .then(response => {
    //         //console.log(response);
    //         set_word(response);
    //     })
    //     .catch(err => console.error(err));
}

function set_word(word) {
    content.textContent = word;
}

// get_word();

function handle_orientation(event) {
    const tilt = Math.round(event.gamma) + 90;
    const beta = Math.round(event.beta);
    set_word(tilt + "______" + beta);

    if (beta < 30 && beta > -30) {
        if (((tilt > 145 && tilt <= 180) || (tilt >= 0 && tilt < 35))) {
            background.backgroundColor = "CornflowerBlue";
            tilt_flag = false;
        } else {
            background.backgroundColor = "YellowGreen";
        }
    } else {
        if (((tilt > 145 && tilt <= 180) || (tilt >= 0 && tilt < 35))) {
            background.backgroundColor = "CornflowerBlue";
            tilt_flag = false;
        } else {
            background.backgroundColor = "Tomato";
        }
    }
}

window.addEventListener("deviceorientation", handle_orientation, true);