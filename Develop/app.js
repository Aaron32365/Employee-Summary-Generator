const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
//  ​
var empList = []
init()

function init(){
    addEmpl()
}


function addEmpl(){
    inquirer.prompt([
        {
            type: "input",
            name: "empName",
            message: "Please enter the name of the Employee you would like to add"
        },
        {
            type: "input",
            name: "empId",
            message: "Please enter the Employees ID"
        },
        {
            type: "input",
            name: "empEmail",
            message: "Please enter the Employees email"
        },
        {
            type: "list",
            name: "empRole",
            message: "Please enter the name of the employee you would like to add",
            choices: ["Manager", "Engineer", "Intern"],
            filter: async function(answer){
                switch(answer){
                    case "Manager":
                        
                        let office = await inquirer.prompt({
                            type: "input",
                            name: "number",
                            message: "Please enter the Managers offce number"
                        })
                        answer.officeNum = office.num
                }
                return answer
            }
        },
        {
            type: "list",
            name: "addEmp",
            message: "Would you like to add another Employee?",
            choices: ["Yes", "No"]//add this to the .then function, create another inquirer.prompt
        }
    ]).then(function(answers){
        empList.push(answers)
        console.log(empList)
        if(answers.addEmp === "Yes"){
            addEmpl()
        }else{
            generateEmp(empList)
        }
    })
}

function generateEmp(empList){
    let Employees = []
    for(let i = 0; i < empList.length; i++){
        switch(empList[i].empRole){
            case "Manager":
                break
            case "Engineer":
                console.log("Plus 1 Engineer")
                break
        }
    }
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!`
