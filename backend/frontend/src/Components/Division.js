import React, { Component } from 'react';
import './Division.css';
//import  {all_divisions, all_organisational_units, decipher} from './ArrayUnits';
import AddCredential from "./AddCredential";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import Links from './Links';

class Division extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    users:[],
    addOrganisationalUnits:[],
    addDivisions:[],
    pageLoaded:false,
    currentUser:{
        username:"username",
        password:"password",
        role: "admin"
        },
    authorized:false,
    token:sessionStorage.getItem('token'),
    message:null,
    }    
}
componentDidMount() {
    console.log("tried to fetch div")
    var decoded = jwt_decode(this.state.token);
    this.setState({currentUser:decoded})
  //fetches credential data from the /credentials/division endpoint
  fetch('/credentials/division', {
          method:"POST",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token
        },
        body:sessionStorage.getItem('divisionType')
      })
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
          if(true){   
            let addOrganisationalUnitsPlaceholder = [];
            let addDivisionsPlaceholder = [];

            for (let i = 0; i <= result.length; i++) { 
              addOrganisationalUnitsPlaceholder.push("Add Here");
              addDivisionsPlaceholder.push("Add here");
            }
            this.setState({
              addOrganisationalUnits : addOrganisationalUnitsPlaceholder,
              addDivisions : addDivisionsPlaceholder,
              users: result, 
              pageLoaded:true    
            }); 
            
          }else{
            //this.setState({message:result.message});
          }
      },
        (error) => {
          console.log("error")
          console.log(error);
        this.setState({
        error
        });
      }) 
    }
    //updates credential fields
    putCred = (username,data) => {
      // Default options are marked with      
      console.log("tried to fetch")
      fetch('/credentials/'+ username, {
          method: "PUT",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.token  
        },
        body: JSON.stringify(data), // body data type must match"Content-Type" header
        })
        .then(response => response.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              users: result
          }); 
          //this.props.history.push("/");     
        },
          (error) => {
          this.setState({
          isLoaded: true,
          error
          });
        }) 
    }
    //updates the password property in the postBody state upon change of its corresponding input field 
    handlePaswordChange = (e,index) =>  {
      // 1. Make a shallow copy of the items
      let users = [...this.state.users];
      console.log(users);
      // 2. Make a shallow copy of the item to be mutated
      let user = {...users[index]};
      console.log(user)
      // 3. Replace the property that needs to be changed
      user.password = e.target.value;
      // 4. Replace the original object in the users array
      users[index] = user;
      this.setState({users: users});
    }
    //updates the service property in the postBody state upon change of its corresponding input field 
    handleServiceChange = (e,index) =>  {
      let users = [...this.state.users];
      console.log(users);
      // 2. Make a shallow copy of the item to be mutated
      let user = {...users[index]};
      console.log(user)
      // 3. Replace the property that needs to be changed
      user.service = e.target.value;
      // 4. Replace the original object in the users array
      users[index] = user;
      this.setState({users: users});
    }
    //commits the edited data to the database by calling a PUT function to update it
    handleIconClick = (username,field,index) =>{
      console.log("this is " + username)
      if(field === "password"){
        console.log("Edit item" + this.state.users[index].password)
        this.putCred(username,{password: this.state.users[index].password});      
      }else if(field === "service"){
        console.log("Edit item" + this.state.users[index].service);
        this.putCred(username,{role:this.state.users[index].service});
      }
    }
    //deletes elements from the organisational units and divisions arrays in a specific user object
    deleteArrayItem = (userIndex,spliceIndex,arrayType) =>  {
      if(arrayType === "ou"){
        // 1. Make a shallow copy of the items
        let users = [...this.state.users];
        console.log(users);
        // 2. Make a shallow copy of the item to be mutated
        let user = {...users[userIndex]};
        // 3. Make a copy of the array
        let new_organisational_units = user.organisational_units; 
        // 4. Push new value to the array
        new_organisational_units.splice(spliceIndex,1);    
        // 5. Replace the original array
        user.organisational_units = new_organisational_units;
        // 6. Replace the original object in the users array
        users[userIndex] = user;
        this.setState({users: users});
        this.putCred(this.state.users[userIndex].username,{organisational_units: new_organisational_units})
      }
      else if(arrayType === "div"){
        // 1. Make a shallow copy of the items
        let users = [...this.state.users];
        console.log(users);
        // 2. Make a shallow copy of the item to be mutated
        let user = {...users[userIndex]};
        // 3. Make a copy of the array
        let new_divisions = user.divisions; 
        // 4. Push new value to the array
        new_divisions.splice(spliceIndex,1);    
        // 5. Replace the original array
        user.divisions = new_divisions;
        // 6. Replace the original object in the users array
        users[userIndex] = user;
        this.setState({users: users});    
        this.putCred(this.state.users[userIndex].username,{divisions: new_divisions})
      }
    }
    //updates the addDivision property in the postBody state upon change of its corresponding input field 
    handleDivChange = (e,userIndex) =>{
      let divPlaceHolder = this.state.addDivisions;
      divPlaceHolder[userIndex] = e.target.value;
      this.setState({addDivisions: divPlaceHolder});
    }
    //updates the service property in the postBody state upon change of its corresponding input field 
    handleOUChange = (e,userIndex) =>{
      let ouPlaceHolder = this.state.addOrganisationalUnits;
      ouPlaceHolder[userIndex] = e.target.value;
      this.setState({addOrganisationalUnits: ouPlaceHolder});
    }
    //adds elements to the organisational units and divisions arrays in a specific user object, then commits it to the database
    handleAddToArray = (e,userIndex,arrayType) =>  {
      console.log("handleAdd","tried to add");
        if(arrayType === "ou"){
          // 1. Make a shallow copy of the items
          let users = [...this.state.users];
          console.log("handleAdd",users);
          // 2. Make a shallow copy of the item to be mutated
          let user = {...users[userIndex]};
          // 3. Make a copy of the array
          let new_organisational_units = user.organisational_units; 
          // 4. Push new value to the array
          new_organisational_units.push(this.state.addOrganisationalUnits[userIndex]);    
          // 5. Replace the original array
          user.organisational_units = new_organisational_units;
          // 6. Replace the original object in the users array
          users[userIndex] = user;
          this.setState({users: users});
          console.log(users)
          this.putCred(this.state.users[userIndex].username,{organisational_units: new_organisational_units})
        }
        else if(arrayType === "div"){
          // 1. Make a shallow copy of the items
          let users = [...this.state.users];
          console.log("handleAdd",users);
          // 2. Make a shallow copy of the item to be mutated
          let user = {...users[userIndex]};
          // 3. Make a copy of the array
          let new_divisions = user.divisions; 
          // 4. Push new value to the array
          new_divisions.push(this.state.addDivisions[userIndex]);    
          // 5. Replace the original array
          user.divisions = new_divisions;
          // 6. Replace the original object in the users array
          users[userIndex] = user;
          this.setState({users: users});    

          console.log(users)
          this.putCred(this.state.users[userIndex].username,{divisions: new_divisions})
        }
    }

    render() {
      let dataRows;
      <Links isDiv = {false}/>
      if(this.state.token === null){
        return (<Redirect to = "/" redirectToLogin = {false}/>)
      }
      
      if (this.state.pageLoaded){
        if(this.state.currentUser.role === "standard"){

          dataRows = this.state.users.map((user,index) => {
              //checks if this job is archived and if it's status matches the apllied filter
              
                return (
                <tr key = {user.username}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td><ul>{user.organisational_units.map((ou) => {
                    return(<li key = {ou}>{ou}</li>)             
                    })}
                    </ul></td>
                  <td><ul>{user.divisions.map((div) => {
                    return(<li key = {div}>{div}</li>) 
                    })}
                    </ul></td>
                  <td>{user.role}</td> 
                </tr>)
              })
        }
            else{
              dataRows = this.state.users.map((user,index) => {
                return (<tr key = {user.username}>
                  <td>{user.username}</td>
                  <td><input value = {this.state.users[index].password} onChange={(e) => this.handlePaswordChange(e,index)}/><i className="fas fa-edit" onClick = {(e) => this.handleIconClick(user.usernames,"password",index)}></i></td>
                  
                  <td><ul>{user.organisational_units.map((ou,indexOu) => {
                    return(<li key = {ou}>{ou}<i onClick = {() => this.deleteArrayItem(index,indexOu,"ou")} className="fas fa-trash"></i></li>)             
                    })}
                    <li><input value = {this.state.addOrganisationalUnits[index]} onChange = {(e) => this.handleOUChange(e,index)} /><i onClick={(e) => this.handleAddToArray(e,index,"ou")} className="far fa-plus-square"></i></li>
                    </ul></td>

                    <td><ul>{user.divisions.map((div,indexDiv) => {
                    return(<li key = {div}>{div}<i onClick = { () => this.deleteArrayItem(index,indexDiv,"div")} className="fas fa-trash"></i></li>) 
                    })}
                    <li><input value = {this.state.addDivisions[index]} onChange = {(e) => this.handleDivChange(e,index)}/><i className="far fa-plus-square" onClick={(e) => this.handleAddToArray(e,index,"div")}></i></li>
                  </ul></td>  
                  
                  
                  <td><input id = "date" value = {this.state.users[index].service} onChange={(e) => this.handleServiceChange(e,index)}/><i className="fas fa-edit" onClick = {(e) => this.handleIconClick(user.username,"service",index)}></i></td>
                </tr>)
              })
            }
               
      }
          return (
              <div>
                <Links isDiv = {false}/>
                  <div className = "filter">
            <table> 
              <thead>                  
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>organisational Units</th>
                  <th>Divisions</th>
                  <th>Service</th>
                </tr>
                </thead>  
                <tbody>
                  {dataRows}
                </tbody>
            </table>          
            </div>
            <div className='registerContainer'>
              <AddCredential registerType = "credential_by_user"/>
            </div>
        </div>
        );
         
    }
}

export default Division;