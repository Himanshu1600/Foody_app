import React, { useEffect, useState } from "react";
import Delivery from "../img/delivery.png";
import Home from "./Home";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems,cartShow }, dispatch] = useStateValue();
  const [scrollvalue, setscrollvalue] = useState(0);

  useEffect(() => {}, [scrollvalue,cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Home />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & Healthy Fruits
          </p>
          <div className="hidden md:flex gap-3 item-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setscrollvalue(-200)} 
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft className="text-lg text-white " />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setscrollvalue(200)}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100  hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight className="text-lg text-white " />
            </motion.div>
          </div>
        </div>
        <RowContainer
          flag={true}
          data={foodItems?.filter((n) => n.category === "chicken")}
          scrollvalue={scrollvalue}
        />
      </section>
      <MenuContainer/>
      {cartShow &&
      <CartContainer/>}
    </div>
  );
};

export default MainContainer;
