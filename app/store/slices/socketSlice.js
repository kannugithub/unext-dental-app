import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

let socket;
try {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    // socket = io(process.env.NEXT_PUBLIC_LOCAL_SOCKET_URL, {
    transports: ["websocket"],
    auth: { token: localStorage.getItem("userId") },
  });
} catch (err) {
  console.error(err);
}

export const socketSlice = createSlice({
  name: "socket",
  initialState: { socket },
  reducers: {},
});

export const {} = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
