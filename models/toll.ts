import mongoose from "mongoose";

interface Toll
{
    route:string;
    noOfTolls:number;
    distance:number;
    tollCost:number | null;
    tollsBetween:[{
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
    }],
}

interface TollModel extends Toll,Document {}


let tollSchema=new mongoose.Schema<TollModel>({
    route:{
        type:String
    },
    noOfTolls:{
        type:Number
    },
    distance:{
        type:Number
    },
    tollCost:{
        type:Number,
        default:null
    },
    tollsBetween:[
        {
            tollName:{
                type:String
            },
            tollLocation:[Number,Number],
            projectType:{
                type:String
            },
            car:{
                type:Number
            },
            lcv:{
                type:Number
            },
            busMultiAxle:{
                type:Number
            },
            multiAxle:{
                type:Number
            },
            heavyVehicle:{
                type:Number
            },
            fourToSixAxle:{
                type:Number
            },
            sevenOrMoreAxle:{
                type:Number
            }
        }
    ]
})


export default mongoose.model<TollModel>('Toll',tollSchema)