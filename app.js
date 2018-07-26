var express    = require('express'),
    bodyParser = require('body-parser'),
    skills     = require('./components/skills.js'),
    projects   = require('./components/projects.js'),
    nodemailer = require('nodemailer'),
    dotenv     = require('dotenv'),
    app        = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

app.get("/", function(req,res){
    res.render("index",{skills: skills, projects: projects});
});

app.get("/colors", function(req,res) {
    res.render("colors")
});

app.get("/race", function(req,res) {
    res.render("race");
})

app.post("/", function(req,res){
  let mailOptions = {
      from: {
        name:"ZackHann.com",
        address: process.env.USER
      },
      to: process.env.USER,
      subject: req.body['form-subject'],
      text: req.body['form-name'] + " (" + req.body['form-email'] + "): " + req.body['form-body'],
      html: "<b style='font-size: 14px'>" + req.body['form-name'] + "</b> - " + req.body['form-email'] + "<br><br>" + req.body['form-body'],
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      res.redirect("/#contact-link");
    });
});

app.listen(3000, function() {
  console.log("Listening...");
});
