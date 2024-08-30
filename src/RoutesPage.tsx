import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CampaignProvider } from '@/context/CampaignContext'
import Dashboard from '@/screens/Overview'
import NewCampaign from '@/screens/NewCampaign'
import Campaign from '@/screens/Campaign'
import EditCampaign from '@/screens/EditCampaign'
import GrandLayout from './grandLayout/GrandLayout'
import Overview from '@/screens/Overview'

const RoutesPage = () => {
  return (
    <CampaignProvider>
      <Router>
        <GrandLayout >
        <Routes>
          <Route path="/" element={<Overview />} />
            <Route path="/new" element={<NewCampaign />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/edit-campaign/:id" element={<EditCampaign />} />
        </Routes>
          </GrandLayout >
      </Router>
    </CampaignProvider>
  
  )
}

export default RoutesPage