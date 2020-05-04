//requiring necessary modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
//////////////////////////////////////////////////////////////////////
var empList = []
//initialization
init()

function init(){
    addEmpl()
}
/////////////////////////////////////////////////////////////////////

function addEmpl(){
//prompts user for basic information and stores returned input into answers var
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
//////////////////////////////////////////////////////////////////////////////////////

//checks for the new employees role, additional prompts based off of input
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
/////////////////////////////////////////////////////////////////////////////////////

        empList.push(answers)
        //checking if user wants to add more employees
        if(addEmployee.addEmp === "Yes"){
            addEmpl()
/////////////////////////////////////////////////////////////////////////////////////
        }else{
            generateEmp(empList)
        }
    })
}

//function that loops through employees, creates new class object for each
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

///////////////////////////////////////////////////////////////////////////////////////

//function for generating html file for team summary 
async function renderTeam(Employees){
    console.log(Employees)
    var html = await render(Employees)
    fs.writeFile(outputPath, html, (err) =>{
        if(err) throw (err)
        console.log("Team html file generated, please check the 'output' folder")
    })
}
//////////////////////////////////////////////////////////////////////////////////////