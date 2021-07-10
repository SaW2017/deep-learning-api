const mongoose = require("mongoose");

module.exports = async function connection(){
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.DB, connectionParams);

        // check if connection works
        const db = mongoose.connection;
        db.once('open', _ => {
            console.log('Database connected:', process.env.DB)
        });
    }catch (e) {
        db.on('error', err => {
            console.error('connection error:', err)
        });
        console.log(e);
    }
}