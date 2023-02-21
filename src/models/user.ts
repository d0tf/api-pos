import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { AvatarGenerator } from 'random-avatar-generator';

export interface User {
    uuid: string;
    pfpUrl: string;
    name: string;
    username: string;
    password: string;
    roles: 'admin' | 'cashier';
}

const avatarGEnerator = new AvatarGenerator();

const userSchema = new Schema(
    {
        uuid: {
            type: String,
            unique: true,
            default: uuidv4(),
        },
        pfpUrl: {
            type: String,
            default: avatarGEnerator.generateRandomAvatar() as string,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            required: true,
            enum: ['admin', 'cashier'],
            default: 'cashier',
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);
