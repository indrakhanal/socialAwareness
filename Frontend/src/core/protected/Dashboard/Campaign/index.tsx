import React, { ChangeEvent, Component, FormEvent } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import './style.css'
// import { Fade, Slide } from "react-reveal";

interface CampaignProps {
  data: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    phone: string;
    contactmessage: string;
  };
}

interface CampaignState {
  // Define any state properties if needed
}

class Campaign extends Component<CampaignProps,CampaignState> {
  constructor(props: CampaignProps) {
    super(props);
    // Initialize state if needed
    this.state = {};
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle input changes if needed
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Handle form submission if needed
    event.preventDefault();
    // Add your form submission logic here
  };

  render() {
    const { data } = this.props;

    if (!data) return null;

    const name = data.name;
    const street = data.address.street;
    const city = data.address.city;
    const state = data.address.state;
    const zip = data.address.zip;
    const phone = data.phone;
    const message = data.contactmessage;
    return (
        <section id="campaign">
        <div className="row" style={{ marginLeft: '200px' }}>
            <div className="eight columns">
                    <h1>CAMPAIGN</h1><br/>
                    <h3>COMING SOON!!</h3>
            </div>

        </div>
      </section>
    );
  }
}

export default Campaign;
