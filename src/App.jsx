import Question from './Question'
import Header from './Header'
import React, { useState } from 'react'

function App() {
  return (
    <>
      <div className='max-w-screen-2xl mx-auto items-center'>
        <div className='flex flex-col justify-center align-middle'>
          <Header />
          <Question />
        </div>
      </div>
    </>
  )
}

export default App
