import React, { useContext, useEffect, useRef } from 'react'
import { ImCross } from "react-icons/im";
import AuthorImage from "../../assets/219970.png"
import { AppUserContext } from '../../AppUser';
import { AUTHOR_REGISTER_URL } from '../../service/apiUrl';

const AddAuthorPanel = () => {

    const { fetchAuthors, requestHandler, handleAddAuthorPanel } = useContext(AppUserContext);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const contactNoRef = useRef();


    useEffect(
        () => {
          return () => {
            fetchAuthors();
          }
        },[fetchAuthors]
    );

    const handleAuthorSubmit = async(e) => {
        e.preventDefault();
        const author = {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          contactNo: contactNoRef.current.value
        }
        console.log(author);
        await requestHandler?.postReq(AUTHOR_REGISTER_URL, author, (res) => {
          console.log(res.data);
          handleAddAuthorPanel(false);
        });
    }

  return (
    <div className='add-new-panel max-md:w-full'>
        <div className='text-xl w-full flex-box justify-end cursor-pointer text-white'><ImCross onClick={()=>handleAddAuthorPanel(false)} /></div>
        <img alt='author' src={AuthorImage} width={200} />
        <form onSubmit={handleAuthorSubmit} className='w-3/4 flex flex-col items-center gap-10 '>
          <input ref={firstNameRef} type='text' className="add-new-panel-input" placeholder='First Name' />
          <input ref={lastNameRef} type='text' className="add-new-panel-input" placeholder='Last Name' />
          <input ref={emailRef} type='email' className="add-new-panel-input" placeholder='Email' />
          <input ref={contactNoRef} type='text' className="add-new-panel-input" placeholder='Contact Number' />
          <button className=' w-full bg-black rounded-xl text-white flex items-center mt-7 justify-center px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'>Add</button>  
        </form>
    </div>
  )
}

export default AddAuthorPanel