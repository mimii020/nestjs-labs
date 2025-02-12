/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { SeedService } from "./seed.service";

async function bootstrap() {
    try {
        const app = await NestFactory.createApplicationContext(AppModule);
    
        const seedService = app.get(SeedService);
        seedService.seedDatabase();
    
        console.log("database seeded successfully!");
        
        await app.close();

    } catch (error) {
        console.error("failed to seed db", error)
    }
}

bootstrap().catch(() => console.error("couldnt seed the databse"));