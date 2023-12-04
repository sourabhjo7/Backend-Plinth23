const mongoose = require("mongoose");
const Payment = require("./models/payment");
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

Payment.find({ confirmation: false }, (err, data) => {
  if (err) throw err;
  
  const formattedData = data.map((d) => {
    // manipulate the data as desired here
    return {
      fullName: d.fullName,
      email: d.email,
      phoneNo: d.phoneNo,
      paidForEvent: d.paidForEvent,
      upiId: d.upiId,
      paid: d.paid,
      confirmation: d.confirmation,
      ssLink: d.ssLink,
      referal: d.referal,
    };
  });
  console.log("=>", formattedData);
  csv
    .writeToPath("MyExcelFile.csv", formattedData, { headers: true })
    .on("finish", () => {
      console.log("Write to csv successfully!");
    });
});
