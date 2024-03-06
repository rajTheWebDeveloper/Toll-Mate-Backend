import express,{Request,Response} from 'express'
import Toll from '../models/toll'


interface getTollRequest extends Request 
{
    body:{
        source:string;
        destination:string;
        vehicleType:string;
    }
}


let getTolls=async (req:getTollRequest,res:Response)=>
{
    let {source,destination,vehicleType}=req.body
    let foundTollData=await Toll.findOne({
        '$or':[{route:`${source}~${destination}`},{route:`${destination}~${source}`}]
    })
    console.log(vehicleType)
    let tollObject=await JSON.parse(JSON.stringify(foundTollData?.tollsBetween[0]));
        let tollCost:(number | null)=null;
        for(let [key,value] of Object.entries(tollObject))
        {
            if(key===vehicleType)
            {
                tollCost=Number(value)
            }
        }

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