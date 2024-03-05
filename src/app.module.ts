import { Module } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/services/prisma.service';

@Module({
    imports: [],
    providers: [PrismaService],
    controllers: [],
})
export class AppModule {}
