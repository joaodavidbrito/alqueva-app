import React from 'react'
import ReactDOM from 'react-dom';

import AlquevaApp from './components/AlquevaApp'

const App = () => {
    return (
        <div>
            <AlquevaApp />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
