import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import notfound from '../img/NotFound.svg';
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollvalue }) => {
  const rowContainer = useRef();

  const [items, setitems] = useState([]);
  const [{cartItems},dispatch] = useStateValue();

  const addtocart=()=>{
      //console.log(item);
      dispatch({
        type:actionType.SET_CART_ITEM,
        cartItems:items
      })
      localStorage.setItem("cartItems",JSON.stringify(items))
  }

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollvalue;
  }, [scrollvalue]);
  useEffect(()=>{
    addtocart();
  },[items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-4 my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length>0 ? 
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 min-w-[275px] h-[250px] md:w-30 md:min-w-[300px] bg-cardOverlays rounded-lg p-2 my-12 shadow-md backdrop-blur-lg hover:drop-shadow-xl flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.2 }} className="w-40 h-40 -mt-8 drop-shadow-2xl">
              <img
                
                src={item?.imageURL}
                alt="image"
                className="w-full h-full object-contain"
              />
              </motion.div>
              
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={()=> setitems([...cartItems,item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex  flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item.calories} Calories</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>{item.price}
                </p>
              </div>
            </div>
          </div>
        )):
        <div className="w-full flex flex-col items-center justify-center">
          <img className="h-340" src={notfound} alt="Not Found"/>
          <p className="text-xl text-headingColor font-semibold my-2">Item Not Available</p>
        </div>}
    </div>
  );
};

export default RowContainer;
