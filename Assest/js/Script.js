// Search
let search = document.getElementById("gsrc");
search.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        window.open("https://www.google.com/search?q=" + search.value, "_self");
    }
});
// Date
function Clck() {
    let date = new Date();
    let options = { weekday: 'long', year: '2-digit', month: 'numeric', day: 'numeric' };
    let cdate = date.toLocaleDateString('en-EN', options);
    let ctime = date.toLocaleTimeString();
    let clock = document.getElementById("Clock");

    if (clock.childNodes.length == 0 ) {
        clock.appendChild(document.createTextNode(cdate));
        let br = document.createElement('br');
        clock.appendChild(br);
        clock.appendChild(document.createTextNode(ctime));
    }else{
        clock.childNodes[0].data=cdate;
        clock.childNodes[2].data=ctime;
    }
}
Clck();
setInterval(Clck, 900);
// Setting icon

let set = document.getElementById("setimg");
let div = document.getElementById("setdiv");
let set2 = document.getElementById("set2img");

div.style.width = set.clientWidth + "px";
div.addEventListener("mouseover", () => {
    div.style.width = set.clientWidth * 2 + "px";
    set2.classList.remove("invisible");
});
div.addEventListener("mouseout", () => {
    div.style.width = set.clientWidth + "px";
    set2.classList.add("invisible");
});
let screenctrl = 1;

function fs() {
    if (screenctrl == 1) {
        document.documentElement.requestFullscreen();
        return screenctrl = 0;
    }
    if (screenctrl == 0) {
        document.exitFullscreen();
        return screenctrl = 1;
    }
}
//Settings Menu
let y = 1;

function settings() {
    let element = document.getElementById("setcol");
    let btn = document.getElementById("setdiv");
    let bg = document.getElementById("bg-set");
    if (y == 1) {
        element.style.width = "30%";
        btn.style.marginLeft = "calc(" + parseInt(element.style.width) + "% + 10px)";
        bg.classList.remove("invisible");
        return y = 0;
    }
    if (y == 0) {
        element.style.width = "0px";
        btn.style.marginLeft = "10px";
        bg.classList.add("invisible");
        return y = 1;
    }
}

set.addEventListener("click", () => {
    settings();
});

set2.addEventListener("click", () => {
    fs();
});

// Backgorund Setting
function setbg(btn) {
    let body = document.getElementById("bg");
    if (btn == "unsplah") {
        let key = document.getElementById("kword");
        if (key.value == "") {
            body.style.backgroundImage = "url(https://source.unsplash.com/random)";
        } else {
            body.style.backgroundImage = "url(https://source.unsplash.com/random/?" + key.value + ")";
            localStorage.setItem("key", key.value);
        }
        if (localStorage.getItem("key") !== "null") {
            body.style.backgroundImage = "url(https://source.unsplash.com/random/?" + localStorage.getItem("key") + ")";
        }
        body.style.backgroundPosition = "center";
        body.style.backgroundSize = "cover";
        body.style.backgroundAttachment = "fixed";
        localStorage.setItem("setbg", "unsplah");
    }
    if (btn == "img") {
        document.getElementById("bg-img").addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                localStorage.setItem("recent-bg", reader.result);
            });
            reader.readAsDataURL(this.files[0]);
            localStorage.setItem("setbg", "uplad");
            setTimeout(() => {
                location.reload(true);
            }, 0);
        });
    }
    if (btn == "uplad") {
        const bgURL = localStorage.getItem("recent-bg");
        if (bgURL) {
            body.style.backgroundImage = "url(" + bgURL + ")";
            body.style.backgroundPosition = "center";
            body.style.backgroundSize = "cover";
            body.style.backgroundAttachment = "fixed";
        }
    }
    if (btn == "color") {
        let color = document.getElementById("bgcolor");
        color.addEventListener("change", () => {
            body.style.backgroundColor = color.value;
            localStorage.setItem("bgcolor", color.value);
            localStorage.setItem("setbg", "setcolor");
            setTimeout(() => {
                location.reload(true);
            }, 0);
        });
    }
    if (btn == "setcolor") {
        body.style.backgroundColor = localStorage.getItem("bgcolor");
    }
    if (btn == "grad") {

    }
}
document.addEventListener("load", setbg(localStorage.getItem("setbg")));
//Setting Backgorund
function select(o) {
    let s = document.getElementById("set-cont");
    s.childNodes[o].classList.remove("invisible");
    for (i = 0; i < arguments.length - 1; i++) {
        if (s.childNodes[arguments[i + 1]].classList[0] !== "invisible") {
            s.childNodes[arguments[i + 1]].classList.add("invisible");
        }
    }
}
document.getElementById("select").addEventListener("change", () => {
    const val = document.getElementById('select').value;
    if (val == "unsplah") {
        select(1, 3, 5);
    }
    if (val == "uplad") {
        select(3, 1, 5);
    }
    if (val == "color") {
        select(5, 3, 1);
    }
});

document.getElementById("setbgunsplah").addEventListener("click", () => {
    setbg('unsplah');
});
document.getElementById("bg-img").addEventListener("click", () => {
    setbg('img');
});
document.getElementById("bgcolor").addEventListener("click", () => {
    setbg('color');
});
document.getElementById("Reset-bg").addEventListener("click", () => {
    let keysToRemove = ["key", "setbg", "recent-bg", "bgcolor"];
    for (let i = 0; i < keysToRemove.length; i++) {
        localStorage.removeItem(keysToRemove[i]);
    }

    setTimeout(() => {
        location.reload(true);
    }, 0);
});
