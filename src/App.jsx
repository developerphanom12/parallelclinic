import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AboutClinic from './Pages/AboutClinic'
import ChooseHope from './Pages/ChooseHope'
import MedicalCondition from './Pages/MedicalCondition'
import JoinTeam from './Pages/JoinTeam'
import Layout from './components/Layout'
import AboutClinic2 from './Pages/AboutClinic2'
import JoinTeam2 from './Pages/JoinTeam2'
import JoinClinic from './Pages/JoinClinic'
import JoinClinic2 from './Pages/JoinClinic2'
import JoinClinic3 from './Pages/JoinClinic3'
import JoinClinic4 from './Pages/JoinClinic4'
import JoinClinic5 from './Pages/JoinClinic5'
// import JobApplication from './Pages/JobApplication'

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path='/' element={<Home/>} /> */}
        {/* <Route path='/choose' element={<ChooseHope/>} /> */}
        <Route path='/' element={<AboutClinic/>} />
        <Route path='/about' element={<AboutClinic/>} />
        <Route path='/about2' element={<AboutClinic2/>} />
        <Route path='/medicalconditions' element={<MedicalCondition/>} />
        <Route path='/joinparallelclinic' element={<JoinClinic/>} />
        <Route path='/joinparallelclinic/clinicdirector' element={<JoinClinic2/>} />
        <Route path='/joinparallelclinic/medicalconsultants' element={<JoinClinic3/>} />
        <Route path='/joinparallelclinic/medicalteleconsultants' element={<JoinClinic4/>} />
        <Route path='/joinparallelclinic/pharmacists' element={<JoinClinic5/>} />
      </Routes>
    </Layout>
  )
}

export default App
