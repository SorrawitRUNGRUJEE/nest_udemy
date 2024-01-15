import {AfterInsert,AfterUpdate, AfterRemove, Entity,Column,PrimaryGeneratedColumn} from "typeorm"
import { Exclude} from 'class-transformer'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

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