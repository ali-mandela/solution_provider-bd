import express from "express";
import { registerControllerOne } from "../Controller/authController.js";
// import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object

const router = express.Router();

//routings

//REGISTER 
router.post('/register-route-one',registerControllerOne);
 

// router.post('/login',loginController);

// router.get('/test',requireSignIn, isAdmin, testController);

// //protected user tpoutr
// router.get('/user-auth',requireSignIn,(req,res)=>{
//     res.status(200).send({ok:true})
// });


// //adminroute
// router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
//     res.status(200).send({ok:true})
// });



export default router;