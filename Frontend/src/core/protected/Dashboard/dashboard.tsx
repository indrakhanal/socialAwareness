import React, {Suspense, Component } from 'react'
import AppHeader from './Header/Header'
import Contact from './Contact/index'
import Campaign from './Campaign/index'
import MultitabBody from './Tabs/index'
import AppFooter from './Footer/footer'
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
      <div className="App">
          <AppHeader data={this.state.siteData.main} />
          <MultitabBody />
          <Campaign data={this.state.siteData.main} />
          <Contact data={this.state.siteData.main} />
          {/* <AppFooter /> */}
        </div>
    )
  }
}

export default App;

