import React, {Suspense} from 'react'
import AppHeader from './Header/Header'
import Sidebar from './Sidebar/sidebar'
import AppFooter from './Footer/footer'
import "../../../assets/dashboard/scss/style.scss"
import FallbackLoader from '../../../components/React/FallBackLoader/FallBackLoader'
// import AppContent from './AppContent'
import routes from '../../../routes/routes'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreatePost from '../PostDetails/addPost'


const Dashboard = () => {
  return (
    <Suspense fallback={<FallbackLoader/>}>
    <div>
      <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {/* <AppContent /> */}

          <Routes>
          {routes.map((route, idx) => {
            return (
              route.path && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.component />}
                />
              )
            )
          })}
          {/* <Route path="/" element={<CreatePost />} /> */}
          {/* <Route path="#post" element={<CreatePost />} /> */}

        </Routes>
         
        </div>
        <AppFooter />
      </div>
    </div>
    </Suspense>
  )
}

export default Dashboard;
