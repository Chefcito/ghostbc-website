const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const databaseName = 'ghost-website';
const client = new MongoClient(url);
var database = null;

client.connect(function(err){
    if(err){
        console.error(err);
        return;
    }

    database = client.db(databaseName);
});

var app = express();

app.use(express.static('public') );

app.engine('handlebars', hbs() );
app.set('viewengine', 'handlebars');

app.use(express.static('public'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(request, response){
    response.render('home');
});

app.get('/shop', function(request, response){
    const collection = database.collection('products');
    collection.find({}).toArray(function(err, docs){
        if(err) {
            console.error(err);
            response.send(err);
            return;
        }
        var context = {
            products: docs,
        }
        response.render('shop', context);
    });
});

app.get('/addItemToCart', function(request, response){
    const collection = database.collection('shopping-cart');
    collection.insert({
        name: 'Prequelle CD',
        price: 15,
    }, function(err, result){
        if(err) {
            console.error(err);
            response.send(err);
            return;
        }
        response.send('Item Agregado');
    });
});

app.listen(5500);