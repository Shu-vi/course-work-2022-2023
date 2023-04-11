import {ILangFull} from "./ILangFull";

export interface IPersonal{
    alcohol: number;
    inspired_by: string;
    langs: string[];
    langs_full: ILangFull[];
    life_main: number;
    people_main: number;
    political: number;
    religion: string;
    smoking: number;
}