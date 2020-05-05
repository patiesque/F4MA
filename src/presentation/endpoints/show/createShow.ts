import { Request, Response } from "express";
import { CreateShowUC } from "../../../business/usecase/show/createShow";
import { ShowDatabase } from "../../../data/showDatabase";

export const createShowEndpoint = async (req: Request, res: Response) => {
    try{
        const createShowUc = new CreateShowUC(new ShowDatabase());
        const result = await createShowUc.execute({
            weekDate: req.body.weekDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            bandId: req.body.bandId,
        }); 

        res.status(200).send(result);
    }catch(err){
        res.status(400).send({
            message: err. message,
            ...err
        })
    }
}