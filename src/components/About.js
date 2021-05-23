import { Link } from 'react-router-dom'
function About() { 
    return (
        <div>
            <p> Created for Trainning purpose</p>
            <br></br>
            <p> Developed following principles</p>
            <p style={{paddingLeft: "30px"}}><ul>
                <li>Components</li>
                <li>Routes</li>
                <li>Props</li>
                <li>Fetch API</li>
                <li>CURD operations</li>
                <li>Hooks ex: setState, useEffect, useRefs</li>
            </ul>
            </p>
            <p style={{textAlign: "center"}}><Link to="/">Back</Link> </p>

        </div>
    )
}

export default About
