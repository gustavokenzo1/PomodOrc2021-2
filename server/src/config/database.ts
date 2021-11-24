import * as mongoose from "mongoose";


const databaseConnect = async () => {
    try {
        await mongoose.connect(
            await process.env.DATABASE_URL || 'mongodb+srv://orcestra:orcestra@pomodorc.4jqla.mongodb.net/Pomodorc?retryWrites=true&w=majority',
            (err) => {
                if (!err) {
                    console.log("Conexão estabelecida com sucesso com o MongoDB");
                } else {
                    console.log(
                        `Falhou a estabelecer a conexão com o MongoDB, falhou com erro: ${err}`
                        );
                    }
                }
                );
    } catch (error) {
        console.log('Não foi possível inicicializar corretamente a base de dados!');
        console.log(error);
    }
}
        
export default databaseConnect;