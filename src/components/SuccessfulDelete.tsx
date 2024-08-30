import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '@styles/SuccessfulDelete.css'

export default function SuccessfulDelete() {
  return (
    <div className="checked-div delete-div">
      <p className="camp-delete">Campaign Delete</p>
      <p className="checked-text delete-text">MTN campaign has been deleted</p>
      <Link to="/campaign">
        
        <button className="checked-btn delete-btn">
          Go Back to campaign list
        </button>
      </Link>
    </div>
  )
}
