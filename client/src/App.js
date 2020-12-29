import './App.css';
import SocketClient from './testing/SocketClient.js'
import Login from './testing/Login.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={SocketClient} />
    </Router>
  )
}

export default App;
