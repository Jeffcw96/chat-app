import './App.css';
import SocketClient from './components/SocketClient.js'
import Login from './components/Login.js'
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
