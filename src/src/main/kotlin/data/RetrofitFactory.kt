package org.example.data

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitFactory {
    fun getServiceApi(): ServiceApi = Retrofit.Builder()
        .baseUrl(ServiceApi.BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .client(OkHttpClient())
        .build()
        .create(ServiceApi::class.java)
}