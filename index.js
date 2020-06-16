const express=require('express');
const path=require('path');
const port=8001;
const db= require('./config/mongoose');
const Contact= require('./models/contacts');

const app=express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));


// middleware1
// app.use(function(req, res, next){
//     console.log('middleware first call');
//     req.myname="kirti";
//     next();  
// });

// middleware2
// app.use(function(req, res, next){
//     console.log('my name from mw2' ,req.myname);
//     // console.log('middleware 2nd call');
//     next();  
// });

var contactList=[
      {
          name:"kirti",
          phone:"1111111111"
      },
      {
          name:"richa",
          phone:"2222222222"
      },
      {
        name:"naveen",
        phone:"3333333333"
      }
]


app.get('/',function(req,res){
    // console.log(req);

    Contact.find({}, function(err,contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        } 

        return res.render('home',{
        title: "My Contact List",
        contact_list: contacts
        });
    });
});


app.get('/practice',function(req,res){
    return res.render('practice',{title: 'My playground'});
});

app.post('/create-contact', function(req,res){
    // return res.redirect('/practice');
    // contactList.push(req.body);
        // name: req.body.name,
        // phone:req.body.phone
    // });
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }

        console.log('*******',newContact);
        return res.redirect('back');
        
    });  
});

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    });   
});


app.listen(port, function(err){
    if(err){
        console.log('Erroor in running the server',err);
        return;
    }
    console.log('Yup! My Express Server is running on the port' + port);
});

