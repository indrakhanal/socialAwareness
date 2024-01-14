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
           
           
        <h2>INTRODUCTION</h2>
        <p>With a vision to promote awareness of social issues and facilitate a space for users to advocate causes and support small businesses, this application endeavors to empower individuals to make a positive impact on society.</p>
    <br /><br />
        <h2>PURPOSE</h2>
        <ul>
            <li><strong>Raise Social Awareness:</strong> The platform serves as a hub for users to discover, create, and participate in various social causes,allowing them to champion issues close to their hearts and drive awareness for impactful change.</li>
            <li><strong>Promote Small Businesses:</strong> Alongside supporting causes, the application provides a platform for small business owners to showcase their services, gain exposure, and connect with potential customers, fostering economic growth within communities.</li>
        </ul>
    
            

        </div>
      </section>
    );
  }
}

export default Campaign;
