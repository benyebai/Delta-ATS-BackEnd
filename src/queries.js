require('dotenv').config()
const Pool = require('pg').Pool


//Move this out
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM applicant_data.account_details', (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    
    const account_id = parseInt(request.params.account_id)
    pool.query('SELECT * FROM applicant_data.account_details WHERE account_id = $1', [account_id], (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const checkUserPassword = (request, response) => {
    
    //const account_email = parseInt(request.params.account_email)
    const {email, password} = request.body

    pool.query('SELECT * FROM applicant_data.account_details WHERE email = $1 AND password = crypt($2, password)', [email, password], (error, results) =>{

        if (error) {
            throw error
        }

          response.status(201).send(results.rows);
    })
}



const createUser = (request, response) => {
    const {email, password, creation_date} = request.body

    pool.query('INSERT INTO applicant_data.account_details (email,  password, creation_date) VALUES ($1, crypt($2, gen_salt(\'bf\')), $3) ', [email, password, creation_date], (error, results) => {
        if (error){
            throw error
        }
        response.status(201).send(`User added`)
    })
}

const updateUser = (request, response) => {
    const account_id = parseInt(request.params.account_id)
    const {email, password} = request.body
  
    pool.query(
      'UPDATE applicant_data.account_details SET email = $1, password = crypt($2, gen_salt(\'bf\')) WHERE account_id = $3',
      [email, password, account_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${account_id}`)
      }
    )
  }


  const deleteUser = (request, response) => {
    const account_id = parseInt(request.params.account_id)
  
    pool.query('DELETE FROM applicant_data.account_details WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${account_id}`)
    })
  }
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    checkUserPassword,
  }