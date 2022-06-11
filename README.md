# Delta-ATS-BackEnd
This is the Delta Ats backend repository. The RestAPI is created using nodejs, express and pg. While the database we are using is postgresql.

## SETUP For the DATABASE

### Installation
- Install Postgresql
- Install PGADMIN

### Setting up the tables
- Within PGADMIN, create a new database
- Create a new schema named "applicant_data"
- Right click on the schema and open query tool
- copy and paste the code within the file "create-table" and run

## SETUP For the RestAPI

### Installation
-Install VS code\
-Install the latest version of node\
-Install npm (node package manager)\
-Clone the Delta Delta-ATS-Backend repository from github

### Usage

After pulling the most recent changes, run:
### `npm install`
in the project directory to install any new modules.

Create a .env file, and create 5 variables and put in the nessecary values:\
USER=pgadmin\
HOST=localhost\
DATABASE=(what you named your database)\
PASSWORD=(the password you set up)\
PORT=(defaulted to 5432)\

To run your server, cd into where your index.js is kept and run:
### `node index.js`
to start your server 