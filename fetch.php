<?php
const ITEMS_URL = "http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key=A44F92B581E67DBC56F84C202AB1CEEA";
const HEROES_URL = "http://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=A44F92B581E67DBC56F84C202AB1CEEA";
const ITEMS_FILE = "docs/db/items.json";
const HEROES_FILE = "docs/db/heroes.json";


function fetch_file($url, $filename)
{
    $file = fopen($filename, "w") or die("Unable to open file!");
    fwrite($file, file_get_contents($url));
    fclose($file);
}

fetch_file(ITEMS_URL, ITEMS_FILE);
fetch_file(HEROES_URL, HEROES_FILE);