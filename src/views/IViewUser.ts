import {IViewSchool} from "./IViewSchool";
import {IViewUniversity} from "./IViewUniversity";
import {IViewWallPost} from "./IViewWallPost";

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
    langs: string[] | undefined;
    life_main: number | undefined;
    religion: string | undefined;
    smoking: number | undefined;
    groups: string[] | undefined;
    posts: IViewWallPost[];
}