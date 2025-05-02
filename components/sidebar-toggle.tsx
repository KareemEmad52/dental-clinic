"use client"

import React from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { useSidebar } from './ui/sidebar'

const SideBarToggleIcon = () => {
  const { toggleSidebar } = useSidebar()


  return (
    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none
          cursor-pointer ease-in-out focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-12 w-12 px-0"
      onClick={toggleSidebar}>
      <MdOutlineMenu className="h-8! w-8!" />
    </div>
  )
}

export default SideBarToggleIcon