import userModel from "../Model/userModel.js";
import orderModel from "../Model/orderModel.js"; 
import { userIdGenerator,userPasswordGenerator,hashPassword,comparePassword,emailSer } from "../Helper/HelperFunctions.js";
import JWT from "jsonwebtoken";

// register route 1
export const registerControllerOne = async(req, res) => {

 
    try {

        const {name, email, phone} = req.body;
        if (!name || !email || !phone) {
            return res.send({message: "kindly fill all the fields properly.",success:false})
        }

        // checking existing user
        const ExistingUser = await userModel.findOne({email: email, phone: phone});
        if (ExistingUser) {
            return res
                .status(200)
                .send({message: "Already registered.", success: false})
        }

        //register new user

        //genrate user id and password
        let username=userIdGenerator(phone,email)
        let password = userPasswordGenerator(phone,email)
        const hashedPassword = await hashPassword(password);
        const newUser = await new userModel({name, email,username,  phone, password: hashedPassword}).save();

        emailSer(newUser.email, username,password); 

        return res
            .status(201)
            .send({message: "user registered succesfully.", success: true, newUser})
    } catch (error) { 
        console.log(error);
        return res
            .status(500)
            .send({message: "error in registration", success: false, error})
    }

}

//  registerControllerTwo

export const registerControllerTwo = async(req, res) => {
 
    const { email,phone,subject_code,num_of_pages,description } =req.body;
   

    try{

    if ( !email || !phone) {
        return res.send({message: "kindly fill all the fields properly.",success:false})
    }
    // checking existing user
    const ExistingUser = await userModel.findOne({email: email, phone: phone});
    if (ExistingUser) {
        return res
            .status(200)
            .send({message: "Already registered.", success: false})
    }
     //register new user

        //genrate user id and password
        let username=userIdGenerator(phone,email)
        let password = userPasswordGenerator(phone,email) 
        const hashedPassword = await hashPassword(password);
        const newUser = await new userModel({ email,username,  phone, password: hashedPassword}).save(); 

        const files = req.files;

        // Create an array of file information to save to the database
        const fileData = files.map((file) => ({
            filename: file.originalname,
            content_type: file.mimetype
        }));

    const order = await new orderModel({userId:newUser._id,username,file_data: fileData || [], num_of_pages,email,phone,subject_code,description}).save();
 
        // emailSer(newUser.email);
       
        return res
            .status(201)
            .send({message: "user registered succesfully and order posetd succesfully.", success: true, order,newUser})

}catch(error){
    console.log(error);
}
 

}

//passwordchangecontroller

export const passwordChangeController= async (req,res)=>{
    try{
        const {username,newPassword } = req.body;

        const user = await userModel.findOne({ username });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "user name doestnot exist",
          });
    }

    if(newPassword.length < 6){
        res.send({
            success:false,
            message:"length must be greater than 6"
        })
    }
    
    const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
          success: true,
          message: "Password Reset Successfully",
        });


    
  }catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });

}
}


//loginController

export const loginController = async (req,res)=>{
    try {
        const { username, password } = req.body;
        //validation
        if (!username || !password) {
          return res.status(404).send({
            success: false,
            message: "Invalid username or password",
          });
        }
        //check user
        const user = await userModel.findOne({ username });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "username doesnt exist",
          });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(200).send({
          success: true,
          message: "login successfully",
          user,
          token,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }


}