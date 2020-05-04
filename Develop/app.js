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
            name: "Name",
            message: "Please enter the name of the Employee you would like to add"
        },
        {
            type: "input",
            name: "Id",
            message: "Please enter the Employees ID"
        },
        {
            type: "input",
            name: "Email",
            message: "Please enter the Employees email"
        },
        {
            type: "list",
            name: "Role",
            message: "Please enter the role of the employee you would like to add",
            choices: ["Manager", "Engineer", "Intern"],
        }
    ]).then(async function(answers){
        switch(answers.Role){
            case "Manager":
                await inquirer.prompt({
                    type: "input",
                    name: "officeNum",
                    message: "Please input your Managers office number"
                }).then(function(response){
                    return answers.officeNum = response.officeNum
                })
                break
            case "Engineer":
                await inquirer.prompt({
                    type: "input",
                    name: "github",
                    message: "Please input your Engineers github username"
                }).then(function(response){
                    return answers.github = response.github
                })
                break
            case "Intern":
                await inquirer.prompt({
                    type: "input",
                    name: "school",
                    message: "Please input your Interns school"
                }).then(function(response){
                    return answers.school = response.school
                })
                break
        }
        let addEmployee = await inquirer.prompt(
            {
                type: "list",
                name: "addEmp",
                message: "Would you like to add another Employee?",
                choices: ["Yes", "No"]
            }
        )
        empList.push(answers)
        if(addEmployee.addEmp === "Yes"){
            addEmpl()
        }else{
            generateEmp(empList)
        }
    })
}

function generateEmp(empList){
    let Employees = []
    for(let i = 0; i < empList.length; i++){
        switch(empList[i].Role){
            case "Manager":
                let manager = new Manager(empList[i].Name, empList[i].Id, empList[i].Email, empList[i].officeNum)
                Employees.push(manager)
                break
            case "Engineer":
                let engineer = new Engineer(empList[i].Name, empList[i].Id, empList[i].Email, empList[i].github)
                Employees.push(engineer)
                break
            case "Intern":
                let intern = new Intern(empList[i].Name, empList[i].Id, empList[i].Email, empList[i].school)
                Employees.push(intern)
                break
        }
    }
    console.log(Employees)
    renderTeam(Employees)
}

async function renderTeam(Employees){
    console.log(Employees)
    var html = await render(Employees)
    fs.writeFile(outputPath, html, (err) =>{
        if(err) throw (err)
        console.log("Team html file generated, please check the 'output' folder")
    })
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
