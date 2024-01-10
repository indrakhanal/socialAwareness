import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import AppBreadcrumb from './dropdown/index'
import AppHeaderDropdown from './dropdown/headerDropdown'
import logo from '../../../../assets/images/fav.png'

import { items, handleOnFocus, handleOnHover, handleOnSelect, formatResult } from './auto-searchbar/searchbar'
// import HandleSearch from './auto-searchbar/getSearchData'
import HandleOnSearch from './auto-searchbar/getSearchData'
const AppHeader = () => {
  const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
        // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" >
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/home" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            {/* <NavLink to={"/post"}>Create New Post</NavLink> */}
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink component={NavLink}>
            {/* Autocomplete search component calling here */}

            <div className="columns is-centered">
              <div className="column is-half search-bar" style={{ width: 400}}>
                <ReactSearchAutocomplete
                  items={items}
                  onSearch={HandleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  styling = {
                        {
                          clearIconMargin: '0px 0px 0 180px',
                          searchIconMargin: '0 0 0 -240px'
                        }
                  }
                  autoFocus
                  formatResult={formatResult}
                />
              </div>
            </div>


            {/* Autocomplete search end */}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>


        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
