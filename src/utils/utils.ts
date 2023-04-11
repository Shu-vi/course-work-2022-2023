import {IUser} from "../models/IUser";
import {IViewUser} from "../views/IViewUser";
import {IViewSchool} from "../views/IViewSchool";
import {IViewUniversity} from "../views/IViewUniversity";

export class Utils {

    public static userModelToView(user: IUser): IViewUser {
        const viewSchool: Array<IViewSchool> = [];
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
        const viewUser: IViewUser = {
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
            inspired_by: user.personal?.inspired_by,
            political: user.personal?.political,
            religion: user.personal?.religion,
            smoking: user.personal?.smoking,
            people_main: user.personal?.people_main,
            schools: viewSchool,
            universities: viewUniversity
        };
        return viewUser;
    }
}