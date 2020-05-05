import { BaseError } from "./baseError";

export class WrongTime extends BaseError {
    constructor() {
        super(404, "Wrong time")
    }
}