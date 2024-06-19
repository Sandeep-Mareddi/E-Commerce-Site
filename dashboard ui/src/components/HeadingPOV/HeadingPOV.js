import React, { useState } from 'react';
import './HeadingPOV.css';

export default function HeadingPOV() {

  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
      <div className="row headingpov">
        
        <div className="col-md-4">
          <div className="headingpov-heading">
            <h2>Heading 1 - Point of View</h2>
          </div>
        </div>

        <div className="col-md-8">
          <div className="headingpov-body">
            {isOpen ? (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet vehicula velit sit amet auctor. Vestibulum mollis sollicitudin rhoncus. Integer finibus malesuada turpis non semper. Mauris ut sem feugiat, pellentesque felis vitae, pretium nibh. Quisque suscipit metus et augue sodales, quis condimentum est consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed ligula vel mi molestie ullamcorper. Suspendisse bibendum erat sed faucibus tincidunt.
                  <button type='button' className='btn btn-link text-decoration-none hpov-link' onClick={handleToggle}>
                    Read less
                  </button>
                </p>
              </>
            ) : (
              <>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet vehicula velit sit amet auctor. Vestibulum mollis sollicitudin rhoncus. Integer finibus malesuada turpis non semper. Mauris ut sem feugiat, pellentesque 
                  <button type='button' className='btn btn-link text-decoration-none hpov-link' onClick={handleToggle}>
                    Read more
                  </button>
                </p>
              </>
            )}
          </div>
        </div>

    </div>
  )
}