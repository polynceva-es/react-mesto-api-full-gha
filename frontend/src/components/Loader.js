import React from "react";

function Loader(props) {
  const loaderOverlayClassName = (`loader__overlay ${props.isLoader && 'loader__overlay_active'}`)
  const loaderClassName = (`loader ${props.isLoader && 'rotation'}`)  
  return (
    <div className= {loaderOverlayClassName}>
        <div className={loaderClassName}></div>
    </div>
  )
}

export default Loader