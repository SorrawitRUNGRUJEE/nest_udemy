import {OneToMany,AfterInsert,AfterUpdate, AfterRemove, Entity,Column,PrimaryGeneratedColumn} from "typeorm"
import { Exclude} from 'class-transformer'
import { Report } from "src/reports/report.entity"; 
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @OneToMany(()=> Report,(report)=> report.User)
    reports:Report[]

    @AfterInsert()
    loginInsert(){
        console.log(`user inserted with ${this.id}`)
    }
    @AfterUpdate()
    loginUpdate(){
        console.log(`user updated with if${this.id}`)
    }
    @AfterRemove()
    loginRemove(){
        console.log(`removed with id${this.id}`)
    }
}