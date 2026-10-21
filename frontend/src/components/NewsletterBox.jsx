import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }



  return (
    <div  className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'> Lorem is simply dummy text of the printing and typesetting industry. </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6  border pl-3'>
        <input type='email' placeholder='Enter your email'
       className='w-full sm:flex-1 outline-none border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-blue-500'
       required />

       <button type='submit' className='bg-black text-white py-4 px-10 hover:bg-gray-800 transition duration-300'>
         SUBSCRIBE
       </button>

      </form>
      
    </div>
  )
}

export default NewsletterBox
