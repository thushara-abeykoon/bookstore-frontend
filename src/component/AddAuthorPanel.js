import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { ImCross } from "react-icons/im";
import SampleUserImage from "../assets/219970.png"
import App, { AppContext } from '../App';
import axios from 'axios';

const AddAuthorPanel = () => {

    const {fetchAuthors} = useContext(AppContext);


    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const contactNoRef = useRef();

    const {handleAddAuthorPanel} = useContext(AppContext);
    const textFieldStyle = 'w-full text-md px-4 py-2 border-b-2 border-black outline-none bg-transparent';


    useEffect(
        () => {
          return () => {
            fetchAuthors();
          }
        },[]
    );

    const handleAuthorSubmit = (e) => {
        e.preventDefault();
        const author = {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          contactNo: contactNoRef.current.value
        }
        const postData = async () => {
            await axios.post("http://localhost:8080/api/v1/author/register", author)
            .then((response) => {
                console.log(response.data);
                handleAddAuthorPanel(false);
            })
            .catch((err)=>{console.log(err);});
        }
        postData();     
    }

  return (
    <div className='fixed right-0 top-0 h-screen w-1/4 shadow-2xl bg-white text-black p-4 flex flex-col items-center gap-10'>
        <div className='text-xl w-full flex-box justify-end cursor-pointer'><ImCross onClick={()=>handleAddAuthorPanel(false)} /></div>
        <img src={SampleUserImage} width={200} />
        <form onSubmit={handleAuthorSubmit} className='w-3/4 flex flex-col items-center gap-10 '>
          <input ref={firstNameRef} type='text' className={textFieldStyle} placeholder='First Name' />
          <input ref={lastNameRef} type='text' className={textFieldStyle} placeholder='Last Name' />
          <input ref={emailRef} type='email' className={textFieldStyle} placeholder='Email' />
          <input ref={contactNoRef} type='text' className={textFieldStyle} placeholder='Contact Number' />
          <button className=' w-full bg-black rounded-xl text-white flex items-center mt-7 justify-center px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'>Add</button>  
        </form>
    </div>
  )
}

export default AddAuthorPanel