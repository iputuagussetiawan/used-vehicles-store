import { UserButton } from '@clerk/nextjs'
import React from 'react'
import BannerContainer from './_components/banner-container'
import ServicesContainer from './_components/service-container'
import SubscribeNow from './_components/subscribe-now'
import WhyChooseUsContainer from './_components/why-choose-us'

const Homepage = () => {
  return (
    <div className='flex-col my-12'>
      {/* Banner */}
      <BannerContainer/>
      {/* Services */}
      <ServicesContainer/>
      {/* Subscribe */}
      <SubscribeNow/>
      {/* Why Us */}
      <WhyChooseUsContainer/>
    </div>
  )
}

export default Homepage