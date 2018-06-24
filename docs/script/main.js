const ITEMS_URL = "http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key=A44F92B581E67DBC56F84C202AB1CEEA";
const HEROES_URL = "http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=A44F92B581E67DBC56F84C202AB1CEEA";
const ITEMS = [], HEROES = [];

function ajax(url, parse) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (e) {
        if (e.target.readyState === 4 && e.target.status === 200) {

            if (parse !== null) parse(e.target.responseText);
        }
    };
    console.log('oee')
    xhttp.open("GET", url, true);
    xhttp.send();
}

function ready() {
    ajax(ITEMS_URL, data => console.log(JSON.parse(data)))
}

document.addEventListener('DOMContentLoaded', ready);