import React from 'react'

export default function TextArea({value,className,onChange,placeholder}) {
  return (
    <div>
        <textarea className={className} onChange={onChange} placeholder={placeholder} value={value}></textarea>
    </div>
  )
}
