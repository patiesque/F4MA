import { BandGateway } from "../../gateways/bandGateway";
import { v4 } from "uuid";
import { Band } from "../../entities/band";

export class CreateBandUC {
    constructor(private bandGateway: BandGateway) { }

    public async execute(input: CreateBandUCInput): Promise<CreateBandUCOutput> {
        const id = v4();

        const band = new Band(
            id,
            input.name,
            input.music_genre,
            input.responsible
        )

        await this.bandGateway.createBand(band)

        return {
            message: "Successfully Created"
        }
    }
}

export interface CreateBandUCInput {
    name: string;
    music_genre: string;
    responsible: string;
}

export interface CreateBandUCOutput {
    message: string;
}