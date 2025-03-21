"use client"

import Image from 'next/image'
import React from 'react'

const LogoContainer = ({isFooter}:{isFooter?:boolean}) => {
    return (
        <Image 
            src={isFooter?"/assets/logo-dark.png":"/assets/logo.png"} 
            width={120} 
            height={120} 
            alt='logo' 
            className='object-contain'
            property='logo'
        />   
        )
        
}

export default LogoContainer