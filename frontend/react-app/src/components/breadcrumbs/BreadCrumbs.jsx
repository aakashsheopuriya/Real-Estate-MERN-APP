import { Breadcrumb } from 'antd'
import React from 'react'

export default function BreadCrumbs({items}) {
  return (
    <div>
        <Breadcrumb items={items}/>
    </div>
  )
}
