import {IViewSchool} from "./IViewSchool";
import {IViewUniversity} from "./IViewUniversity";

export interface IViewUser {
    id: number;
    bdate?: string;
    city?: string;
    country?: string;
    universities?: IViewUniversity[];
    schools?: IViewSchool[];
    sex: number;
    first_name: string;
    last_name: string;
    deactivated?: boolean;
    alcohol: number | undefined;
    inspired_by: string | undefined;
    langs: string[] | undefined;
    life_main: number | undefined;
    people_main: number | undefined;
    political: number | undefined;
    religion: string | undefined;
    smoking: number | undefined;
}