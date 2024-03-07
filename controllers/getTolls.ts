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

    if(foundTollData)
    {
        let tollObject=await JSON.parse(JSON.stringify(foundTollData?.tollsBetween));
        let tollCost:number=0;
        console.log(tollCost)
        tollObject.map((items:any)=>
        {
            for(let [key,value] of Object.entries(items))
            {
                if(key===vehicleType)
                {
                    tollCost+=Number(value)
                }
            }
        })
        console.log(tollCost)
        console.log(foundTollData)
        let ultimateTollData={...JSON.parse(JSON.stringify(foundTollData)),tollCost:tollCost}
        return res.send({success:true,msg:"Retrieved data successfully",foundTollData:ultimateTollData})
    }
    else 
    {
        return res.send({success:false,msg:"No such routes exists"})
    }
}

export default getTolls