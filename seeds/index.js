const mongoose = require('mongoose');
const cities = require('./cities');
const Place = require('../models/place');

mongoose.connect('mongodb://127.0.0.1:27017/been-there', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Place.deleteMany({});
    for(let i = 0; i < 9; i ++){
        const c = new Place({
            author: '64556102aaf108e72cb277fb',
            location:`${cities[i].city}, ${cities[i].state}`,
            title:`${cities[i].title}`,
            images: cities[i].images,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            
        })
        await c.save();
    }
}


seedDB().then(()=>{
    mongoose.connection.close();
});
