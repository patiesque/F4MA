import { ShowGateway } from "../../gateways/showGateway";
import { ShowWeekDay, Show } from "../../entities/show";
import { NotFound } from "../../Error/notFound";

export class GetShowUC {
    constructor(private ShowGateway: ShowGateway) { }

    async execute(input: GetShowInput): Promise<GetShowsOutput> {
        const show = await this.ShowGateway.getShowsByDay(input.weekDate)

        if (!show) {
            throw new NotFound;
        }

        return {
            shows: show.map(show => {
                return {
                    weekDate: show.getWeekDate(),
                    startTime: show.getStartTime(),
                    endTime: show.getEndTime(),
                    bandId: show.getBandId(),
                }
            })
        };
    }
}

export interface GetShowInput {
    weekDate: ShowWeekDay;
}

export interface GetShowsOutput {
    shows: GetShowOutput[]
}
export interface GetShowOutput {
    weekDate: ShowWeekDay,
    startTime: number,
    endTime: number,
    bandId: string
}