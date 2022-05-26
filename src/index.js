const express = require('express')

const db = require('./queries')

const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "url, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
  next();
});



app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.get('/', (request, response) => {
    response.json({info: 'amogus'})
})

app.get('/users', db.getUsers)
app.get('/users/:account_id', db.getUserById)
app.post('/users/authenticate', db.checkUserPassword)
app.post('/users', db.createUser)
app.put('/users/:account_id', db.updateUser)
app.delete('/users/:account_id', db.deleteUser)

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`)
})