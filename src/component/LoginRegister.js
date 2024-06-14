import { useCallback, useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { loginReq, registerReq } from "../service/requests";

const LoginRegister = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [alertBoxAlive, setAlertBoxAlive] = useState(false);
    const [alert, setALert] = useState({
        isError:true,
        message:""
    });


    const userNameRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();


    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const user = {
            username: userNameRef.current.value,
            password: passwordRef.current.value,
        }
        if(isLogin){
            const handleLoginError = (err) => {
                console.error(err);
                if (err.status<500)
                    setALert({isError:true, message:"Invalid Credentials"})
                else
                    setALert({isError:true, message:"Server Error"});
                setAlertBoxAlive(true);
            }

            await loginReq(user, (res) => {
                console.log(res.data);
                sessionStorage.setItem("token",res.data.token);
                sessionStorage.setItem("username",user.username);
                window.location.reload()
            }, handleLoginError);
        }
        else{

            const handleRegisterError = (err) => {
                console.error(err);
                if (err.status<500)
                    setALert({isError:true, message:"Invalid Credentials"})
                else
                    setALert({isError:true, message:"Server Error"});
                setAlertBoxAlive(true);
            }

            await registerReq({...user, role:roleRef.current.value}, (res) => {
                console.log(res.data);
                setALert({isError:false, message:res.data});
                setAlertBoxAlive(true);
                setIsLogin(true);
            }, handleRegisterError)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <form onSubmit={handleOnSubmit} className="lg:w-1/3 max-lg:w-1/2  max-md:w-full max-md:h-full  h-[500px] rounded-lg shadow-2xl bg-white flex flex-col items-center justify-around py-10">
                <div className="w-full flex flex-col items-center gap-10">
                    <h2 className="text-4xl font-bold">{isLogin?"Login":"Register"}</h2>
                    <div className="w-full flex flex-col items-center gap-4">
                        <input type="text" ref={userNameRef} placeholder="Username" className="login-panel-input" />
                        <input type="password" ref={passwordRef} placeholder="Password" className="login-panel-input" />
                        {!isLogin?<select ref={roleRef} defaultValue="default" className="login-panel-input">
                            <option className="py-5" value="default" disabled>Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>:null}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-4">
                    <button className="w-[70%] border-[2px] border-black hover:bg-white hover:text-black bg-black text-xl text-white py-3 rounded-lg transition-all duration-150 " type="submit">{isLogin?"Login":"Register"}</button>
                    <p className="cursor-pointer underline-offset-4 hover:underline " onClick={()=>{setIsLogin(!isLogin)}}>{isLogin?"Don't have an account yet?":"Already have an account?"}</p>
                </div>
            </form>
            {alertBoxAlive? <AlertBox isError={alert.isError} msg={alert.message} setAlive={setAlertBoxAlive}  />:null}
        </div>
    )
}

const AlertBox = ({ setAlive ,isError, msg}) => {

    const handleAlert = useCallback(()=>{
        setTimeout(() => {
            setAlive(false);
        }, 2000);
    },[setAlive])
    
    useEffect(()=>{
        setAlive(true);
        handleAlert();
    },[handleAlert, setAlive]);

    
    return(
        <div className="fixed top-4 w-full flex items-center justify-center">
            <div className={`flex items-center w-96 justify-between ${isError?"bg-red-500":"bg-green-500"} py-5 px-10 rounded-md text-white`}>
                <p>{msg}</p>
                <CiCircleRemove className="text-3xl cursor-pointer" onClick={()=>{setAlive(false)}} />
            </div>
        </div>
    );
}


export default LoginRegister;