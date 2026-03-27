const Product=require("../models/Product")

//Add Product (Admin Only)
exports.addProduct=async(req,res)=>{
    try{
        const product=new Product(req.body);
        await product.save()

        res.status(201).json({message:"Product added",product})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
};

//Get Product(Public)
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const search = req.query.search || "";
    const category = req.query.category;
    const min = req.query.min;
    const max = req.query.max;

    const skip = (page - 1) * limit;

    // 🔥 Dynamic filter
    let filter = {};

    // Search
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Price range
    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.json({ page, total, products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT (ADMIN)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Product updated", product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT (ADMIN)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
