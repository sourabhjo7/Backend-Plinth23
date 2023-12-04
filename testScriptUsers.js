const mongoose = require("mongoose");
const User = require("./models/userModel");
const csv = require("fast-csv");
const fs = require("fs");
const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb+srv://admin:admin@cluster0.rxbd2.mongodb.net/plinth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connected Sucessfully!"))
    .catch((error) => {
      console.log("DB Connection Failed!");
      console.log(error);
      process.exit(1);
    });
};
connect();

// Payment.find({confirmation:false}, (err, data) => {
//     console.log("---",data);
//     mongooseToExcel.mongooseToExcel(data, "MyExcelFile.xlsx");
// });

User.find({  role: 'user' }, (err, data) => {
  if (err) throw err;
  
  const formattedData = data.map((d) => {
    // manipulate the data as desired here
    return {
      fullName: d.fullName,
      email: d.email,
      phoneNo: d.phoneNo,
      country: d.country,
      city: d.city,
      instituteName: d.instituteName,
      accomodation: d. accomodation,
      totalpaid: d.totalpaid,
      isverified: d.isverified,
    };
  });
  console.log("=>", formattedData);
  csv
    .writeToPath("MyExcelFileUsers.csv", formattedData, { headers: true })
    .on("finish", () => {
      console.log("Write to csv successfully!");
    });
});
