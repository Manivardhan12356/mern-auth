import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const con = await mongoose.connect('mongodb+srv://manivardhan12356:mani!vardhan1428@ecommercedata.11fcaed.mongodb.net/ecommercedata?retryWrites=true&w=majority', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         // Additional mongoose opt
      })
      console.log(`mongo db connected ${con.connection.host}`)
   } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1);
   }
}


export default connectDB;