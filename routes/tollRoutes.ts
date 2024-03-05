import express from 'express'
import createToll from '../controllers/createToll'
import deleteToll from '../controllers/deleteToll'
import getTolls from '../controllers/getTolls'
let router=express.Router()


router.post('/create',createToll)
router.post('/delete',deleteToll)
router.post('/get',getTolls)

export default router