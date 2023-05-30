import React from 'react'

const Privacy = () => {
  return (
    <div className='w-full p-12'>
      <div className='container h-[40rem]'>
        <h1><a href='https://drive.google.com/file/d/1FVCJjlZqYBwYL0YHpC3zGTxkB4QcTYm1/view?usp=sharing' target='_blank' rel='noreferrer'>Privacy Policy</a></h1>
        <iframe src="/Privacy.pdf" width='100%' height='90%' title="RythmHacks Privacy Policy"></iframe>
      </div>
      <div className='container mt-4 h-[40rem]'>
        <h1><a href='https://drive.google.com/file/d/1sXeEnqkOJ4JhZK1KFq8T0NdTqIUpKsM5/view?usp=sharing' target='_blank' rel='noreferrer'>Cookie Policy</a></h1>
        <iframe src="/Cookies.pdf" width='100%' height='90%' title="RythmHacks Cookie Policy"></iframe>
      </div>
    </div>
  )
}

export default Privacy