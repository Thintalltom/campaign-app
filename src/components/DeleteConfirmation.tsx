import React from "react"

export default function () {
  return (
    <div className="confirm-delete-cont">
      <p className="delete-text">Stop Campaign</p>
      <p className="delete-body-text">
        Are You sure you want to delete MTN campaign? This action cannot be
        undone.
      </p>
      <div className="delete-btns">
        <button className="cancel-delete">Cancel</button>
        <button className="delete">Delete Campaign</button>
      </div>
    </div>
  )
}
