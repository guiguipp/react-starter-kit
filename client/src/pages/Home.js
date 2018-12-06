import React, {Component} from "react";
import logo from '../../src/assets/logo.svg';

class App extends Component {
    
    render() {
        return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/Home.js</code> and save to reload.
                </p>
            </header>
        </div>
        );
    }
}

export default App;
