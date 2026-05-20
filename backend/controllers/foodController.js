import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
  try {

    
    if (!req.file) {
      return res.json({
        success: false,
        message: "Please upload image"
      });
    }

    const image_url = req.file.path;

    const { name, description, price, category } = req.body;

    
    if (!name || !description || !price || !category) {
      return res.json({
        success: false,
        message: "Please fill all fields"
      });
    }

    
    if (Number(price) < 0) {
      return res.json({
        success: false,
        message: "Price cannot be negative"
      });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_url
    });

    await food.save();

    res.json({
      success: true,
      message: "Food Added"
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      data: foods
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error"
    });
  }
};

const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food Removed!"
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error"
    });
  }
};

export { addFood, listFood, removeFood };