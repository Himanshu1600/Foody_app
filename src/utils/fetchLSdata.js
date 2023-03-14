export const fetchUser=()=>{
    const userInfo= localStorage.getItem('user')!=="undefined"?JSON.parse(localStorage.getItem("user")):localStorage.clear();
    return userInfo
}
export const fetchCart=()=>{
    const cartinfo= localStorage.getItem('cartItems')!=="undefined"?JSON.parse(localStorage.getItem("cartItems")):localStorage.clear();
    return cartinfo?cartinfo:[]
}