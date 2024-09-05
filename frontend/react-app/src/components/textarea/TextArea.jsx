import React from 'react'

export default function TextArea({className,onChange,placeholder}) {
  return (
    <div>
        <textarea className={className} onChange={onChange} placeholder={placeholder}></textarea>
    </div>
  )
}
