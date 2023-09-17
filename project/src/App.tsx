import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from "./Routes/Cadastro/CadastroPage"
import Login from "./Routes/Login/LoginPage"
import DashboardPage from "./Routes/Dashboard/DashboardPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/dash" element={<DashboardPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
