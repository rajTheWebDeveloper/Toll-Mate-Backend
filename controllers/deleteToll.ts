import express,{Request,Response} from 'express'
import Toll from '../models/toll'

interface DeleteTollRequest extends Request
{
    body:
    {
        source:string,
        destination:string,
        tollName:string
    }
}


let deleteToll=async (req:DeleteTollRequest,res:Response)=>
{
    let {source,destination,tollName}=req.body
    let foundToll=await Toll.findOne({'$or':[{route:`${source.toLowerCase()}~${destination.toLowerCase()}`},{route:`${destination.toLowerCase()}~${source.toLowerCase()}`}]})
    let deletedToll=JSON.parse(JSON.stringify(foundToll));
    deletedToll=deletedToll?.tollsBetween?.filter((items:{tollName:string,
    tollLocation:[number,number],
    projectType:string,
    car:number,
    lcv:number,
    busMultiAxle:number,
    multiAxle:number,
    heavyVehicle:number,
    fourToSixAxle:number,
    sevenOrMoreAxle:number})=>
    {
        return items.tollName.toLowerCase()!==tollName.toLowerCase()
    })
    console.log(deletedToll)
    let deleteFromDB=await Toll.findOneAndUpdate({'$or':[{route:`${source.toLowerCase()}~${destination.toLowerCase()}`},{route:`${destination.toLowerCase()}~${source.toLowerCase()}`}]},{
        "$set":{
            tollsBetween:deletedToll
        }
    })
    
    return res.send({deleteFromDB})
}



export default deleteToll