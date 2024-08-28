import { Router } from "express";
import { Request, Response} from "express"
import { IncidentController } from "./inicidents/controller";

export class IncidentRoutes {
    static get routes() : Router{
        const router = Router();
        const incidentController = new IncidentController();
        router.get("/", incidentController.getIncident);
        router.post("/", incidentController.createIncident);
        router.get("/:id", incidentController.getIncidentById);
        router.put("/:id", incidentController.updateIncident);
        router.delete("/:id", incidentController.deleteIncident);


        return router;
    }
}