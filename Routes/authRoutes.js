import express from "express";
import { registerControllerOne,registerControllerTwo,passwordChangeController,loginController } from "../Controller/authController.js";
// import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {upload} from '../Middleware/upload.js'
const router = express.Router();

//routings

//register route 1
router.post('/register-route-one',registerControllerOne);

// register route 2
router.post('/register-route-two',upload.array("files"),registerControllerTwo)
 
//router password change
 router.post('/change-passcode',passwordChangeController);

 //login
 router.post('/login-auth',loginController)

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