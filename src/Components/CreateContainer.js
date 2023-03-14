import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { saveItem } from "../utils/firebasefunctions";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebasefunctions";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setcalories] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState(null);
  const [imageAsset, setimageAsset] = useState(null);
  const [fields, setfields] = useState(false);
  const [alertStatus, setalertStatus] = useState("danger");
  const [msg, setmsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [{foodItems}, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setisLoading(true);
    const imagefile = e.target.files[0];
    //console.log(imagefile);
    const storageref = ref(storage, `Images/${Date.now()}-${imagefile.name}`);
    const uploadtask = uploadBytesResumable(storageref, imagefile);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setfields(true);
        setmsg("Error while uploading : Try Again 😥");
        setalertStatus("danger");
        setTimeout(() => {
          setfields(false);
          setisLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadUrl) => {
          setimageAsset(downloadUrl);
          setisLoading(false);
          setfields(true);
          setmsg("Image uploaded successfully 😊");
          setalertStatus("success");
          setTimeout(() => {
            setfields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setisLoading(true);
    const deleteref = ref(storage, imageAsset);
    deleteObject(deleteref).then(() => {
      setimageAsset(null);
      setisLoading(false);
      setfields(true);
      setmsg("Image Deleted successfully 😊");
      setalertStatus("success");
      setTimeout(() => {
        setfields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setisLoading(true);
    try {
      if((!title || !calories || !imageAsset || !price || !category)){
        setfields(true);
        setmsg("Required fields cannot be empty 😥");
        setalertStatus("danger");
        setTimeout(() => {
          setfields(false);
          setisLoading(false);
        }, 4000);
      }else{
        const data={
          id: `${Date.now()}`,
          title:title,
          imageURL:imageAsset,
          category:category,
          calories:calories,
          qty:1,
          price:price,
        }
        saveItem(data);
        setisLoading(false);
        setfields(true);
        setmsg("Data Added successfully 😊");
        cleardata();
        setalertStatus("success");
        setTimeout(() => {
          setfields(false);
        }, 4000);
        }
    } catch (error) {
      console.log(error);
      setfields(true);
      setmsg("Error while uploading : Try Again 😥");
      setalertStatus("danger");
      setTimeout(() => {
        setfields(false);
        setisLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const cleardata=()=>{
    setTitle("");
    setimageAsset(null);
    setcalories("");
    setprice("");
    //setcalories("Select Category")
  }


  
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
       dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
       })
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-{90%} md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-ful py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted gorder-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursorpointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 cursor-pointer" />
                      <p className="text-gray-500 hover:text-grey-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setcalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
