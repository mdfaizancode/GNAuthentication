import Router from "express";
const router = Router();
import {login, signUp, googleLogin} from "../controllers/authControllers.js";
import {loginValidation, signUpValidation} from "../middlewares/authValidation.js";


router.post("/login", loginValidation, login);

router.post("/SignUp", signUpValidation, signUp);
router.get("/google", googleLogin);

export default router; 