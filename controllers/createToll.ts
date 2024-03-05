import express,{Request,Response} from 'express'
import { Document } from 'mongoose';
import Toll from '../models/toll';


interface CreateTollReqest extends Request{
    body:{
    source:string;
    destination:string;
    distance:number;
    noOfTolls:number;
    tollName:string;
    tollLocation:[number,number];
    projectType:string;
    car:number;
    lcv:number;
    busMultiAxle:number;
    multiAxle:number;
    heavyVehicle:number;
    fourToSixAxle:number;
    sevenOrMoreAxle:number;
    }
}



let createToll=async (req:CreateTollReqest,res:Response)=>
{
    let {source,destination,distance,noOfTolls,tollName,tollLocation,projectType,car,lcv,busMultiAxle,multiAxle,heavyVehicle,fourToSixAxle,sevenOrMoreAxle}=req.body;
    try 
    {
    let foundRoute=await Toll.findOne({'$or':[{route:`${destination.toLowerCase()}~${source.toLowerCase()}`},{route:`${source.toLowerCase()}~${destination.toLowerCase()}`}]});

    if(!foundRoute)
    {
        let createdRouteAndToll=await Toll.create({
                route:`${source.toLowerCase()}~${destination.toLowerCase()}`,
                noOfTolls:noOfTolls,
                distance:distance,
                tollsBetween:[
                    {
                        tollName:tollName.toLowerCase(),
                        tollLocation:tollLocation,
                        projectType:projectType,
                        car:car,
                        lcv:lcv,
                        busMultiAxle:busMultiAxle,
                        multiAxle:multiAxle,
                        heavyVehicle:heavyVehicle,
                        fourToSixAxle:fourToSixAxle,
                        sevenOrMoreAxle:sevenOrMoreAxle

                    }
                ]
            })

        return res.send({success:true,msg:"Toll Created Successfully",createdRouteAndToll})
    }
    else 
    {
        let tollsBetween=foundRoute?.tollsBetween;
        let foundToll=tollsBetween?.find((items)=>
        {
            return items.tollName.toLowerCase()===tollName.toLowerCase()
        })
        if(foundToll)
        {
            return res.send({success:false,msg:"Toll already exits."})
        }
        else 
        {
            tollsBetween?.push({tollName:tollName.toLowerCase(),tollLocation:tollLocation,projectType:projectType,car:car,lcv:lcv,busMultiAxle:busMultiAxle,multiAxle:multiAxle,fourToSixAxle:fourToSixAxle,heavyVehicle:heavyVehicle,sevenOrMoreAxle:sevenOrMoreAxle})
            let updatedToll=await Toll.findOneAndUpdate({'$or':[{route:`${source.toLowerCase()}~${destination.toLowerCase()}`},{route:`${destination.toLowerCase()}~${source.toLowerCase()}`}]},{
                '$set':{
                    tollsBetween:tollsBetween
                }})
           return res.send({success:true,msg:"Updated the toll successfully"})
        }
    }
    
    }
    catch(error)
    {
        console.error('Error creating toll:', error);
        return res.status(500).json({ success:false,msg:"Internal Server Error"});
    }
}




export default createToll