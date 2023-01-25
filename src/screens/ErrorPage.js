import React from 'react'
import '../screens/styles/main.scss';

function ErrorPage() {
  return (
    <div className="error-container">  
       <h1>Oops!</h1>
       <p>Sorry, an unknown error occurred</p>
       <p style={{ color : 'grey'}}>Not found</p>
    </div>
  )
}

export default ErrorPage