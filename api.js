var Inventory = require('./inventory');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

router.route("/inventory").get((request,response)=>{
    dboperations.getInventory().then(result=>{
        response.json(result[0]);
    })
})

router.route("/inventory/:id").get((request,response)=>{
    dboperations.getItem(request.params.id).then(result=>{
        response.json(result[0]);
    })
})

router.route("/inventory").post((request,response)=>{
    let item = {...request.body}
    dboperations.addItem(item).then(result => {
        response.status(201).json(result);
    })
})

router.route('/inventory/:id').delete((request, response) =>{
    dboperations.delItem(request.params.id).then(result=>{
        response.json(result[0]);
    })})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Customer API is running at '+port)

// dboperations.getCustomers().then(result => {
//     console.log(result);
// })