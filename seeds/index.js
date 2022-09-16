const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.connect("mongodb://localhost:27017/yelp-camp");
const db = mongoose.connection;
const Campground = require("../models/campground");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = await new Campground({
      author: "6317523b56de4fefc3a286ad",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ratione blanditiis dolorem consectetur veritatis consequuntur quas, eaque nam corporis culpa nihil nobis id ab, beatae cum iure eius reiciendis quaerat.",
      price: price,
      images: [
        {
          url: "https://res.cloudinary.com/dtp3bgfpy/image/upload/v1662815127/YelpCamp/ia4mz9tmuxaahdm9ensm.jpg",
          filename: "YelpCamp/vsfbf0fnrgxxzvuoixd6",
          _id: "631b16223973ef6ebdfdc714",
        },
      ],
    });
    await camp.save();
  }
};
//6317523b56de4fefc3a286ad
seedDB().then(() => {
  mongoose.connection.close();
});
