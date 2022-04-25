import { Support } from './../models/support.model';
import { User } from "../models/user.model";

export interface UsersListDto {
    page: number,
    per_page: number,
    total_pages: number,
    data: User[],
    support: Support
}
