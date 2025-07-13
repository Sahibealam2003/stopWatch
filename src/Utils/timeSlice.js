import { createSlice } from "@reduxjs/toolkit";

const timeSlice =createSlice({
    name:'timer',
    initialState:{
        time:0,
        isRunning:false
    },
    reducers:{
        start:(state)=>{
            state.isRunning = true

        },
        reset:(state)=>{
            state.isRunning = false
            state.time=0

        },
        pause:(state)=>{
            state.isRunning= false

        },
        goingOn:(state)=>{

            state.time += 1

        },

        resume : (state) =>{
            state.isRunning = true
            
        }
    }
})

export default timeSlice.reducer;
export const{start,resume,reset,goingOn,pause} = timeSlice.actions