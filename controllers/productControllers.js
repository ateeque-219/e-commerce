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
};

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
};

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
};


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
};

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
};


  const filterProductController = async(req,res)=>{
    try {
              const { checked, radio } = req.body;
              console.log(checked)
              let args = {};
              if (checked.length > 0) args.category = checked;
              if (radio.length>0) args.price = { $gte: radio[0], $lte: radio[1] };
              const products = await Product.find(args);
              res.status(200).send({
                success: true,
                products,
              });
            } catch (error) {
              console.log(error);
              res.status(400).send({
                success: false,
                message: "Error WHile Filtering Products",
                error:error,
              });
            }
  };


  const productCountController = async (req, res) => {
    try {
      const total = await Product.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error:error.message,
        success: false,
      });
    }
  };


   const productListController = async (req, res) => {
    try {
      const perPage = 3;
      const page = req.params.page ? req.params.page : 1;
      const products = await Product
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };


  const searchProductController = async(req,res) =>{
    try {
        const { keyword } = req.params;
        const resutls = await Product
          .find({
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
          })
          .select("-photo");
        res.json(resutls);
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error In Search Product API",
          error,
        });
      }
  };


  const relatedProductController = async(req,res) =>{
    try {
        const { pid, cid } = req.params;
        const products = await Product
          .find({
            category: cid,
            _id: { $ne: pid },
          })
          .select("-photo")
          .limit(3)
          .populate("category");
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error while geting related product",
          error,
        });
      }
  }


   const productCategoryController = async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      const products = await Product.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };
export { CreateProductController,productCategoryController ,relatedProductController, getProductController ,searchProductController,deleteProductController, getSingleProductController,productPhotoController , updateProductController , filterProductController , productCountController, productListController };
