
import jwt_decode from "jwt-decode";

export const all_organisational_units = ["News Management",
    "Software Reviews",
    "Hardware Reviews",
    "Opinion Publishing"]

    export const all_divisions =["Human Resources",
    "Finance",
    "Technical Support",
    "Content",
    "Marketing"];
    
    export function decipher(token){

      
      var decoded = jwt_decode(token);
      console.log(decoded)
      return decoded;
  }

  export default all_organisational_units;

