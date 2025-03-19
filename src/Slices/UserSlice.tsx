import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const UserSlice = createSlice({
    name:"user",
    initialState:getItem("user"),
    reducers:{
setUser:(state, action)=>{
    setItem("user",action.payload);
    state=getItem("user");
    return action.payload;
},
removeUser:(state)=>{
    removeItem("user");
    state = null;
    return null;
}

    }
})
export const{setUser,removeUser}=UserSlice.actions;
export default UserSlice.reducer;