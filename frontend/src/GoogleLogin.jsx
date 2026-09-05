import {useGoogleLogin} from '@react-oauth/google';
import {googleAuth} from "./api.js";
import {useNavigate} from "react-router-dom";

function GoogleLogin(){

    const navigate = useNavigate();

    const responseGoogle = async (authResult )=>{
        try{
            if(authResult["code"]){
                const result = await googleAuth(authResult['code']);
                const token = result.data.token;
                const {email, name, image} = result.data.user;
                console.log(result.data.user);
                console.log(token);
                const obj = {name, email, image, token };
                localStorage.setItem("user-info" , JSON.stringify(obj));
                navigate("/dashboard");
            }

        }catch(error){
            console.error("error is this-------" , error);
        }
    }

    const googleLogin =  useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })
    return(
        <div className="App">
        <button onClick={()=>{googleLogin()}}>login with google</button>
        </div>
    )
}

export default GoogleLogin;