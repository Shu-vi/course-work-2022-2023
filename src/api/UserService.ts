import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(ids: string[]): Promise<Array<IUser>> {
        return new Promise<Array<IUser>>((resolve, reject) => {
            //@ts-ignore
            VK.Api.call('users.get', {
                user_ids: ids,
                v: process.env.REACT_APP_API_V,
                fields: ["bdate", "city", "country", "sex", "schools", "personal", "quotes", "universities"]
            }, (r: any) => {
                if (r.response) {
                    resolve(r.response);
                } else {
                    reject(new Error('Failed to fetch users'));
                }
            });
        });
    }
}