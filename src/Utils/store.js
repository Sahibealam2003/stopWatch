import { configureStore } from "@reduxjs/toolkit";
import timeRedu from './timeSlice'
const store = configureStore({
    reducer:{
        timer : timeRedu
    }
})

export default store;