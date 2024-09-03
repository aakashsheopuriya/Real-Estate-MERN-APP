import React from 'react'

export default function TextArea({className,onChange}) {
  return (
    <div>
        <textarea className={className} onChange={onChange}></textarea>
    </div>
  )
}
