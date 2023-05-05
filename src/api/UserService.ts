import {IUser} from "../models/IUser";
import {IGroup} from "../models/IGroup";

export default class UserService {
    static fetchUsers(ids: string[]): Promise<Array<IUser>> {
        return new Promise<Array<IUser>>((resolve, reject) => {
            //@ts-ignore
            VK.Api.call('users.get', {
                user_ids: ids,
                v: process.env.REACT_APP_API_V,
                fields: ["bdate", "city", "country", "sex", "schools", "personal", "universities"]
            }, (r: any) => {
                if (r.response) {
                    resolve(r.response);
                } else {
                    reject(new Error('Failed to fetch users'));
                }
            });
        });
    }

    static fetchGroupsByUserId(id: number): Promise<Array<IGroup>> {
        return new Promise<Array<IGroup>>((resolve, reject) => {
            //@ts-ignore
            VK.Api.call('groups.get', {
                user_id: id,
                extended: 1,
                v: process.env.REACT_APP_API_V,
                fields: "all"
            }, (r: any) => {
                if (r.response.items) {
                    resolve(r.response.items);
                } else {
                    reject(new Error('Failed to fetch groups users'));
                }
            })
        });
    }
}