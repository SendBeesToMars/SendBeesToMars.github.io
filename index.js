onclick = function () {
    document.body.style.backgroundColor = "red";
}

let background = document.body.style;
let content = document.getElementById("content");
let tilt_flag = false;

const options = {
    method: 'GET',
    headers: {}
};

function get_word() {
    fetch('https://random-word-api.herokuapp.com/word', options)
        .then(response => response.json())
        .then(response => {
            //console.log(response);
            set_word(response);
        })
        .catch(err => console.error(err));
}

function set_word(word) {
    content.textContent = word;
}

get_word();

function handle_orientation(event) {
    const tilt = Math.round(event.gamma) + 90;
    const beta = Math.round(event.beta);

    if (beta < 30 && beta > -30) {
        if (((tilt > 145 && tilt <= 180) || (tilt >= 0 && tilt < 35))) {
            background.backgroundColor = "CornflowerBlue";
            tilt_flag = false;
        } else {
            if (!tilt_flag) {
                background.backgroundColor = "Tomato";
                tilt_flag = true;
                get_word();
            }
        }
    } else {
        if (((tilt > 130 && tilt <= 180) || (tilt >= 0 && tilt < 50))) {
            background.backgroundColor = "CornflowerBlue";
            tilt_flag = false;
        } else {
            if (!tilt_flag) {
                background.backgroundColor = "YellowGreen";
                tilt_flag = true;
                get_word();
            }
        }
    }
}

window.addEventListener("deviceorientation", handle_orientation, true);