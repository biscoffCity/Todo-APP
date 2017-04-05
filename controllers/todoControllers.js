var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@ds145790.mlab.com:45790/adnantestdb");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var _ = require('underscore');

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

//model
var Todo = mongoose.model('Todo', todoSchema);



module.exports = function(app){


app.get('/todo', function(req, res){
    //get data from mongoDb and pass it to view
    Todo.find({}, function(err, data){ //find all item and it's returned to param data
        if (err) throw err;
        res.render('todo', {todos: data}); 
    });
    
});

app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and post it mongoDB
    var body = _.pick(req.body, "item")
    if (body.item.trim().length === 0) return res.status(400).send();
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) return err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err; 
        res.json(data);
    });
});

}