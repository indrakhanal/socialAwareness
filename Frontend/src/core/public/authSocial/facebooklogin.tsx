import React from 'react'
// import {FacebookLogin} from 'react-facebook-login';

const responseFacebook = (response:any) =>{
    console.log(response);
}

const ReturnFacebookLogin = () =>{
<>
{/* <FacebookLogin
appId="552558393362364"
autoLoad={true}
fields="name,email,picture"
callback={responseFacebook}
cssClass="my-facebook-button-class"
icon="fa-facebook"
/> */}
<h1>Login</h1>
</>
}

export default ReturnFacebookLogin