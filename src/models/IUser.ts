import {ICity} from "./ICity";
import {ICountry} from "./ICountry";
import {IPersonal} from "./IPersonal";
import {IUniversity} from "./IUniversity";
import {ISchool} from "./ISchool";

export interface IUser {
    id: number;
    bdate?: string;
    city?: ICity;
    country?: ICountry;
    quotes?: string;
    personal?: IPersonal;
    universities?: IUniversity[];
    schools?: ISchool[];
    sex: number;
    first_name: string;
    last_name: string;
    can_access_closed: boolean;
    is_closed: boolean;
}