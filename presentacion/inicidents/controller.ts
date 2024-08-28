import { IncidentModel } from "../../src/data/model/incident.model";
import {Request, Response}  from "express"

export class IncidentController{

    public getIncident = async(req: Request, res: Response)=>{
        try{
            //res.send("Hola a todos");
            const incidents = await IncidentModel.find();
            res.json(incidents); 
        }
        catch(error){
    
        }

    }

    public createIncident = async (req: Request, res: Response)=> {

        try {
            const {title, description, lat, lng} = req.body;
            const newIncident = await IncidentModel.create({
                title, description, lat, lng});
    
            return res.json(newIncident);
        }
        catch (error) {
            console.error(error)
    
        }

    }

    public getIncidentById = async (req: Request, res: Response) => {

        const { id } = req.params;

        try{
            const incident = await IncidentModel.findById(id);
            res.json(incident);
        }
        catch(error){
            console.error(error)
        }

    }

    public updateIncident = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { title, description, lat, lng} = req.body;

        try{
            const incident = await IncidentModel.findByIdAndUpdate(id, {
                title,
                description,
                lat,
                lng
            });
            res.json(incident);
        }
        catch(error){
            console.error(error)
        }

    }

    public deleteIncident = async (req: Request, res: Response) => {

        const { id } = req.params;

        try{
            const incident = await IncidentModel.findByIdAndDelete(id);
            res.json("Registro guardado");
        }
        catch(error){
            console.error(error)
        }


    }
}