import { UserButton } from '@clerk/nextjs'
import React from 'react'
import BannerContainer from './_components/banner-container'
import ServicesContainer from './_components/service-container'

const Homepage = () => {
  return (
    <div className='flex-col my-12'>
      {/* Banner */}
      <BannerContainer/>
      {/* Services */}
      <ServicesContainer/>
      {/* Subscribe */}
      {/* Why Us */}
    </div>
  )
}

export default Homepage