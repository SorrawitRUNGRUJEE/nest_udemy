import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {plainToClass} from 'class-transformer'


interface ClassConstructor {
    new (...args:any[]) : {}
}
export function serialize(dto:ClassConstructor){
    return UseInterceptors( new SerializeInterceptors( dto))
}
export class SerializeInterceptors implements NestInterceptor {
    constructor( private dto: any){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        // Run somthring before a request is handled
        return next.handle().pipe(
            map((data:any)=>{
            //run after the request is handled
            return plainToClass(this.dto,data, {
                excludeExtraneousValues: true
            })
            })
        )
    }
}