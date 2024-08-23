const ITEMS_URL = "./db/items.json";
const HEROES_URL = "./db/heroes.json";
const ITEMS = [], HEROES = [];
const DEFAULT_MIN = 4250, DEFAULT_MAX = 99999;
const ALL_VISION = "-allvision"
const NORMAL_VISION = "-normalvision"

function parseData(url, parse, nextStep) {
    fetch(url).then(
        response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            if (parse instanceof Function)
                response.json().then(data => {
                    parse(data);
                    if (nextStep instanceof Function) nextStep()
                });

        }
    ).catch(function (err) {
        console.log('Fetch Error :-S', err);
        if (nextStep instanceof Function) nextStep()
    });
}

function loadItems(data) {
    data.forEach(item => {

        if (item['name'].indexOf('recipe') < 0) {
            ITEMS.push(item);
            ITEMS[ITEMS.length - 1].value = 0;
        }
    })
}

function loadHeroes(data) {
    data.forEach(hero => {
        HEROES.push({
            name: hero.name, localized_name: hero.localized_name, img: hero.img
        })
    })
}

const randInt = max => Math.floor(Math.random() * max);


function chooseHero() {
    let hero = HEROES[randInt(HEROES.length)]
    document.getElementById('hero-name').innerText = hero["localized_name"];
    document.getElementById('hero-name').setAttribute("title", hero.name)
    document.getElementById('hero-img').setAttribute("title", hero["localized_name"])
    document.getElementById('hero-img').setAttribute('src', "")
    document.getElementById('hero-img').setAttribute('src', 'https://cdn.cloudflare.steamstatic.com/' + hero['img'])
}

inRange = (cost, min, max) => min <= cost && cost <= max;

function chooseItem(min, max) {
    ITEMS.forEach(item => {
        item.value = inRange(item.cost, min, max) ? Math.random() : 0;
    })
    ITEMS.sort((a, b) => b.value - a.value);
    document.getElementById('item-img').setAttribute("src", "")

    document.getElementById('item-name').children[0].innerText = "-item " + ITEMS[0].name;
    document.getElementById('item-name').children[1].innerText = " (" + ITEMS[0].cost + ")"
    document.getElementById('item-img').setAttribute("src", ITEMS[0].img)
    document.getElementById('item-img').setAttribute("alt", ITEMS[0].dname)
    document.getElementById('item-img').setAttribute("title", ITEMS[0].dname)
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


function copyText(text) {
    let node = document.getElementById('text_buffer')
    console.log(node)
    node.innerHTML = text
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');
        selection.removeAllRanges();
        node.innerHTML = ""
    } catch (e) {
        console.log(e)
    }
}

function wards(e) {
    e.preventDefault()
    copyText("-item item_ward_o")
}

function teleport(e) {
    e.preventDefault()
    copyText("-teleport")
}

function refresh(e) {
    e.preventDefault()
    copyText("-refresh")
}

function cheats(e) {
    e.preventDefault()
    copyText("sv_cheats 1")
}

function vision(e) {
    e.preventDefault()
    let item = document.getElementById('vision')
    copyText(item.innerText)
    item.innerText = item.innerText === ALL_VISION ? NORMAL_VISION : ALL_VISION
}

function spawnRune(e) {
    e.preventDefault()
    copyText("-spawnrune")
}

function copy(e) {
    e.preventDefault();
    let text = document.getElementById('item-name').children[0].innerText;
    copyText(text);
}

function ready() {

    parseData(ITEMS_URL, data => {

        loadItems(data)

    }, () => {
        parseData(HEROES_URL, data => {
            loadHeroes(data);
        }, () => {
            document.getElementById('randomizer').addEventListener('submit', randomize);
            document.getElementById('copy').addEventListener('click', copy);
            document.getElementById('wards').addEventListener('click', wards);
            document.getElementById('teleport').addEventListener('click', teleport);
            document.getElementById('refresh').addEventListener('click', refresh);
            document.getElementById('cheats').addEventListener('click', cheats);
            document.getElementById('item-name').addEventListener('click', copy);
            document.getElementById('vision').addEventListener('click', vision);
            document.getElementById('spawnrune').addEventListener('click', spawnRune);
            document.getElementById('vision').innerText = ALL_VISION
            chooseHeroAndItem(DEFAULT_MIN, DEFAULT_MAX);
        });
    });


}

document.addEventListener('DOMContentLoaded', ready);