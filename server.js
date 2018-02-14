// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/animalDB');
mongoose.Promise = global.Promise;


let AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2}
}, {timestamps: true})



let Animal = mongoose.model("Animal", AnimalSchema);
// ==============================




// ===== ROUTES! ======
app.get('/', function(req, res){
    Animal.find({}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('index', {data: results});
        }
    })
})

app.post('/submit', function(req, res){
    console.log(req.body);
    let new_animal = new Animal(req.body);
    new_animal.save(function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.redirect('/');
        }
    })
})

app.get('/mongooses/new', function(req, res){
    Animal.find({}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('add', {data: results});
        }
    })
})

app.get('/mongooses/:id', function(req, res){
    var particularAnimal = req.params.id;
    Animal.find({_id: particularAnimal}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('show', {data: results});
        }
    })
})

app.get('/mongooses/edit/:user_id', function(req, res){
    var particularAnimal = req.params.user_id;
    Animal.findOne({_id: particularAnimal}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log("res",results);
            res.render('edit', {data: results});
        }
    })
})

app.post('/mongooses/edit/:id', function(req, res){
    Animal.update({_id: req.body.hiddenid},{name: req.body.name}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.redirect('/');
        }
    })
})

app.get('/mongooses/destroy/:id', function(req, res){
    var particularAnimal = req.params.id;
    Animal.remove({_id: particularAnimal}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.redirect('/');
        }
    })
})

// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================




// ======= HERE BE DRAGONS (or possibly socket code) ========

// ==========================================================