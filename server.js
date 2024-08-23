const express= require('express')
require('dotenv').config()
const nodemailer=require('nodemailer')

function sendMail(){
  console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS)
  let transporter=nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  })


  let mailOptions = {
      to: 'piperham007@gmail.com',
      from: 'fabianjoseph063@gmail.com',
      subject: 'Test Email',
      text: 'Hello, this is a test email sent from Node.js!'
    };
    
    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return { message: error};
        //console.log(error);
      } else {
         return { message: 'Email sent: ' + info.response};
        //console.log('Email sent: ' + info.response);
      }
    });

}
const app = express()
const port =3000

app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})


function getData() {
  return { message: `${process.env.EMAIL_USER}${process.env.EMAIL_PASS}` };
 // return { message: "Hello from the server! batman" };
}
app.get('/api/data', (req, res) => {
  //const data = getData();
  const data = sendMail()
  res.json(data);
});

// A simple get greet method
app.get("/greet", (req, res) => {
    // get the passed query
    const { name } = req.query;
    res.send({ msg: `Welcome ${name}!` });
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
// export the app for vercel serverless functions
module.exports = app;
