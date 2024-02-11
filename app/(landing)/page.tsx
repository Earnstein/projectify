import { LandingContent } from '@/components/landing-content';
import { LandingHero } from '@/components/landing-hero';
import { LandingNavbar } from '@/components/landing-navbar';
import React from 'react'

const Landingpage = () => {
  return (
    <div className="h-full ">
    <LandingNavbar />
    <LandingHero />
    <LandingContent />
  </div>
  )
}

export default Landingpage;