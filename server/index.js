const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userModel = require("./userModel");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db_link = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zbfqx0e.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(db_link)
  .then(function () {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });



app.post("/storeData", async (req, res) => {
  const { name, mobile } = req.body;

  if(!name || !mobile){
    return res.json({
        message:"All credentials are required"
    })
  }

  if(Number(mobile)==NaN){
    return res.json({
      message:"Invalid Mobile Number"
  })
  }

  if(mobile.length!=10){
    return res.json({
        message:"Invalid Mobile Number"
    })
  }


  const newUser = {
    name: name,
    mobile: mobile,
  };

  let prev = await userModel.find({mobile:mobile});
  if(prev.length!=0){
    return res.json({
        message:"Phone Number Already Present!!!"
    })
  }

  let data = await userModel.create(newUser);
  console.log(data);

  res.json({
    message: "Data Stored",
    data: data,
  });
});

app.get("/list",async(req,res)=>{
    let data=await userModel.find().sort({"name": 1});
    return res.json({
        data:data
    })
})

app.post("/delete",async(req,res)=>{
    const {mobile}=req.body;
    if(!mobile){
        return res.json({
            message:"All Credentials are required"
        })
    }
    if(mobile.length!=10){
        return res.json({
            message:"Invalid Mobile Number"
        })
    }

    if(Number(mobile)==NaN){
      return res.json({
        message:"Invalid Mobile Number"
    })
    }

    let data=await userModel.findOneAndDelete({mobile:mobile});
    if(data){
        return res.json({
            message:"Data Deleted",
            Deleted_Data:data
        })
    }
    return res.json({
        message:"Data Not Found"
    })
})

app.post("/update",async(req,res)=>{
    const {name,mobile}=req.body;

    
  if(!name || !mobile){
    return res.json({
        message:"All credentials are required"
    })
  }

  if(Number(mobile)==NaN){
    return res.json({
      message:"Invalid Mobile Number"
  })
  }

  if(mobile.length!=10){
    return res.json({
        message:"Invalid Mobile Number"
    })
  }


  const updateUser = {
    name: name,
    mobile: mobile,
  };

  let result=await userModel.findOneAndUpdate({mobile:mobile},updateUser);

  if(result){
    return res.json({
        message:"Data Updated",
        data:updateUser
    })
  }

  return res.json({
    message:"Mobile Number Not Found"
  })

})


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
