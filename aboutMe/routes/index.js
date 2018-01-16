var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var userinfo = require('../public/javascripts/email-info.js');

var transporter = nodemailer.createTransport({
  service: userinfo.service,
  auth: {
    user: userinfo.email_from,
    pass: userinfo.password
  }
});

function mail(req) {
  var body = "Email: " +req.body.email + "\n" + "Message:" + req.body.message;
  var mailOptions = {
    from: userinfo.email_from,
    to: userinfo.email_to,
    subject: req.body.name,
    cc: req.body.email,
    text: body
  };
  try{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  catch(e){
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '- Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: '- About' , active: { about: true } } );
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: '- Projects', active: { projects: true } });
});

router.get('/resume', function(req, res, next) {
  res.render('resume', { title: '- Resume', active: { resume: true } });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: '- Contact', active: { contact: true }});

});

router.get('/resume/download', function(req, res, next) {
  res.download('./public/pdf/resume.pdf');
});

router.post('/contact', function(req, res, next) {
  mail(req);
  res.redirect('/contact');
});

module.exports = router;
