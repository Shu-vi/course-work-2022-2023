import {IUser} from "../models/IUser";
import {IGroup} from "../models/IGroup";
import {ICity} from "../models/ICity";
import {IViewWallPost} from "../views/IViewWallPost";

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
                    reject(new Error('Ошибка при запросе к серверу вконтакте. Не удалось получить список пользователей'));
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
                    reject(new Error('Ошибка при запросе к серверу вконтакте. Не удалось получить список групп'));
                }
            })
        });
    }

    static fetchPostsByUserId(id: number): Promise<Array<IViewWallPost>> {
        return new Promise<Array<IViewWallPost>>((resolve, reject) => {
            //@ts-ignore
            VK.Api.call('wall.get', {
                owner_id: id,
                v: process.env.REACT_APP_API_V
            }, (r: any) => {
                if (r.response.items) {
                    resolve(r.response.items);
                } else {
                    reject(new Error('Ошибка при запросе к серверу вконтакте. Не удалось получить список постов'));
                }
            })
        });
    }

    static fetchCityById(id: number): Promise<Array<ICity>>{
        console.log(id)
        return new Promise<Array<ICity>>((resolve, reject) => {
            //@ts-ignore
            VK.Api.call('database.getCitiesById', {
                city_ids: id,
                v: process.env.REACT_APP_API_V
            }, (r: any) => {
                if (r.response) {
                    resolve(r.response);
                } else {
                    reject(new Error('Ошибка при запросе к серверу вконтакте. Не удалось получить город'));
                }
            })
        });
    }
}