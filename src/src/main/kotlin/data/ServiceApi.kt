package org.example.data

import org.example.data.entity.DotaItemEntity
import retrofit2.Call
import retrofit2.http.GET

interface ServiceApi {
    @GET("/$ITEMS")
    fun getItems(): Call<Map<String, DotaItemEntity>>

    companion object {
        const val BASE_URL = "https://api.opendota.com/"
        private const val ITEMS = "api/constants/items"
    }
}