
function Button({title , svg , setshowUsersSidebar}) {
  let buttonPrimaryStyle = {
     backgroundColor : '#282626',
     padding : '.5rem .75rem',
     width : '90px',
     display : 'inline-flex',
     justifyContent : 'space-between',
     alignItems : 'center',
     color : '#fff',
     fontWeight : 'bold',
     borderRadius : '5px',
     border : 'none',
     cursor : 'pointer',
     opacity : '.7',
     transition : 'opacity .3s ease'
  } 
  
  const handleMouseEnter = function(e) {
      e.target.style.opacity = '1'
  }

  const handleMouseLeave = function(e) {
    e.target.style.opacity = '.7'
  }
  
  return (
    <button onClick={() => setshowUsersSidebar && setshowUsersSidebar(true)} className="button-primary" style={buttonPrimaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       <span>{svg}</span>
       <span>{title}</span>
    </button>
  );
}

export default Button;