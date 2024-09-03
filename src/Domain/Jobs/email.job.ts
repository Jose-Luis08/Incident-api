import cron from 'node-cron';
import { IncidentModel } from '../../data/model/incident.model';
import { EmailService } from '../Service/email.service';
import { IncidentDataSource} from '../datasources/incident.datasources';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = ()=>{

    const incidentDataSource = new IncidentDataSource();
    const emailService = new EmailService();

    cron.schedule('*/10 * * * * *', async ()=>{
        try {

            const incidents = await IncidentModel.find({isEmailSent:false});
            if(!incidents.length){
                console.log("No hay incidentes pendientes de enviar");
                return;
            }
            console.log(`Procesando ${incidents.length} incidents.`);


            await Promise.all(
                incidents.map(async(incident)=>{

                    const htmlBody = generateIncidentEmailTemplate(
                        incident.title,
                        incident.description,
                        incident.lat,
                        incident.lng
                    )

                    await emailService.sendEmail({
                        to: "joseluis.reyeschavez@gmail.com",
                        subject: `Incidents: ${incident.description}`,
                        htmlBody: htmlBody
                    });
                    
                    console.log(`Email enviado para el incidente con el id: ${incident.id}`);

                    await incidentDataSource.updateIncident(incident._id.toString(), {...incident, isEmailSent: true })

                    //await IncidentModel.findByIdAndUpdate(incident._id,{...incident, setEmailSent:true});
                    console.log(`Incident actualizado para el ID: ${incident._id}`);
    
                    })

            )

        } catch (error) {
            console.log("Error durante el trabajo de envio de correos");

        }
    });

}