import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation} from 'react-router-dom'
function Footer() {
    const loaction = useLocation() 
    return (
        <footer style={{borderTop: "1px solid #dedede", marginTop: "20px", paddingTop: "20px"}}>
            <p>Test vesion 1.0.0</p>   
            { loaction.pathname !== '/about' ? <Link to="/about">About</Link> : <Link to="/">Home</Link>}
        </footer>
    )
}

export default Footer
