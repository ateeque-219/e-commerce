import Product from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import Category from "../models/categoryModels.js";

const CreateProductController = async (req, res) => {
    try {
      const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
  
      if (!name) {
        return res.status(401).send({
          success: false,
          message: "Name should be provided"
        });
      }
  
      if (!description) {
        return res.status(401).send({
          success: false,
          message: "Description should be provided"
        });
      }
  
      if (!price) {
        return res.status(401).send({
          success: false,
          message: "Price should be provided"
        });
      }
  
      if (!category) {
        return res.status(401).send({
          success: false,
          message: "Category should be provided"
        });
      }
  
      if (!quantity) {
        return res.status(401).send({
          success: false,
          message: "Quantity should be provided"
        });
      }
  
      if (photo && photo.size > 1000000) {
        return res.status(401).send({
          success: false,
          message: "Photo should be less than 1 MB"
        });
      }
  
      const existingCategory = await Category.findOne({ name: category });
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }
      const newProduct = new Product({
        name,
        description,
        price,
        category:existingCategory._id,
        quantity,
        shipping,
        slug: slugify(name)
      });
  
      if (photo) {
        newProduct.photo.data = fs.readFileSync(photo.path);
        newProduct.photo.contentType = photo.type;
      }
  
      await newProduct.save();
  
      res.status(200).send({
        success: true,
        message: "Product created successfully",
        product: newProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        error: error.message,
        message: "Cannot create product"
      });
    }
  };

const updateProductController = async(req,res) =>{
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
    
        if (!name) {
          return res.status(401).send({
            success: false,
            message: "Name should be provided"
          });
        }
    
        if (!description) {
          return res.status(401).send({
            success: false,
            message: "Description should be provided"
          });
        }
    
        if (!price) {
          return res.status(401).send({
            success: false,
            message: "Price should be provided"
          });
        }
    
        if (!category) {
          return res.status(401).send({
            success: false,
            message: "Category should be provided"
          });
        }
    
        if (!quantity) {
          return res.status(401).send({
            success: false,
            message: "Quantity should be provided"
          });
        }
    
        if (photo && photo.size > 1000000) {
          return res.status(401).send({
            success: false,
            message: "Photo should be less than 1 MB"
          });
        }
    
        const newProduct = await Product.findByIdAndUpdate(req.params.pid , {...req.fields , sulg:slugify(name)},{new:true});
    
        if (photo) {
          newProduct.photo.data = fs.readFileSync(photo.path);
          newProduct.photo.contentType = photo.type;
        }
    
        await newProduct.save();
    
        res.status(200).send({
          success: true,
          message: "Product updated successfully",
          product: newProduct
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          error: error.message,
          message: "Cannot update product"
        });
      }
}

const getProductController=async(req,res)=>{
    try {
        const products = await Product
          .find({})
          .populate("category")
          .select("-photo")
          .limit(12)
          .sort({ createdAt: -1 });
        res.status(200).send({
          success: true,
          counTotal: products.length,
          message: "Product List ",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr in getting products",
          error: error.message,
        });
      }
}

const getSingleProductController = async(req,res)=>{
   try {
    const {slug} = req.params;
    const product  = await Product.findOne({slug}).select("-photo").populate("category");
    res.status(200).send({
        success:true,
        message:"detail of the single product",
        product
    })
   } catch (error) {
    res.status(400).send({
        success:false,
        message:"something went wrong while getting the product",
        error:error.message
    })
   }
}


const productPhotoController = async(req,res)=>{
try {
    const product = await Product.findById(req.params.pid).select("photo");
    if(product.photo.data){
        res.set("Content-Type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
    }
} catch (error) {
    res.status(400).send({
        success:false,
        error:error.message,
        message:"error while getting the photo"
    })
}
}

const deleteProductController = async(req,res) =>{
    try {
        await Product.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:"product deleted successfully"
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            error:error.message,
            message:"error while deleting"
        })
    }
}
export { CreateProductController , getProductController ,deleteProductController, getSingleProductController,productPhotoController , updateProductController};
