import  express,{Request, Response}  from "express"
import { envs } from "./config/envs";
import { MongoDatabase } from "./data/model/init";
import { IncidentModel } from "./data/model/incident.model";
import { AppRoutes } from "../presentacion/inicidents/routes";

console.log(envs.PORT)

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);


(async () => 
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB    
}))()




/*
app.get("/", async (req:Request, res:Response)=>{

    try{

        //res.send("Hola a todos");
        const incidents = await IncidentModel.find();
        res.json(incidents); 
    }
    catch(error){

    }

})

app.post('/', async (req:Request, res:Response) => {
    try {
        const {title, description, lat, lng} = req.body;
        const newIncident = await IncidentModel.create({
            title, description, lat, lng});

        return res.json(newIncident);
    }
    catch (error) {
        console.error(error)

    }
});

*/
app.listen(envs.PORT, ()=>{
    console.log("Server running on port 3000")
})