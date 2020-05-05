import express, { Request, Response } from "express";
import { createBandEndpoint } from "./endpoints/band/createband";
import { getBandEndpoint } from "./endpoints/band/getBand";
import { createShowEndpoint } from "./endpoints/show/createShow";
import { getShowEndpoint } from "./endpoints/show/getShow";

const app = express();
app.use(express.json());

app.post("/createband", createBandEndpoint);
app.get("/getband", getBandEndpoint);

app.post("/createshow", createShowEndpoint);
app.get("/getshow", getShowEndpoint);

export default app;
