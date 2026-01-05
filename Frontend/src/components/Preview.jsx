import React from 'react'
import ReactMarkdown from 'react-markdown'
const Preview = (props) => {
  return (
    <div className='bg-linear-to-br from-slate-700 to-slate-800 rounded-xl  w-full p-5 border border-slate-500 shadow-lg flex flex-col gap-3'>


      <div>
        <h1 className='pb-2 border-b border-white/20 text-center tracking-wide text-lg font-semibold' >Preview</h1>
      </div>


     <div className='pb-2 text-center text-2xl wrap-break-words'>

     <ReactMarkdown>

      {props.heading}

     </ReactMarkdown>

     </div>
     

     <div className='prose prose-invert max-w-none text-slate-200 leading-relaxed break-words' >
      <ReactMarkdown >
          {props.text}
      </ReactMarkdown>
      </div>


    </div>
  )
}

export default Preview
