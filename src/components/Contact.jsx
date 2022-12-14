import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Contact = () => {
    const [contacts,setContacts] = useState([]);

    const getContact = async() =>{
        const {data} = await axios.get('http://localhost:3000/contact');
        setContacts(data);
    }

    const deleteContact = async(id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              const {data} =await axios.delete(`http://localhost:3000/contact/${id}`);
              getContact();
            }
          })
    }
    

    useEffect(() =>{
        getContact();
    },[])

  return (
    <>
    <Link to={'/create'}>
        <button className=' bg-gray-700 text-white py-2  px-3 rounded-md mt-5 mx-5'> Create New Contact</button>
    </Link>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg  my-5 mx-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Email Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Phone Number
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {contacts?.map((i) =>(
                    <tr className='hover:bg-gray-300' key={i.id}>
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                            {i.name}
                        </th>
                        <td className="py-4 px-6 text-gray-900">
                            {i.email}
                        </td>
                        <td className="py-4 px-6 text-gray-900">
                            {i.phone}
                        </td>
                        <td className="py-4 px-6 flex gap-3">
                            <Link to={`/edit/${i.id}`}>
                                <AiFillEdit  className=' text-xl text-green-500 cursor-pointer' title='Edit'/>
                            </Link>
                            <AiFillDelete onClick={() => deleteContact(i.id)} className=' text-xl text-red-500 cursor-pointer' title='Delete'/>
                        </td> 
                    </tr>  
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Contact