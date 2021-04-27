import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        
        <Spinner animation="grow" variant="warning" role="status" style={{
            width:"100px",
            height:"100ox",
            margin:'auto',
            display:'block'


        }}>
            <span className="sr-only">Loading ..</span>
        </Spinner>
    )
}

export default Loader
