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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

////////// RUTAS GET ///////////

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

app.get('/myCart', function(request, response){
    const collection = database.collection('shopping-cart');
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

////////// RUTAS POST //////////

app.post('/api/addItemToCart', function(request, response){
    const productsCollection = database.collection('products');
    const shoppingCartCollection = database.collection('shopping-cart');
    let nameItem = request.body.name;

    productsCollection.find({
        name: {
            '$eq': nameItem
        }
    }).toArray(function(error, docs){
        if(error) {
            console.error(error);
            response.send(error);
            return;
        }

        shoppingCartCollection.insert(docs[0], function(error2, result) {
            if(error2) {
                console.error(error2);
                response.send(error2);
                return;
            }
            response.send("Item added");
        });
    })
});

app.listen(5500);