import React from 'react'
import ReactMarkdown from 'react-markdown'
const Preview = (props) => {
  return (
    <div className='bg-slate-600 h-14/45 w-1/2 px-4 text-white  border-r-4 border-8 border-slate-400 flex flex-col gap-3'>


      <div>
        <h1 className='pb-2 border-b border-white/40 text-center text-xl font-bold' >Preview</h1>
      </div>


     <div className='pb-2 text-center text-xl font-bold'>

     <ReactMarkdown>

      {props.heading}

     </ReactMarkdown>

     </div>
     

     <div >
      <ReactMarkdown >
          {props.text}
      </ReactMarkdown>
      </div>


    </div>
  )
}

export default Preview
