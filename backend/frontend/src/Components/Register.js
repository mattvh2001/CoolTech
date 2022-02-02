import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './Login.css'



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
        postBody:{
            username:"username",
            password:"password",
            organisational_units:[],
            divisions:[],
            role: "standard"
            },
        user:{},
        redirect:false
        }    
    }
    //registers a new user
    registerUser = (event) => {
      // Default options are marked with 
      event.preventDefault()
      console.log("tried to fetch")
      fetch('/registration', {
          method: "POST",
          headers: {
          "Content-Type": "application/json"   
        },
        body: JSON.stringify(this.state.postBody), // body data type must match"Content-Type" header
        })
        .then(response => response.json())
        .then(
          (result) => {
            
          if(result.message === "Registration successful!"){
            console.log(result.message); 
            if(this.props.redirectToLogin){
              this.setState({redirect: true});
            }
          }else if(result.message === "Username taken"){

          }
        },
          (error) => {
          this.setState({
          isLoaded: true,
          error
          });
        }) 
    }

    
      
    //updates the username property in the postBody state upon change of its corresponding input field 
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

      //adds or deletes "News Management" to the organisational_unit array in the postBody state upon change of its corresponding checkbox 
      handle_news_OU_change = (event) => {

        if(event.target.checked){

          let placeholderArr = this.state.postBody.organisational_units;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              organisational_units: placeholderArr,
            } 
          });

        }else{

          if(this.state.postBody.organisational_units.includes("News management")){
            let placeholderArr2 = this.state.postBody.organisational_units;
            var itemIndex = placeholderArr2.indexOf("News management");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
                postBody: {
                  ...this.state.postBody,
                  organisational_units: placeholderArr2,
                } 
            });
          
          }
        } 
      }

      //adds or deletes "Hardware Reviews" to the organisational_unit array in the postBody state upon change of its corresponding checkbox 
      handle_hardware_OU_change = (event) => {
        
        if(event.target.checked){

          let placeholderArr = this.state.postBody.organisational_units;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              organisational_units: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.organisational_units.includes("Hardware reviews")){
            let placeholderArr2 = this.state.postBody.organisational_units;
            var itemIndex = placeholderArr2.indexOf("Hardware reviews");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
                postBody: {
                  ...this.state.postBody,
                  organisational_units: placeholderArr2,
                } 
            });
          
          }
        } 
      }

      //adds or deletes "Software reviews" to the organisational_unit array in the postBody state upon change of its corresponding checkbox 
      handle_software_OU_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.organisational_units;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              organisational_units: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.organisational_units.includes("Software reviews")){
            let placeholderArr2 = this.state.postBody.organisational_units;
            var itemIndex = placeholderArr2.indexOf("Software reviews");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
                postBody: {
                  ...this.state.postBody,
                  organisational_units: placeholderArr2,
                } 
            });
          
          }
        } 
      }

      //adds or deletes "Opinion publishing" to the organisational_unit array in the postBody state upon change of its corresponding checkbox 
      handle_opinion_OU_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.organisational_units;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              organisational_units: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.organisational_units.includes("Opinion publishing")){
            let placeholderArr2 = this.state.postBody.organisational_units;
            var itemIndex = placeholderArr2.indexOf("Opinion publishing");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
                postBody: {
                  ...this.state.postBody,
                  organisational_units: placeholderArr2,
                } 
            });
          }
        } 
      }

      //adds or deletes "Human Resources" to the division array in the postBody state upon change of its corresponding checkbox
      handle_human_division_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.divisions;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              divisions: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.divisions.includes("Human Resources")){
            let placeholderArr2 = this.state.postBody.divisions;
              var itemIndex = placeholderArr2.indexOf("Human Resources");//get item index
              placeholderArr2.splice(itemIndex, 1);

              this.setState({          
                postBody: {
                  ...this.state.postBody,
                  divisions: placeholderArr2,
                } 
              });
            }
        } 
      }

      //adds or deletes "Finance" to the division array in the postBody state upon change of its corresponding checkbox
      handle_finance_division_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.divisions;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              divisions: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.divisions.includes("Finance")){
            let placeholderArr2 = this.state.postBody.divisions;
              var itemIndex = placeholderArr2.indexOf("Finance");//get item index
              placeholderArr2.splice(itemIndex, 1);

              this.setState({          
                postBody: {
                  ...this.state.postBody,
                  divisions: placeholderArr2,
                } 
              });
            }
        } 
      }
      

      //adds or deletes "Technical support" to the division array in the postBody state upon change of its corresponding checkbox
      handle_technical_division_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.divisions;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              divisions: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.divisions.includes("Technical support")){
            let placeholderArr2 = this.state.postBody.divisions;
            var itemIndex = placeholderArr2.indexOf("Technical support");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
              postBody: {
                ...this.state.postBody,
                divisions: placeholderArr2,
              } 
            });
          }
        } 
      }

      //adds or deletes "Content" to the division array in the postBody state upon change of its corresponding checkbox
      handle_content_division_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.divisions;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              divisions: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.divisions.includes("Content")){
            let placeholderArr2 = this.state.postBody.divisions;
            var itemIndex = placeholderArr2.indexOf("Content");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
              postBody: {
                ...this.state.postBody,
                divisions: placeholderArr2,
              } 
            });
          }
        } 
      }

      //adds or deletes "Marketing" to the division array in the postBody state upon change of its corresponding checkbox
      handle_marketing_division_change = (event) => {
        if(event.target.checked){

          let placeholderArr = this.state.postBody.divisions;
          placeholderArr.push(event.target.value);
          this.setState({          
            postBody: {
              ...this.state.postBody,
              divisions: placeholderArr,
            } 
          });

        }else{
          
          if(this.state.postBody.divisions.includes("Marketing")){
            let placeholderArr2 = this.state.postBody.divisions;
            let itemIndex = placeholderArr2.indexOf("Marketing");//get item index
            placeholderArr2.splice(itemIndex, 1);

            this.setState({          
              postBody: {
                ...this.state.postBody,
                divisions: placeholderArr2,
              } 
            });
          }
        } 
      }

    render() {

      if(this.state.redirect){
        return(<Redirect to = "/" />)
      }
        return (
            <div className = "centerContainer">
                
                <div className = "center">
                <h1>Register</h1>
                <form>
                <div className="txt_field">
                        <input type="text" required value = {this.state.postBody.username} onChange={this.handleUsernameChange}/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required value = {this.state.postBody.password} onChange={this.handlePasswordChange}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                <div className = "checks">
                  <h2>Organisation Units</h2>
                    <div>
                      <label>News Management</label>
                      <input type ="checkbox" onChange={this.handle_news_OU_change} value="News Management"/>
                    </div>
                    <div>
                      <label>Software Reviews</label>
                      <input type ="checkbox"  onChange={this.handle_software_OU_change} value="Software Reviews"/>
                    </div>
                    <div>
                      <label>Hardware Reviews</label>
                      <input type ="checkbox" onChange={this.handle_hardware_OU_change} value = "Hardware Reviews"/>
                    </div>
                    <div>
                      <label>Opinion Publishing</label>
                      <input type ="checkbox" onChange={this.handle_opinion_OU_change} value = "Opinion Publishing"/>
                    </div>
                    <h2>Divisions</h2>
                    <div>
                    <label>Human Resources</label>
                    <input type ="checkbox" onChange={this.handle_human_division_change} value = "Human Resources"/>
                    </div>
                    <div>
                    <label>Finance</label>
                    <input type ="checkbox" onChange={this.handle_finance_division_change} value = "Finance"/>
                    </div>
                    <div>
                      <label>Technical Support</label>
                      <input type ="checkbox" onChange={this.handle_technical_division_change} value = "Technical Support"/>
                    </div>
                    <div>
                      <label>Content</label>
                      <input type ="checkbox" onChange={this.handle_content_division_change} value = "Content"/>
                    </div>
                    <div>
                      <label>Marketing</label>
                      <input type ="checkbox" onChange={this.handle_marketing_division_change} value = "Marketing"/>
                    </div>
                </div>
                <input type="submit" value ="submit" onClick={this.registerUser}/>
                </form>
                </div>
            </div>
        );
    }
}

export default Register;