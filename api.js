var Customer = require('./customer');
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

router.route("/customers").get((request,response)=>{
    dboperations.getCustomers().then(result=>{
        response.json(result[0]);
    })
})

router.route("/customers/:id").get((request,response)=>{
    dboperations.getCustomer(request.params.id).then(result=>{
        response.json(result[0]);
    })
})

router.route("/customers").post((request,response)=>{
    let customer = {...request.body}
    dboperations.addCustomer(customer).then(result => {
        response.status(201).json(result);
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Customer API is running at '+port)

// dboperations.getCustomers().then(result => {
//     console.log(result);
// })