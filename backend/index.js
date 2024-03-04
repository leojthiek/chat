const express = require("express")
const path = require('path')
const cors = require('cors')

const userRoute = require('./router/userRoute')
const employeeRoute = require('./router/employeeRoute')
const {DBconnection} = require('./config/connectDB')

DBconnection()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'frontend', 'public')));

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use('/api/user',userRoute)
app.use('/api/employee',employeeRoute)


app.listen(8082,()=> console.log("server up and running!"))