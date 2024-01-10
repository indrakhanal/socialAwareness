import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import AppSidebarNav from './sideNavBar'

// import { logoNegative } from '../../../../assets/dashboard/brand/logo'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { NavLink, Link } from 'react-router-dom'

// sidebar nav config
// import navigation from './nav'
// import CategoryList from './nav'



const AppSidebar = () => {
  const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    
    <CSidebar
      position="fixed"
      // unfoldable={unfoldable}
      // visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex">
        <CIcon className="sidebar-brand-full" height={35} /> 
        <CIcon className="sidebar-brand-narrow" height={35} />
        Pet App Dashboard
      </CSidebarBrand>

      <CSidebarNav>
      <CNavTitle>Pet Categories</CNavTitle>

        <SimpleBar>
          <AppSidebarNav />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>

  )
}

export default React.memo(AppSidebar)
