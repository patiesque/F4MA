import { BaseError } from "./baseError";

export class CheckAfter extends BaseError {
    constructor() {
        super(404, "Check after 8")
    }
}