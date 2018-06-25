const ITEMS_URL = "./db/items.json";
const HEROES_URL = "./db/heroes.json";
const ITEMS = [], HEROES = [];
const DEFAULT_MIN = 2250, DEFAULT_MAX = 99999;

function parseData(url, parse, nextStep) {
    fetch(url).then(
        response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            if (parse instanceof Function)
                response.json().then(parse);
            if (nextStep instanceof Function) nextStep()
        }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
        if (nextStep instanceof Function) nextStep()
    });
}

function loadItems(data) {
    data.items.forEach(item => {

        if (item.cost > 0 && item['name'].indexOf('recipe') < 0) {
            ITEMS.push(item);
            ITEMS[ITEMS.length - 1].value = 0;
        }
    })
}

function loadHeroes(data) {
    data.heroes.forEach(hero => {
        HEROES.push({name: hero.name})
    })
}

const randInt = max => Math.floor(Math.random() * max);


function chooseHero() {
    document.getElementById('hero-name').innerText = HEROES[randInt(HEROES.length)].name.substr(14);
}

inRange = (cost, min, max) => min <= cost && cost <= max;

function chooseItem(min, max) {
    ITEMS.forEach(item => {
        item.value = inRange(item.cost, min, max) ? Math.random() : 0;
    })
    ITEMS.sort((a, b) => b.value - a.value);
    document.getElementById('item-name').children[0].innerText = ITEMS[0].name;
    document.getElementById('item-name').children[1].innerText = " (" + ITEMS[0].cost + ")"
}

function chooseHeroAndItem(min, max) {
    if (max < min) {
        min = DEFAULT_MIN;
        max = DEFAULT_MAX
    }
    chooseHero();
    chooseItem(min, max);
}

function randomize(e) {
    e.preventDefault();
    let form = e.target;
    chooseHeroAndItem(form['minprice'].value, form['maxprice'].value)
}

function copy(e) {
    e.preventDefault();
    let color = document.getElementById('item-name').children[0];//.innerText;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(color);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');
        selection.removeAllRanges();

    } catch (e) {

    }
}

function ready() {
    parseData(ITEMS_URL, data => {

        if (data.result.status === 200) {
            loadItems(data.result);
        }
    }, () => {
        parseData(HEROES_URL, data => {
            if (data.result.status === 200) loadHeroes(data.result);
        }, () => {
            document.getElementById('randomizer').addEventListener('submit', randomize);
            document.getElementById('copy').addEventListener('click', copy);
            document.getElementById('item-name').addEventListener('click', copy);
            chooseHeroAndItem(DEFAULT_MIN, DEFAULT_MAX);
        });
    });


}

document.addEventListener('DOMContentLoaded', ready);