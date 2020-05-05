import { BaseError } from "./baseError";

export class CheckBefore extends BaseError {
    constructor() {
        super(404, "Check before 23")
    }
}