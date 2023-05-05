import React, {FC} from "react";
import {Table} from "react-bootstrap";
import {IViewUser} from "../views/IViewUser";
import {IViewUniversity} from "../views/IViewUniversity";
import {IViewSchool} from "../views/IViewSchool";

interface Props {
    users: IViewUser[];
}

const MyTable: FC<Props> = ({users}) => {
        if (!users.length) {
            return null;
        }
        const [user1, user2] = users;
        function intersection(arr1: any = [], arr2: any = [], compareFunc = (a: any, b: any): boolean => a === b) {
            return arr1.filter((item1: any) => arr2.some((item2: any) => compareFunc(item1, item2)));
        }

        function difference(arr1: any = [], arr2: any = [], compareFunc = (a: any, b: any): boolean => a === b) {
            return arr1.filter((item1: any) => !arr2.some((item2: any) => compareFunc(item1, item2)));
        }

        function univerCompareFunc(o1: IViewUniversity, o2: IViewUniversity) {
            return o1.city === o2.city && o1.name === o2.name && o1.chair_name === o2.chair_name && o1.faculty_name === o2.faculty_name;
        }

        function schoolCompareFunc(o1: IViewSchool, o2: IViewSchool) {
            return o1.name === o2.name && o1.city === o2.city;
        }

        function isNonNull(o: any): boolean {
            return o !== '' && o !== null && o !== undefined && o !== 0;
        }

        const intersectionLangs = intersection(user1.langs, user2.langs);
        const differenceLangs1 = difference(user1.langs, intersectionLangs);
        const differenceLangs2 = difference(user2.langs, intersectionLangs);

        const intersectionUnivers = intersection(user1.universities, user2.universities, univerCompareFunc);
        const differenceUnivers1 = difference(user1.universities, intersectionUnivers, univerCompareFunc);
        const differenceUnivers2 = difference(user2.universities, intersectionUnivers, univerCompareFunc);

        const intersectionSchools = intersection(user1.schools, user2.schools, schoolCompareFunc);
        const differenceSchool1 = difference(user1.schools, intersectionUnivers, univerCompareFunc);
        const differenceSchool2 = difference(user2.schools, intersectionUnivers, univerCompareFunc);

        const intersectionGroups = intersection(user1.groups, user2.groups);
        const differenceGroups1 = difference(user1.groups, intersectionGroups);
        const differenceGroups2 = difference(user2.groups, intersectionGroups);


        return (
            <>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th colSpan={3}>Различия</th>
                    </tr>
                    <tr>
                        <th>Атрибут</th>
                        <th>Id: {user1.id}</th>
                        <th>Id: {user2.id}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ((isNonNull(user1.first_name) || isNonNull(user2.first_name)) && user1.first_name !== user2.first_name) && (
                            <tr>
                                <td>Имя</td>
                                <td>{user1.first_name}</td>
                                <td>{user2.first_name}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.last_name) || isNonNull(user2.last_name)) && user1.last_name !== user2.last_name) && (
                            <tr>
                                <td>Фамилия</td>
                                <td>{user1.last_name}</td>
                                <td>{user2.last_name}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.country) || isNonNull(user2.country)) && user1.country !== user2.country) && (
                            <tr>
                                <td>Страна</td>
                                <td>{user1.country}</td>
                                <td>{user2.country}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.city) || isNonNull(user2.city)) && user1.city !== user2.city) && (
                            <tr>
                                <td>Город</td>
                                <td>{user1.city}</td>
                                <td>{user2.city}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.sex) || isNonNull(user2.sex)) && user1.sex !== user2.sex) && (
                            <tr>
                                <td>Пол</td>
                                <td>
                                    {
                                        user1.sex === 1 ? 'Женщина' :
                                            user1.sex === 2 ? 'Мужчина' :
                                                'неизвестно'
                                    }
                                </td>
                                <td>
                                    {
                                        user2.sex === 1 ? 'Женщина' :
                                            user2.sex === 2 ? 'Мужчина' :
                                                'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.alcohol) || isNonNull(user2.alcohol)) && user1.alcohol !== user2.alcohol) && (
                            <tr>
                                <td>Отношение к алкоголю</td>
                                <td>
                                    {
                                        user1.alcohol === 1 ? 'резко негативное' :
                                            user1.alcohol === 2 ? 'негативное' :
                                                user1.alcohol === 3 ? 'компромиссное' :
                                                    user1.alcohol === 4 ? 'нейтральное' :
                                                        user1.alcohol === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                                <td>
                                    {
                                        user2.alcohol === 1 ? 'резко негативное' :
                                            user2.alcohol === 2 ? 'негативное' :
                                                user2.alcohol === 3 ? 'компромиссное' :
                                                    user2.alcohol === 4 ? 'нейтральное' :
                                                        user2.alcohol === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.smoking) || isNonNull(user2.smoking)) && user1.smoking !== user2.smoking) && (
                            <tr>
                                <td>Отношение к курению</td>
                                <td>
                                    {
                                        user1.smoking === 1 ? 'резко негативное' :
                                            user1.smoking === 2 ? 'негативное' :
                                                user1.smoking === 3 ? 'компромиссное' :
                                                    user1.smoking === 4 ? 'нейтральное' :
                                                        user1.smoking === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                                <td>
                                    {
                                        user2.smoking === 1 ? 'резко негативное' :
                                            user2.smoking === 2 ? 'негативное' :
                                                user2.smoking === 3 ? 'компромиссное' :
                                                    user2.smoking === 4 ? 'нейтральное' :
                                                        user2.smoking === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.religion) || isNonNull(user2.religion)) && user1.religion !== user2.religion) && (
                            <tr>
                                <td>Религия</td>
                                <td>{user1.religion}</td>
                                <td>{user2.religion}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.life_main) || isNonNull(user2.life_main)) && user1.life_main !== user2.life_main) && (
                            <tr>
                                <td>Главное в жизни</td>
                                <td>
                                    {
                                        user1.life_main === 1 ? 'семья и дети' :
                                            user1.life_main === 2 ? 'карьера и деньги' :
                                                user1.life_main === 3 ? 'развлечения и отдых' :
                                                    user1.life_main === 4 ? 'наука и исследования' :
                                                        user1.life_main === 5 ? 'совершенствование мира' :
                                                            user1.life_main === 6 ? 'саморазвитие' :
                                                                user1.life_main === 7 ? 'красота и искусство' :
                                                                    user1.life_main === 8 ? 'слава и влияние' :
                                                                        'неизвестно'
                                    }
                                </td>
                                <td>
                                    {
                                        user2.life_main === 1 ? 'семья и дети' :
                                            user2.life_main === 2 ? 'карьера и деньги' :
                                                user2.life_main === 3 ? 'развлечения и отдых' :
                                                    user2.life_main === 4 ? 'наука и исследования' :
                                                        user2.life_main === 5 ? 'совершенствование мира' :
                                                            user2.life_main === 6 ? 'саморазвитие' :
                                                                user2.life_main === 7 ? 'красота и искусство' :
                                                                    user2.life_main === 8 ? 'слава и влияние' :
                                                                        'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.bdate) || isNonNull(user2.bdate)) && user1.bdate !== user2.bdate) && (
                            <tr>
                                <td>Дата рождения</td>
                                <td>{user1.bdate}</td>
                                <td>{user2.bdate}</td>
                            </tr>
                        )
                    }
                    {
                        (differenceLangs1.length > 0 || differenceLangs2.length > 0) && (
                            <tr>
                                <td>Языки</td>
                                <td>{differenceLangs1.map((lang: any) => (<p key={lang}>{lang}</p>))}</td>
                                <td>{differenceLangs2.map((lang: any) => (<p key={lang}>{lang}</p>))}</td>
                            </tr>
                        )
                    }
                    {
                        (differenceUnivers1.length > 0 || differenceUnivers2.length > 0) && (
                            <tr>
                                <td>Университет</td>
                                <td>{differenceUnivers1.map((univer: any) => (
                                    <p key={`${user1.id}-univer`}>Город: {univer.city}<br/>Название: {univer.name}<br/>
                                        Направление: {univer.chair_name ? univer.chair_name : 'неизвестно'}<br/>Институт: {univer.faculty_name ? univer.faculty_name : 'неизвестно'}
                                    </p>
                                ))}</td>
                                <td>{differenceUnivers2.map((univer: any) => (
                                    <p key={`${user2.id}-univer`}>Город: {univer.city}<br/>Название: {univer.name}<br/>
                                        Направление: {univer.chair_name ? univer.chair_name : 'неизвестно'}<br/>Институт: {univer.faculty_name ? univer.faculty_name : 'неизвестно'}
                                    </p>
                                ))}</td>
                            </tr>
                        )
                    }
                    {
                        (differenceSchool1.length > 0 || differenceSchool2.length > 0) && (
                            <tr>
                                <td>Школа</td>
                                <td>{differenceSchool1.map((school: any) => (
                                    <p key={`${user1.id}-${school.name}`}>Город: {school.city}<br/>Название: {school.name}
                                    </p>))}
                                </td>
                                <td>{differenceSchool2.map((school: any) => (
                                    <p key={`${user1.id}-${school.name}`}>Город: {school.city}<br/>Название: {school.name}
                                    </p>))}
                                </td>
                            </tr>
                        )
                    }
                    {
                        (differenceGroups1.length > 0 || differenceGroups2.length > 0) && (
                            <tr>
                                <td>Сообщества</td>
                                <td>{differenceGroups1.map((title: String) => (
                                    <p key={`${user1.id}-${title}`}>{title}<br/>
                                    </p>))}
                                </td>
                                <td>{differenceGroups2.map((title: String) => (
                                    <p key={`${user1.id}-${title}`}>{title}<br/>
                                    </p>))}
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                {/*-----------------------------------------------------------------------------------------------------------*/}
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th colSpan={2}>Общее</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>Атрибут</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ((isNonNull(user1.first_name) || isNonNull(user2.first_name)) && user1.first_name === user2.first_name) && (
                            <tr>
                                <td>Имя</td>
                                <td>{user1.first_name}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.last_name) || isNonNull(user2.last_name)) && user1.last_name === user2.last_name) && (
                            <tr>
                                <td>Фамилия</td>
                                <td>{user1.last_name}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.country) || isNonNull(user2.country)) && user1.country === user2.country) && (
                            <tr>
                                <td>Страна</td>
                                <td>{user1.country}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.city) || isNonNull(user2.city)) && user1.city === user2.city) && (
                            <tr>
                                <td>Город</td>
                                <td>{user1.city}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.sex) || isNonNull(user2.sex)) && user1.sex === user2.sex) && (
                            <tr>
                                <td>Пол</td>
                                <td>
                                    {
                                        user1.sex === 1 ? 'Женщина' :
                                            user1.sex === 2 ? 'Мужчина' :
                                                'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.alcohol) || isNonNull(user2.alcohol)) && user1.alcohol === user2.alcohol) && (
                            <tr>
                                <td>Отношение к алкоголю</td>
                                <td>
                                    {
                                        user1.alcohol === 1 ? 'резко негативное' :
                                            user1.alcohol === 2 ? 'негативное' :
                                                user1.alcohol === 3 ? 'компромиссное' :
                                                    user1.alcohol === 4 ? 'нейтральное' :
                                                        user1.alcohol === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.smoking) || isNonNull(user2.smoking)) && user1.smoking === user2.smoking) && (
                            <tr>
                                <td>Отношение к курению</td>
                                <td>
                                    {
                                        user1.smoking === 1 ? 'резко негативное' :
                                            user1.smoking === 2 ? 'негативное' :
                                                user1.smoking === 3 ? 'компромиссное' :
                                                    user1.smoking === 4 ? 'нейтральное' :
                                                        user1.smoking === 5 ? 'положительное' :
                                                            'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.religion) || isNonNull(user2.religion)) && user1.religion === user2.religion) && (
                            <tr>
                                <td>Религия</td>
                                <td>{user1.religion}</td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.life_main) || isNonNull(user2.life_main)) && user1.life_main === user2.life_main) && (
                            <tr>
                                <td>Главное в жизни</td>
                                <td>
                                    {
                                        user1.life_main === 1 ? 'семья и дети' :
                                            user1.life_main === 2 ? 'карьера и деньги' :
                                                user1.life_main === 3 ? 'развлечения и отдых' :
                                                    user1.life_main === 4 ? 'наука и исследования' :
                                                        user1.life_main === 5 ? 'совершенствование мира' :
                                                            user1.life_main === 6 ? 'саморазвитие' :
                                                                user1.life_main === 7 ? 'красота и искусство' :
                                                                    user1.life_main === 8 ? 'слава и влияние' :
                                                                        'неизвестно'
                                    }
                                </td>
                            </tr>
                        )
                    }
                    {
                        ((isNonNull(user1.bdate) || isNonNull(user2.bdate)) && user1.bdate === user2.bdate) && (
                            <tr>
                                <td>Дата рождения</td>
                                <td>{user1.bdate}</td>
                            </tr>
                        )
                    }
                    {
                        (intersectionLangs.length > 0) && (
                            <tr>
                                <td>Языки</td>
                                <td>{intersectionLangs.map((lang: any) => (<p key={lang}>{lang}</p>))}</td>
                            </tr>
                        )
                    }
                    {
                        (intersectionUnivers.length > 0) && (
                            <tr>
                                <td>Университет</td>
                                <td>{intersectionUnivers.map((univer: any) => (
                                    <p key={`${user1.id}-univer`}>Город: {univer.city}<br/>Название: {univer.name}<br/>
                                        Направление: {univer.chair_name ? univer.chair_name : 'неизвестно'}<br/>Институт: {univer.faculty_name ? univer.faculty_name : 'неизвестно'}
                                    </p>))}</td>
                            </tr>
                        )
                    }
                    {
                        (intersectionSchools.length > 0) && (
                            <tr>
                                <td>Школа</td>
                                <td>{intersectionSchools.map((school: any) => (
                                    <p key={`${user1.id}-${school.name}`}>Город: {school.city}<br/>Название: {school.name}
                                    </p>))}
                                </td>
                                <td>{differenceSchool2.map((school: any) => (
                                    <p key={`${user1.id}-${school.name}`}>Город: {school.city}<br/>Название: {school.name}
                                    </p>))}
                                </td>
                            </tr>
                        )
                    }
                    {
                        (intersectionGroups.length > 0) && (
                            <tr>
                                <td>Сообщества</td>
                                <td>{intersectionGroups.map((title: any) => (
                                    <p key={`${user1.id}-${title}`}>{title}<br/>
                                    </p>))}
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </>
        );
    }
;

export default MyTable;
