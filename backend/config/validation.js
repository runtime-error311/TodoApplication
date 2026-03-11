import validator from "validator";

export const validationSignUp = (input)=>{
    const {name,email,password} = input;
    if(name.length<3 || name.length>100) return "Name must has characters in range 3 to 100";
    if(!validator.isEmail(email)) return "Invalid Email!";
    if(password.length<8) return "Weak Password!";
    return "Valid Inputs!";
}

export const validationTodo = (input)=>{
    const {title,description} = input;
    if(title.length<3 || title.length>100) return "Title must has characters in range 3 to 100";
    if(description.length<3) return "Description must has characters greater than 3";
    return "Valid Inputs!";
}