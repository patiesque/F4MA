import { BandGateway } from "../../gateways/bandGateway";
import { Band } from "../../entities/band";
import { NotFound } from "../../Error/notFound";

export class GetBandUC {
    constructor(private bandGateway: BandGateway) { }

    async execute(input: GetBandInput): Promise<GetBandOutput> {
        let band: Band | undefined

        if (input.id) {
            band = await this.bandGateway.getBandById(input.id)
        } else if (input.name) {
            band = await this.bandGateway.getBandByName(input.name)
        }

        if (!band) {
            throw new NotFound;
        }

        return {
            id: band.getId(),
            name: band.getName(),
            musicGenre: band.getMusicGenre(),
            responsible: band.getResponsible(),
        };
    }
}

export interface GetBandOutput {
    id: string;
    name: string;
    musicGenre: string;
    responsible: string;
}

export interface GetBandInput {
    id: string;
    name: string;
}