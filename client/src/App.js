import './App.css';
import SocketClient from './components/SocketClient.js'
import Main from './components/MainPage/Main.js'
import Chat from './components/ChatPage/Chat'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default App;
