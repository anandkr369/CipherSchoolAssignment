import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const TestCompleted = () => {
        

    
  return (
    <div>
      
      <div className=''>
      <Navbar/>
        <div className='complete-message'>
        <h1>Test Completed Successfully 🏆🔢🎉</h1>
        </div>
        <div className='mx-auto card bg-warning w-50 mt-5'>
            <h3 className='text-center'>Test submitted successfully! Thank you for completing the test.</h3>
            <h3 className='text-center'>Your score will be sent to your email shortly</h3>
        </div>
    </div>
    </div>
  )
}

export default TestCompleted