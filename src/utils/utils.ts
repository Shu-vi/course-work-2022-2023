import {IUser} from "../models/IUser";
import {IViewUser} from "../views/IViewUser";
import {IViewSchool} from "../views/IViewSchool";
import {IViewUniversity} from "../views/IViewUniversity";
import {IGroup} from "../models/IGroup";

export class Utils {

    public static userModelToView(user: IUser, groups: IGroup[] = []): IViewUser {
        const viewSchool: Array<IViewSchool> = [];
        const groupsView = this.groupsModelToView(groups);
        user.schools?.forEach(value => {
            viewSchool.push({
                city: value.city,
                name: value.name
            });
        });
        const viewUniversity: Array<IViewUniversity> = [];
        user.universities?.forEach(value => {
            viewUniversity.push({
                city: value.city,
                name: value.name,
                chair_name: value.chair_name,
                faculty_name: value.faculty_name
            });
        });
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
            groups: groupsView
        };
    }

    public static groupsModelToView(groups: IGroup[]): string[] {
        return groups.map(group => group.name);
    }
}