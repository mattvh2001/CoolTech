import React, { Component } from 'react';
import './Division.css';
//import  {all_divisions, all_organisational_units, decipher} from './ArrayUnits';
import Register from "./Register";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import Links from './Links';

class UserDivision extends Component {
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
    message:null
    }    
}
componentDidMount() {
    // Default options are marked with 
    //console.log(this.props.location.state)
    console.log("tried to fetch div")
   
    //let x = decipher(this.state.token)
    var decoded = jwt_decode(this.state.token);
    console.log(decoded)
    this.setState({currentUser:decoded})
   

    
  fetch('/user/division', {
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
            console.log("addDivs0",addDivisionsPlaceholder)
            this.setState({
              addOrganisationalUnits : addOrganisationalUnitsPlaceholder,
              addDivisions : addDivisionsPlaceholder,
              users: result, 
              pageLoaded:true    
            });               
          }else{
  
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

    putCred = (username,data) => {
      // Default options are marked with      
      console.log("tried to fetch")
      fetch('/users/'+ username, {
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

    handleRoleChange = (e,index) =>  {
      let users = [...this.state.users];
      console.log(users);
      // 2. Make a shallow copy of the item to be mutated
      let user = {...users[index]};
      console.log(user)
      // 3. Replace the property that needs to be changed
      user.role = e.target.value;
      // 4. Replace the original object in the users array
      users[index] = user;
      this.setState({users: users});
    }

    

    

    handleIconClick = (username,field,index) =>{
      console.log("this is " + username)
      if(field === "password"){
        console.log("Edit item" + this.state.users[index].password)
        this.putCred(username,{password: this.state.users[index].password});      
      }else if(field === "role"){
        console.log("Edit item" + this.state.users[index].role);
        this.putCred(username,{role:this.state.users[index].role});
      }
    }

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
    handleDivChange = (e,userIndex) =>{
      let divPlaceHolder = this.state.addDivisions;
      divPlaceHolder[userIndex] = e.target.value;
      this.setState({addDivision: divPlaceHolder});
    }

    handleOUChange = (e,userIndex) =>{
      let ouPlaceHolder = this.state.addOrganisationalUnits;
      ouPlaceHolder[userIndex] = e.target.value;
      this.setState({addDivision: ouPlaceHolder});
    }

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
      <Links isDiv = {true}/>
      if (this.state.pageLoaded){
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
                  
                  
                  <td><input id = "date" value = {this.state.users[index].role} onChange={(e) => this.handleRoleChange(e,index)}/><i className="fas fa-edit" onClick = {(e) => this.handleIconClick(user.username,"role",index)}></i></td>
                </tr>)
              })
            
               
      }
        if(this.state.token === null){
          return (<Redirect to = "/"/>)
        }
          return (
          <div>
            <Links isDiv = {false}/>
            <h1>Users</h1>
            <div className = "filter">
              
              <table> 
                <thead>                  
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>organisational Units</th>
                    <th>Divisions</th>
                    <th>User Role</th>
                  </tr>
                  </thead>  
                  <tbody>
                    {dataRows}
                  </tbody>
              </table>          
              </div>
              <div className='registerContainer'>
                <Register/>
            </div>
        </div>
        );
         
    }
}

export default UserDivision;