//inherits employee, gets office number
const Employee = require("./Employee")

class Manager extends Employee{
    constructor(name, id, email, officeNumer){
        super(name, id, email)
        this.officeNumber = officeNumer
    }
    getRole(){
        return "Manager"
    }
    getOfficeNumber(){
        return this.officeNumber
    }
}

module.exports = Manager