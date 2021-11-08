const { json } = require("express");
const express =require("express");
const app =express();
const fs =require("fs")
const PORT =5000;
app.use(express.json());

//read
app.get("/moves",(seq,res)=>{
    fs.readFile('./move.json',(err,data)=>{
        const moves=JSON.parse(data.toString())
        res.status(200).json(moves)
    })
   
})

//creat
function addToFill(moves){
    fs.writeFile('./move.json',JSON.stringify(moves),()=>{
        console.log('Add from move');
    })
}
app.post("/addmove",(req,res)=>{
    const move =req.body
    fs.readFile('./move.json',(err,data)=>{
        let newmove =JSON.parse(data.toString());
        newmove.push({id:newmove.length,name:"jojman",isVefr:false})
        addToFill(newmove);
        res.status(200).json(newmove);
        

    })
    
  
    
    
})

//delete

app.put("/delete",(req,res)=>{
    const deleteFrommove =req.body.id
    fs.readFile('./move.json',(err,data)=>{
        const moves =JSON.parse(data.toString())
        const upmoves =moves.map((elem)=>{
            if(elem.id === deleteFrommove){
                elem.isdelete =true
            }

  return elem;

        });

        addToFill(upmoves);
        res.status(200).json(upmoves)
    })
   
   
})

//updaet
app.put('/updaet',(req,res)=>{
    const updetmoves =req.body;
    fs.readFile('./move.json',(err,data)=>{
        const moves =JSON.parse(data.toString());
        const movesToUpdeat= moves.map((elem)=>{
            if(elem.id ===updetmoves.id){
                elem.isVefr =updetmoves.isVefr;
            }

            return elem;

        })
        addToFill(movesToUpdeat);
        res.status(200).json(movesToUpdeat)
    })

    
        
    });
    
    
        


app.listen(PORT,()=>{
console.log(`port:${PORT}`);

})