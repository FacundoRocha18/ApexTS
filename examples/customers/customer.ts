import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "@apex.ts";
import { ICustomer } from "./types";

@Entity({ name: "customers" })
export class Customer implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @DeleteDateColumn()
  deleted_at: Date;
}
