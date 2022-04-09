const db = require('./config/connection');
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
        console.table(rows);
        createMenu()    
        });
};

const viewAllRoles = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, 
    departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows);
        createMenu()
        });
};

const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, 
    roles.title AS role, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employees employee
    LEFT JOIN roles ON employee.role_id = roles.id 
    LEFT JOIN employees manager ON manager.id = employee.manager_id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows);
        createMenu()
        });
}

const addDept = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the department?',
        }
    ]) .then (answers => {
        const sql = `INSERT INTO departments SET ?`
        db.query(sql, answers, (err, rows) => {
            if (err) {
                return;
            }
            console.log(`Added ${answers.name} to the database!!!`);
            createMenu()
            });
    })
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'title',
            message: 'What is the name of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'text',
            name: 'department_id',
            message: 'Which department does the role belong to?',
        }
    ]) .then (answers => {
        const sql = `INSERT INTO roles SET ?`
        db.query(sql, answers, (err, rows) => {
            if (err) {
                return;
            }
            console.log(`Added ${answers.title} to the database!!!`);
            createMenu()
            });
    })
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'text',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'text',
            name: 'role_id',
            message: "What is the employee's role?"
        },
        {
            type: 'text',
            name: 'manager_id',
            message: "What is the employee's manager?"
        }
    ]) .then (answers => {
        const sql = `INSERT INTO employees SET ?`
        db.query(sql, answers, (err, rows) => {
            if (err) {
                return;
            }
            console.log(`Added ${answers.first_name + ' ' + answers.last_name} to the database!!!`);
            createMenu()
            });
    })
};

const updateEmployee = () => {
    const sql = `SELECT first_name, last_name FROM employees`;
    const sql2 = `SELECT * FROM employees WHERE first_name = ? last_name = ?`;
    const sql3 = `UPDATE employee SET role_id = ? WHERE employee_id = ?`;

    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeMenu',
            message: "Which employee's role do you want to update?",
            choices: [
                db.query(sql, (err, rows) => {
                    if (err) {
                        return;
                    }
                    console.table(rows);
                    })
            ],
        },
    ]) .then (answers => {
        sql2() 
        sql3()
        createMenu()
    });
}



createMenu()


