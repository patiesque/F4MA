import { Request, Response } from "express";
import { GetShowUC } from "../../../business/usecase/show/getShows";
import { ShowDatabase } from "../../../data/showDatabase";

export const getShowEndpoint = async (req: Request, res: Response) => {
  try {
    const getShowUC = new GetShowUC(new ShowDatabase());
    const result = await getShowUC.execute({
        weekDate: req.query.day,
    })
    res.status(200).send(result);
    }catch(err){
        res.status(400).send({
            message: err. message,
            ...err
        })
    }
}


