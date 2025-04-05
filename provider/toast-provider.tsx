"use client"

import React from 'react'
import { Toaster } from 'sonner'

export const ToastProvider = () => {
  return (
    <Toaster 
        className='bg-neutral-100 shadow-lg'
        position='top-right'
    /> )
}
