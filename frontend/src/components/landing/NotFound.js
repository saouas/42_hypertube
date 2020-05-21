import React, { Component } from 'react';

class NotFound extends Component {

  render() {
    return( 
      <div className="not-found">
        <iframe 
          title='404y'
          width='1440' 
          height="880"
          src="https://www.youtube.com/embed/TSXXi2kvl_0?autoplay=1"
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          >
        </iframe>
      </div>
    );
  }
}
  
export default NotFound;