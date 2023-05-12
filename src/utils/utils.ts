import {IUser} from "../models/IUser";
import {IViewUser} from "../views/IViewUser";
import {IViewSchool} from "../views/IViewSchool";
import {IViewUniversity} from "../views/IViewUniversity";
import {IGroup} from "../models/IGroup";
import UserService from "../api/UserService";
import {IViewWallPost} from "../views/IViewWallPost";

export class Utils {

    public static async userModelToView(user: IUser, groups: IGroup[] = [], posts: IViewWallPost[] = []): Promise<IViewUser> {
        const viewSchool: Array<IViewSchool> = [];
        const groupsView = this.groupsModelToView(groups);
        if (user.schools) {
            for (const value of user.schools) {
                const cities = await UserService.fetchCityById(value.city);
                const cityTitle = cities[0].title;
                viewSchool.push({
                    city: cityTitle,
                    name: value.name
                });
            }
        }
        const viewUniversity: Array<IViewUniversity> = [];
        if (user.universities) {
            for (const value of user.universities) {
                const cities = await UserService.fetchCityById(value.city);
                const cityTitle = cities[0].title;
                viewUniversity.push({
                    city: cityTitle,
                    name: value.name,
                    chair_name: value.chair_name,
                    faculty_name: value.faculty_name
                });
            }
        }
        const postsView = posts.map(post => {
            return {
                id: post.id,
                from_id: post.from_id,
                likes: {
                    count: post.likes.count
                }
            }
        })
        return {
            id: user.id,
            city: user.city?.title,
            country: user.country?.title,
            alcohol: user.personal?.alcohol,
            bdate: user.bdate,
            deactivated: user.deactivated,
            langs: user.personal?.langs,
            first_name: user.first_name,
            last_name: user.last_name,
            life_main: user.personal?.life_main,
            sex: user.sex,
            religion: user.personal?.religion,
            smoking: user.personal?.smoking,
            schools: viewSchool,
            universities: viewUniversity,
            groups: groupsView,
            posts: postsView
        };
    }

    public static groupsModelToView(groups: IGroup[]): string[] {
        return groups.map(group => group.name);
    }
}