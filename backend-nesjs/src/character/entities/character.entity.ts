import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    species: string;

    @Column({nullable: true})
    type: string;

    @Column()
    gender: string;

    @Column({name: 'origin_name', nullable: true})
    originname: string;

    @Column({name: 'origin_url', nullable: true})
    originURL: string;
    

    @Column({name: 'location_name', nullable: true})
    locationname: string;

    @Column({name: 'location_url', nullable: true})
    locationURL: string;

    @Column()
    image: string;

    @Column('simple-array', {nullable: true})
    episode: string[];

}
