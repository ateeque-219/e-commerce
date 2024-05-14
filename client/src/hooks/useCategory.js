import { useState , useEffect } from "react";
import axios from "axios";

export default  function useCategory(){
 const [categories,setCategories] = useState([]);

 const getCategory=async()=>{
    try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        if(res.data.success){
            setCategories(res.data?.category)
        }
    } catch (error) {
        console.log(error)
    }
 }
 useEffect(()=>{
    getCategory()
 },[])
 
 return categories;
}