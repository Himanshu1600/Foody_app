import { fetchCart, fetchUser } from "../utils/fetchLSdata"
const cartinfo=fetchCart()

const userInfo= fetchUser();
export const initialState={
    user:userInfo,
    foodItems:null,
    cartShow:false,
    cartItems:cartinfo
}