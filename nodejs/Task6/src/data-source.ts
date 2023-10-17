import { DataSource } from "typeorm";

export const AppDataSource=new DataSource(
    {
        type: 'postgres',
        host: 'localhost',
        port:5432,
        username:'postgres',
        password:"12345678",
        database:'ibatech',
        synchronize:true,
        logging:true,
        entities:["./src/entities/*.ts"],
        subscribers:[],
        migrations:[],
    



    }
)