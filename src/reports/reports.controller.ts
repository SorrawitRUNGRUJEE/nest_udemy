import { Controller,Post,Body } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('reports')
export class ReportsController {
constructor( private reportsService : ReportsService){}


    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto){
        return this.reportsService.create(body)

    }

}
