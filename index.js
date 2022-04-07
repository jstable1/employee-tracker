const mysql = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const createMenu = () =>
    inquirer.prompt([
        {
            type: 'list',
            name: 'choicesMenu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            validate: choiceMenu => {
                if (choiceMenu) {
                    return true;
                } else {
                    console.log('What would you like to do?')
                    return false;
                }
            }
        },
    ]) .then (answers => {
        switch (answers.choicesMenu) {
            case 'View all departments':
                return viewAllDepts();
            
            case 'View all roles':
                return viewAllRoles();

            case 'View all employees':
                return viewAllEmployees();

            case 'Add a department':
                return addDept();
            
            case 'Add a role':
                return addRole();
            
            case 'Add an employee':
                return addEmployee();
            
            case 'Update an employee role':
                return updateEmployee();
        }
    });

const viewAllDepts = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(['name'], values);
        });
};

const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(['title', 'salary', 'department_id'], values);
        });
};

const viewAllEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(['first_name', 'last_name', 'role_id', 'manager_id'], values);
        });
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
        },
    ]);
};

createMenu()


