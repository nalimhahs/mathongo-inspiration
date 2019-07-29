import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAB from '../components/FAB'
import MainWrapper from '../components/MainWrapper'

export default function MainView() {
  return (
    <>
      <Navbar />
      <MainWrapper/>
      <FAB />
      <Footer />
    </>
  )
}
