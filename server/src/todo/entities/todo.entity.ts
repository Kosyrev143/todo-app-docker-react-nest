import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    date:string

    @Column()
    completed:boolean

    @ManyToOne(() => User, (user) => user.todos)
    user:User
}
