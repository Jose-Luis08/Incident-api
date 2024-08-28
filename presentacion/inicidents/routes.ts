import { Router } from "express";
import { IncidentController } from "./controller";
import { IncidentRoutes } from "../routes";

export class AppRoutes {
    static get routes() : Router {
        const router = Router();
        router.use('/api/incidents', IncidentRoutes.routes)
        return router;
    }
}