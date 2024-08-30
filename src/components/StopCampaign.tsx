import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '@styles/StopCampaign.css'

export default function StopCampaign() {
  return (
    <div className="checked-div delete-div">
      <p className="camp-delete">Stop Campaign</p>
      <p className="checked-text delete-text">
        Are You sure you want to delete MTN campaign? This action cannot be
        undone.
      </p>
      <div className="stop-btns">
      <Link to="/campaign">
          {' '}
          <button className=" cancel-camp-btn">cancel</button>
        </Link>{' '}
        <Link to="/campaign">
          {' '}
          <button className=" delete-camp-btn">Delete Campaign</button>
        </Link>{' '}
       
      </div>
    </div>
  )
}
