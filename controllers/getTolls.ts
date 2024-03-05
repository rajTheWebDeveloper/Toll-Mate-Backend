import express,{Request,Response} from 'express'
import Toll from '../models/toll'


interface getTollRequest extends Request 
{
    body:{
        source:string;
        destination:string;
    }
}


let getTolls=async (req:getTollRequest,res:Response)=>
{
    let {source,destination}=req.body
    console.log(source,destination)
    let foundTollData=await Toll.findOne({
        '$or':[{route:`${source}~${destination}`},{route:`${destination}~${source}`}]
    })
    console.log("Am i priniting bro")
    console.log(foundTollData)
    if(foundTollData)
    {
        return res.send({success:true,msg:"Retrieved data successfully",foundTollData:foundTollData})
    }
    else 
    {
        return res.send({success:false,msg:"No such routes exists"})
    }

}



export default getTolls