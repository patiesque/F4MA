import { v4 } from "uuid";
import { ShowGateway } from "../../gateways/showGateway";
import { Show, ShowWeekDay } from "../../entities/show";

export class CreateShowUC {
    constructor(private showGateway: ShowGateway) { }

    public async execute(input: any): Promise<any> {
        const id = v4();

        if (input.startTime < 8) {
            throw new Error("marcar apos as 8");
        }
        if (input.endTime > 23) {
            throw new Error("marcar antes das 23");
        }
        if(input.endTime < input.startTime){
            throw new Error("horario errado");
        }
        const getShow = await this.showGateway.getShowWithBandByTimeRange(
            input.startTime,
            input.endTime,
            input.weekDate
        )
            
        if(getShow.length > 0){
            throw new Error("horario fora");
        }



        const show = new Show(
            id,
            input.weekDate,
            input.startTime,
            input.endTime,
            input.bandId,
        )
 
        await this.showGateway.createShow(show)

        return {
            message: "Successfully Created"
        }
    }

}

export interface CreateShowUCInput {
    weekDate: ShowWeekDay;
    startTime: number;
    endTime: number;
    bandId: string
}



export interface CreateShowUCOutput {
    message: string;
}