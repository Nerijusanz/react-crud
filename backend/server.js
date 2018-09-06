const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');

//mongo setups
const dbName = 'reactcrud';
const dbCollections = ['games'];
const ObjectId = mongojs.ObjectId;
const db = mongojs(dbName,dbCollections);//dbname, db collection

const app = express();

//bodyParser midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set Static path public
app.use(express.static(path.join(__dirname,'public')));


app.get('/api/games',(req,res)=>{

    db.games.find(function (err, games) {    //note:db.collection_name

        if(err){

            res.status(500).json(make_server_error('server games find error occurs. Please try again later'));
            return;
        }

        res.json(games);
        
        
    })
});

app.get('/api/games/:id',(req,res)=>{

    const id = req.params.id;

    db.games.find({"_id": ObjectId(id)}, function(err, game){

        if(err){

            res.status(500).json(make_server_error('server games find error occurs. Please try again later'));
            return;
        }

        res.json(game[0]);
        
    });
});


app.post('/api/games/add', (req, res) => {

    //console.log(req.body);

    const {errors,isValid} = make_data_validation(req.body);

    if(!isValid){
        res.json({errors});
        return;
    }
    
        
        let newGame = {
            title:req.body.title,
            cover:req.body.cover
        }

        db.games.insert(newGame,function(err,game){

            if(err){             
                res.status(500).json(make_server_error('server game insert error occurs. Please try again later'));
                return;
            }
            
            res.json(game);
                                      
        });

        
});


app.put('/api/games/edit/:id',(req,res) => {

    //console.log(req.body);

    const {errors,isValid} = make_data_validation(req.body);

    if(!isValid){
        res.json({errors});
        return;
    }
        
    let game = {
        id:req.params.id,
        title:req.body.title,
        cover:req.body.cover
    }

    db.games.findAndModify({
        query: {_id: ObjectId(game.id)},
        update: {$set: {title: game.title,cover:game.cover}},
        new: true   //returnw modified record
    }, function (err, game) {
        if(err){             
            res.status(500).json(make_server_error('server game update error occurs. Please try again later'));
            return;
        }
        
        res.json(game);

    });
        
});


app.delete('/api/games/del/:id',(req,res)=>{


    let id = req.params.id;

    db.games.remove({_id: ObjectId(id)}, function(err) {

        if(err){             
            res.status(500).json(make_server_error('server game delete error occurs. Please try again later'));
            return;
        }

        res.json(id);
        
    });

});


app.use((req,res)=>{ //this request oocurs when targeted request don`t finded

    res.status(500).json(make_server_error('server request error occurs. Please try again later'));
    
});


const port = 8080;
app.listen(port,()=>console.log('Server is running on localhost:'+port));


function make_data_validation (data){


    let errors={
        validation:{}
    };

    if(data.title === '') errors.validation.title = 'field title is empty';
    if(data.cover === '') errors.validation.cover = 'field cover is empty';

    const isValid = Object.keys(errors.validation).length === 0 

    return {errors,isValid};
    
}


function make_server_error(msg){

    const errorObj = {
        errors:{
            server:msg
        }
    }
    
    return errorObj;
            
}

