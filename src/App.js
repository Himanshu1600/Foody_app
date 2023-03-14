import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainContainer, CreateContainer } from "./Components/index";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebasefunctions";
import { actionType } from "./context/reducer";

function App() {
  const [{}, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
       dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
       })
    });
  };
  useEffect(() => {
    fetchData();
  },[]);

  return (  
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-screen flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 p-8 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
