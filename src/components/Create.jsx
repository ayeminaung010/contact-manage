import axios from 'axios'
import React, { useState } from 'react'
import {AiOutlineMail} from 'react-icons/ai'
import {BsPhone} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Create = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const navigate = useNavigate();

  const apiCreateContact = async(contact) =>{
    const {data} = await axios.post('http://localhost:3000/contact',contact);
    navigate('/');
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  const onSubmitHandler = e =>{
    e.preventDefault();
    const contact = {id: Date.now(), name,email,phone}
    apiCreateContact(contact);
    Toast.fire({
      icon: 'success',
      title: 'Created successfully'
    })
  }

  return (
    <form action="" onSubmit={onSubmitHandler} className=' w-96 mx-auto border-2 p-5  mt-5 shadow-md rounded-sm'>
      <h1 className=' text-gray-800 font-bold text-2xl text-center '>Create New Contact</h1>
      <div className="">
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-xl text-gray-900  bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green" />
        </div>  
      </div>
      <div className="">
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <AiOutlineMail className=' text-xl text-gray-50'/>
          </span>
          <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}  id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" />
        </div>  
      </div>
      <div className="">
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <BsPhone className=' text-xl text-gray-50'/>
          </span>
          <input type="number" onChange={(e) => setPhone(e.target.value)} value={phone}  id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09xxxxxxx" />
        </div>  
      </div>
      <div className="">
        <button type='submit' className=' text-white bg-gray-700 px-4 py-2 my-3 rounded-md' >
          Create
        </button>
        <Link to={'/'}>
          <button className=' text-white bg-red-700 px-4 py-2 my-3 rounded-md mx-3'>
            Cancel
          </button> 
        </Link>
      </div>
    </form>
  )
}

export default Create