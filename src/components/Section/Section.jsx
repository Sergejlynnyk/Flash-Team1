import React from 'react'
import "./Section.scss"
const Section = ({children, title}) => {
  return (
      <div className="container">
      <div className="section">
        <div className="section-header">
          <h1 className="section-title">{title}</h1>
        </div>
        <div className="section-content">
          <div className="section-list">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section