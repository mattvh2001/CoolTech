import React, { Component } from 'react';
import './Login.css'
import {Link,Redirect} from 'react-router-dom';


class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
        postBody:{
            username:"username",
            password:"password"
            },
        authorized:false,
        token:null,
        message:null,
        redirect:false
          
        }    
    }

    loginUser = (event) => {
      event.preventDefault()
        // Default options are marked with 
        console.log("tried to fetch")
      fetch('/login', {
            method: "POST",
            headers: {
            "Content-Type": "application/json"   
          },
          body: JSON.stringify(this.state.postBody), // body data type must match "Content-Type" header
          })
          .then(response => response.json())
          .then(
            (result) => {
              console.log(result)
              if(result.auth === true){
                this.setState({
                  username: result.username,
                  token: result.token,
                  authorized: result.auth,
                  message:null
                });
                sessionStorage.setItem('token', result.token);
                this.setState({redirect:true})
              }else{
                this.setState({message:result.message});
              }
          },
            (error) => {
            this.setState({
            error
            });
          }) 
        }

    //updates the username in the postBody state upon change of its corresponding input field 
    handleUsernameChange = (event) => {
        this.setState({          
          postBody: {
            ...this.state.postBody,
            username: event.target.value,
          } 
        });
      }

    //updates the password property in the postBody state upon change of its corresponding input field 
    handlePasswordChange = (event) => {
        this.setState({          
          postBody: {
            ...this.state.postBody,
            password: event.target.value,
          } 
        });
      }
      
    render() {
      let errormsg
      if(this.state.redirect){
        return(<Redirect to = "/repos" />)
      }
      if(this.state.message != null){
        errormsg = <h2 style={{color:'red'}}>{this.state.message}</h2>
      }
        return (
            <div className='centerContainer'>
                {errormsg}
                <div className = "center">
                  <h1>Login</h1>
                <form>
                
                    <div className="txt_field">
                        <input type="text" required onChange={this.handleUsernameChange} value = {this.state.username}/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required onChange={this.handlePasswordChange}  value = {this.state.password}/>
                        <span></span>
                        <label>Password</label>
                    </div>

                <input type="submit" value ="submit" onClick={this.loginUser}/>
                </form>
                <div className = "resDiv">
                <p>Don't have an account?</p>
                <Link to = "/register"><button>Register Here</button></Link>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;