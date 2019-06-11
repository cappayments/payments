import React from 'react'
import Routes from './routes'
import {Navbar} from './components'

const App = () => {
    return (
        <div>
            <Navbar/>
            <div style={{margin: "5%"}}>
                <Routes/>
            </div>
        </div>
    )
}

export default App