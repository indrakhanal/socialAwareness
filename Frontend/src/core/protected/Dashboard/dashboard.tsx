import React, {Suspense, Component } from 'react'
import AppHeader from './Header/Header'
// import Sidebar from './Sidebar/sidebar'
import AppFooter from './Footer/footer'
// import "../../../assets/dashboard/scss/style.scss"
import FallbackLoader from '../../../components/React/FallBackLoader/FallBackLoader'
// import AppContent from './AppContent'
import routes from '../../../routes/routes'
import {Route, Routes } from 'react-router-dom'
import ReactGA from "react-ga"
import $ from "jquery"

interface AppProps {}

interface AppState {
  foo: string;
  siteData: Record<string, any>;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      foo: "bar",
      siteData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./siteData.json",
      dataType: "json",
      cache: false,
      success: (data) => {
        console.log(data, "hello data ")
        this.setState({ siteData: data });
      },
      error: (xhr, status, err) => {
        console.log(err);
      },
    })
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <Suspense fallback={<FallbackLoader/>}>
      <div className="App">
          <AppHeader data={this.state.siteData.main} />
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
          <AppFooter />
        </div>
      </Suspense>
    )
  }
}

export default App;

