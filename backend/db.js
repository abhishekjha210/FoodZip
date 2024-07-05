const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://foodzip:Abhishshr@cluster0.zp7dplz.mongodb.net/foodzipmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    const foodItemsCollection = mongoose.connection.collection('food_items');
    const foodCategoryCollection = mongoose.connection.collection('foodCategory');

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    console.log('Data fetched and stored globally');

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = mongoDB;
