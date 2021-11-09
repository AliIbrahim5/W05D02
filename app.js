
const express =require("express");
const app =express();
const fs =require("fs")
const PORT =5000;
app.use(express.json());

//read
app.get("/moves",(req,res)=>{
    fs.readFile('./move.json',(err,data)=>{
        const moves=JSON.parse(data.toString())
        res.status(200).json(moves)
    })
   
})
function addToFill(moves){
    fs.writeFile('./move.json',JSON.stringify(moves),()=>{
        console.log('Add from move');
    })
}

//creat
app.post("/addmove",(req,res)=>{
    const {name} =req.body
    fs.readFile('./move.json',(err,data)=>{
        const newmove =JSON.parse(data.toString());
        newmove.push({id:newmove.length +1,name,isVefr:false,isdelete:false})
        addToFill(newmove);
        res.status(200).json(newmove);    
    })
    
  
    
    
})

//delete with put

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





//delete with delete


// app.get("/delete1",(req,res)=>{
// const uid =req.query.id
//     console.log(uid);
    // fs.readFile('./move.json',(err,data)=>{
        // console.log(data);
        // const moves =JSON.parse(data.toString())
        // moves.forEach((ele)=>{
        //     if(ele.id == id){
        //         ele.isdelete =true
        //     }
        // });

        

        // addToFill(moves);
        // res.status(200).json(uid)
    // })
   
   
// })
 
//updaet
// app.put('/updaet',(req,res)=>{
//     const{id,name,isVefr,isdelete} =req.body;
//     let check =false;
//     fs.readFile('./move.json',(err,data)=>{
//         const moves =JSON.parse(data.toString());
//          moves.forEach((ele)=>{
//             if(id == updetmoves.id){
               
//                 if(name !== undefined)
//                     ele.name =name;
                
//                 if(isVefr !== undefined)
//                     ele.isVefr =isVefr;
                
//                  if( isdelete !== undefined)
//                     ele.isdelete =isdelete;

//                 check = true;
//             } 
           

           

//         })
        addToFill(movesToUpdeat);
        res.status(200).json(movesToUpdeat)
    })

   
        
    });
    
    
        


app.listen(PORT,()=>{
console.log(`port:${PORT}`);

})