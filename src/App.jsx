import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AboutClinic from './Pages/AboutClinic'
import ChooseHope from './Pages/ChooseHope'
import MedicalCondition from './Pages/MedicalCondition'
import JoinTeam from './Pages/JoinTeam'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/choose' element={<ChooseHope/>} />
        <Route path='/about' element={<AboutClinic/>} />
        <Route path='/medicalconditions' element={<MedicalCondition/>} />
        <Route path='/joinparallelclinic' element={<JoinTeam/>} />
      </Routes>
    </Layout>
  )
}

export default App
