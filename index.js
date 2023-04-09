onclick = function(){
    document.body.style.backgroundColor = "red";
}

let background = document.body.style;
let content = document.getElementById("content");
let gyroscope = new Gyroscope({ frequency: 60 });
let tilt_flag = false;

gyroscope.addEventListener("reading", (e) => {
    if(gyroscope.y >= 8){
        background.backgroundColor = "yellow";
        get_word();
    }
    if(gyroscope.y <= -8){
        background.backgroundColor = "lime";
        get_word();
    }
});
//gyroscope.start();

const options = {
    method: 'GET',
    headers: {}
};

function get_word(){
    fetch('https://random-word-api.herokuapp.com/word', options)
    .then(response => response.json())
    .then(response => {
        //console.log(response);
        set_word(response);
    })
    .catch(err => console.error(err));
}

function set_word(word){
    content.textContent = word;
}

get_word();

function handle_orientation(event) {
    const tilt = Math.round(event.gamma);
    console.log(tilt);
    set_word(tilt);
    
    if(!tilt_flag && tilt > -30 && tilt <= 30){
        background.backgroundColor = "yellow";
        //get_word();
        tilt_flag = true;
    }
    else if(!tilt_flag && tilt < -60 && tilt >= 60){
        background.backgroundColor = "lime";
        //get_word();
        tilt_flag = true;
    }else{
        console.log(tilt);
        background.backgroundColor = "lightcoral";
        tilt_flag = false;
    }
}

window.addEventListener("deviceorientation", handle_orientation, true);
