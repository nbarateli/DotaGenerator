package org.example

import com.google.gson.Gson
import org.example.data.RetrofitFactory

fun main() {
    val bo = RetrofitFactory.getServiceApi().getItems().execute().body()
    val items = bo.orEmpty().map { (title, item) ->
        DotaItem(
            name = "item_$title",
            cost = item.cost?.toInt() ?: 0,
            img = "https://cdn.cloudflare.steamstatic.com/${item.img.orEmpty()}",
            dname = item.dname.orEmpty()
        )
    }
    val gson = Gson()
    val json = gson.toJson(items)
    println(json)
}