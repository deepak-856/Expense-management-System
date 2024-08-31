const transectionModel = require("../models/transectionModel");
const moment = require('moment')

const addTransection= async(req,res)=>{
    try {
        const newTransection = new transectionModel(req.body)
        await newTransection.save();
        res.status(201).send('Transection created')
    } catch (error) {
        
        console.log(error)
        res.status(500).json(error)
    }

}

const getAllTransection = async(req,res) =>{
    try {
        const {frequency,selectedDate, type} = (req.body)
        const transection = await transectionModel.find({
            ...(frequency !=='custom' ? {
                date:{
                    $gt : moment().subtract(Number(frequency), "d").toDate()
                },
            }:{
                date:{
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                }
            }),
            userid:req.body.userid,
            ...(type !=='all' && {type})
        })
        res.status(200).json(transection);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)    
    }
}



module.exports = {getAllTransection, addTransection};