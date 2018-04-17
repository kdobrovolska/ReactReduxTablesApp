import React from 'react'
import ReactDom from 'react-dom'

const Info=(props)=>(
    <div>
    <h1>Info</h1>
    <p>This is info:{props.info}</p>
    </div>
);

const WithAdminWarning=(WrappedComponent)=>{
    return (props)=>(
        <div>
        {props.isAdmin && <p>This is private info</p>}
        <WrappedComponent {...props}/>
        </div>
    );
};
const RequireAuthentication=(WrappedComponent)=>{
    return (props)=>(
        <div>
        {props.isAuthenticated ? <WrappedComponent {...props}/>:<p>You are not athenticated</p>}
        </div>
    );
};
const AdminInfo=WithAdminWarning(Info);
const AuthenticateInfo=RequireAuthentication(Info);
//ReactDom.render(<AdminInfo isAdmin={true} info='There are the details'/>,document.getElementById('app'));
ReactDom.render(<AuthenticateInfo isAuthenticated={false} info='There are the details'/>,document.getElementById('app'));