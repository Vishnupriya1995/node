import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("tan_user")
export default class User{

    @PrimaryGeneratedColumn()
    id :bigint;

    @Column()
    username :string;

    @Column()
    password :string;

    @Column()
    email :string;  
    
    @Column()
    role :string;

    @Column()
    designation :string;

    @Column()
    status :string;

    @Column()
    deleted :boolean;

    @Column()
    createdby :string;

    @Column()
    createddate :Date;

    @Column()
    modifiedby :string;

    @Column()
    lastmodifieddate :Date;  
}