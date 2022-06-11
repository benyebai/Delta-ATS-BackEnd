require('dotenv').config()

const { validationResult } = require('express-validator');

const Pool = require('pg').Pool

//Move this out
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})



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
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({errors:errors.array()})
  }
    const {email, password, pronoun, firstName, lastName, country, province, city, postalCode, address, phoneNum} = request.body;
    var creation_date = new Date();
    creation_date =  (creation_date.getUTCFullYear() + '-' + (creation_date.getUTCMonth() + 1) + '-' + creation_date.getUTCDate());
    
    pool.on('error', (err, client) =>  {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
    pool.connect((err, client, done)=> {
      if (err) throw err
      client.query('INSERT INTO applicant_data.account_details (email,  password, creation_date) VALUES ($1, crypt($2, gen_salt(\'bf\')), $3) ', [email, password, creation_date], (error, results) => {
        //done()
        if (error){
            throw error
        }
         })

         client.query('INSERT INTO applicant_data.contact_info (phone_number,  address, city, country, postal_code, province) VALUES ($1, $2, $3, $4, $5, $6) ', [phoneNum, address, city, country, postalCode, province], (error, results) => {
         // done()
          if (error){
            return console.error("Error with database input", error.stack)
          }
         
        })

        client.query('INSERT INTO applicant_data.profile_table (first_name,  last_name, pronoun) VALUES ($1, $2, $3) ', [firstName, lastName, pronoun], (error, results) => {
          done()
          if (error){
              throw error
          }
          response.status(201).send(`Profile Added`)
           }) 
      })
    
}


const checkValidEmail = (request, response) => {
  const {email} = request.body
  pool.query('SELECT exists(SELECT * FROM applicant_data.account_details WHERE email = $1)', [email], (error, results) => {
      if (error){
          throw error
      }
      response.status(201).send(results.rows)
  })
}

//Unused

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

//Unused
  const deleteUser = (request, response) => {
    const account_id = parseInt(request.params.account_id)
  
    pool.query('DELETE FROM applicant_data.account_details WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${account_id}`)
    })
  }

  //Unused
const getUserById = (request, response) => {
    
  const account_id = parseInt(request.params.account_id)
  pool.query('SELECT * FROM applicant_data.account_details WHERE account_id = $1', [account_id], (error, results) =>{
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}


  module.exports = {
    checkValidEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    checkUserPassword,

  }
