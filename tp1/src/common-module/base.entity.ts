/* eslint-disable prettier/prettier */

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {
    
    @CreateDateColumn({
        update: false,
        type: 'datetime',
    })
    createdAt: Date;
    @UpdateDateColumn({
        type: 'datetime'
    })
    updateAt: Date;
    @DeleteDateColumn({
        type: 'datetime'
    })
    deletedAt: Date;

}