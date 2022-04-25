import { Support } from './../models/support.model';
import { User } from "../models/user.model";

export interface SingleUserDto {
    data: User,
    support: Support
}
