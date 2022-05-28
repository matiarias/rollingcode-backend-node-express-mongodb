const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar base de datos");
  }
};

module.exports = {
  dbConnection,
};
