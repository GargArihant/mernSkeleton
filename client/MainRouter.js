import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home'
const MainRouter = () => {
 return ( <div>
 <Routes>
 <Route  element={<Home/>} />
 <Route path='/users'  element={<Users/>}/>
 </Routes>
 </div>
 )
}
export default MainRouter
