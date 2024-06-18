var express=require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')


//app created
const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


// connect to mongodb
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=>{
    console.log('Error in Connexting to database')
})
db.once('open',()=>{
    console.log('Connected to database')
})


app.post('/sign_up',(req,res)=>{ //taken values
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phoneno=req.body.phoneno
    var gender=req.body.gender
    var password=req.body.password

    //object created data
    var data={
        'name':name,
        'age':age,
        'email':email,
        'phoneno':phoneno,
        'gender':gender,
        'password':password
    }
    //checking getting error or not
    db.collection('users').insertOne(data,(err,collection)=>{
        if (err){
            throw err;
        }
        console.log('Record inserted sucessfully.')
    })
    return res.redirect('signup_sucessful.html')
})


// creating connection between localhost
app.get('/',(req,res)=>{
    // res.send('Server connection sucessfully.')
    res.set({
        'Allow-access-Allow-Origin':'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log('Listening')