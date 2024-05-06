import Category from "../models/categoryModels.js";
import slugify from "slugify";

const CreateCategoryController = async(req,res)=>{
  try {
    const {name} = req.body;
    // console.log(name);
    if(name === ""){
        return res.status(401).send({
            success:false,
            message:"category type is required"
        })
    }
    const existingCategory = await Category.findOne({name});
    if(existingCategory){
        return res.status(401).send({
            success:false,
            message:"category allready existing"
        })
    }
    const category = await Category.create({
        name,
        slug:slugify(name)
    })
    res.status(201).send({
        success:true,
        message:"category created",
        category
    })

  } catch (error) {
    res.status(400).send({
        success:false,
        error:error.message,
        message:"something is wrong in category"
    })
  }
}

const updateCategoryController = async(req,res)=>{
  try {
    const {name} = req.body;
    const {id} = req.params
    const category =await  Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({
        success:true,
        message:"successfully updated",
        category
    })
    
  } catch (error) {
    res.status(500).send({
        success:false,
        error:error.message,
        message:"something went wrong while updating"
    })
  }
}


const getCategoryController = async(req,res)=>{
    try {
        const category = await Category.find({})
        res.status(200).send({
            success:true,
            message:"all category",
            category
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

const getSingleCategoryController=async(req,res)=>{
    try {
        const {slug} = req.params
         const cate = await Category.findOne({slug});
         res.status(200).send({
            success:true,
            message:"successfully got the category",
            cate
         })
    } catch (error) {
        res.send(500).send({
            success:false,
            error:error.message,
            message:"something went wrong while accesing the category"
        })
    }
}

const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"deleted successfully",

        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"something went wrong ",
            error
        })
    }
}
export {CreateCategoryController ,updateCategoryController , getCategoryController , getSingleCategoryController,deleteCategoryController}