import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AboutClinic from './Pages/AboutClinic'
import ChooseHope from './Pages/ChooseHope'
import MedicalCondition from './Pages/MedicalCondition'
import JoinTeam from './Pages/JoinTeam'
import Layout from './components/Layout'
import AboutClinic2 from './Pages/AboutClinic2'
import JoinTeam2 from './Pages/JoinTeam2'
import JobApplication from './Pages/JobApplication'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/choose' element={<ChooseHope/>} />
        <Route path='/about' element={<AboutClinic/>} />
        <Route path='/about2' element={<AboutClinic2/>} />
        <Route path='/medicalconditions' element={<MedicalCondition/>} />
        <Route path='/joinparallelclinic' element={<JoinTeam/>} />
        <Route path='/joinparallelclinic2' element={<JoinTeam2/>} />
      </Routes>
    </Layout>
  )
}

export default App
