import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import "./Links.css"

class Links extends Component {

    handleSignOut = () =>{
        sessionStorage.clear();
    }
    render() {

        if (this.props.isDiv){
            return(<div className = "navigationContainer">
            <Link className='navigation' to = {{pathname:"/"}}  onclick = {this.handleSignOut}>Sign Out</Link>
        </div>)
        }else{
            return (
            <div className = "navigationContainer">
               <Link className='navigation' to = {{pathname:"/"}} onclick = {this.handleSignOut}>Sign Out</Link>
                <Link className='navigation' to = "/repos">Repositories</Link>
            </div>
        );
    }
    }
}

export default Links;