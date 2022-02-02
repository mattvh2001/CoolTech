import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Repositories.css';
import jwt_decode from "jwt-decode";
import Links from './Links';


class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = {
        pageHasloaded:false,
        token:sessionStorage.getItem('token'),
        currentUser:{
        }, 
        }   
    }
     

decipher(){
    var decoded = jwt_decode(this.state.token);
    console.log(decoded)
    this.setState({currentUser:decoded})
    console.log(decoded);
}

componentDidMount(){
    //jwt.verify(this.state.token,'jwt-secret',function(err,decoded){});
    
    this.decipher()
    this.setState({pageHasloaded:true})
    console.log(this.state.pageHasloaded)
}


handleDivisionType = (object) =>{   
    sessionStorage.setItem('divisionType', JSON.stringify(object))
}
    
    render() {
        if(this.state.token === null){
            return (<Redirect to = "/"/>)
          }
        let heading;
        let users;
        let divRepos
        //const decoded = jwt.verify(token, 'jwt-secret')
        if(this.state.pageHasloaded){
            divRepos = this.state.currentUser.organisational_units.map((ou,i) =>
            <ul key = {"ou"+i}>  
                <h3 >{ou}</h3>
                <li>{this.state.currentUser.divisions.map((div,i2) =>
                    <ul key = {"div"+i2}>
                        <li><Link  className = "repLinks" to = {{pathname:"/division"}} onClick = {(e) => this.handleDivisionType({organisational_units:ou,divisions:div})}>{div}</Link></li>
                    </ul>
                    )}
                </li> 
            </ul>
        )
        
        if(this.state.currentUser.role === "admin"){
            
            users = this.state.currentUser.organisational_units.map((ou,i) =>               
                    <ul key = {"ouAdmin"+i}>
                        <h3 >{ou}</h3>
                        <li >{this.state.currentUser.divisions.map((div,i2) =>
                            <ul key ={"divAdmin"+i2}>
                                <li ><Link key = {"link"+i2} className = "repLinks" to = {{pathname:"/userDivision"}} onClick = {(e) => this.handleDivisionType({organisational_units:ou,divisions:div})} >{div}</Link></li>
                            </ul>
                            )}
                        </li>
                    </ul>       
            )
            heading = (<h2 className = "repHeading">Users</h2>)
                            
        }
    }       
        return (
            <div>
                <Links isDiv = {false}/>
                <h2 className = "repHeading">Credentials</h2>
                <div className='listContainer2'>
                    {divRepos}
                </div>
                {heading}
                <div className='listContainer2'>
                    {users}
                </div>
                
            </div>
        );
    }
}

export default Repositories;