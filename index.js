require('dotenv').config();
const connectTomongo = require('./db')
const express = require('express')
var cors = require('cors')
var app = express()
const path = require("path");
 
(process.env.NODE_ENV == 'production') ? app.use(cors()):app.use(cors({origin: 'https://63de7f3d625a8b27e6fd0f45--inotebookvorayash.netlify.app'}));


connectTomongo();
const port = process.env.PORT|| 5000 //because on port 3000 react app will run
app.use(express.json())

console.log(process.env.NODE_ENV);

// app.use(express.static("public"));


//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/contact', require('./routes/contact'))
// app.get('/',(req,res)=>{res.send("hii");})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
