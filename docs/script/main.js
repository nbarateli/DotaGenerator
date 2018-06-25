const ITEMS_URL = "./db/items.json";
const HEROES_URL = "./db/heroes.json";
const ITEMS = [], HEROES = [];

function parseData(url, parse) {
    fetch(url).then(
        response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            if (parse instanceof Function)
                response.json().then(parse);
        }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

function loadItems(data) {
    data.items.forEach(item => {

        if (item.cost > 0 && item['name'].indexOf('recipe') < 0)
            ITEMS.push(item);
    })
}

function loadHeroes(data) {
    data.heroes.forEach(hero => {
        HEROES.push({name: hero.name, priority: 0.0, value: 0.0})
    })
}

function ready() {
    parseData(ITEMS_URL, data => {

        if (data.result.status === 200) {
            loadItems(data.result);
        }
    });
    parseData(HEROES_URL, data => {
        if (data.result.status === 200) loadHeroes(data.result);
    });

}

document.addEventListener('DOMContentLoaded', ready);