import { v4 } from "uuid";
import { ShowGateway } from "../../gateways/showGateway";
import { Show, ShowWeekDay } from "../../entities/show";
import { CheckAfter } from "../../Error/CheckAfter";
import { WrongTime } from "../../Error/WrongTime";
import { CheckBefore } from "../../Error/CheckBefore";

export class CreateShowUC {
    constructor(private showGateway: ShowGateway) { }

    public async execute(input: any): Promise<any> {
        const id = v4();

        if (input.startTime < 8) {
            throw new CheckAfter;
        }
        if (input.endTime > 23) {
            throw new CheckBefore;
        }
        if (input.endTime < input.startTime) {
            throw new WrongTime;
        }
        const getShow = await this.showGateway.getShowWithBandByTimeRange(
            input.startTime,
            input.endTime,
            input.weekDate
        )

        if (getShow.length > 0) {
            throw new WrongTime;
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