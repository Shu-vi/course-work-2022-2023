import React, {FC} from 'react';
import {IViewUser} from "../views/IViewUser";
import {Table} from "react-bootstrap";

interface Props {
    users: IViewUser[];
}

const MyTableOneField: FC<Props> = ({users}) => {
    if (!users.length) {
        return null;
    }
    const [user1] = users;

    function isNonNull(o: any): boolean {
        return o !== '' && o !== null && o !== undefined && o !== 0;
    }


    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Атрибут</th>
                <th>Id: {user1.id}</th>
            </tr>
            </thead>
            <tbody>
            {
                (isNonNull(user1.first_name)) && (
                    <tr>
                        <td>Имя</td>
                        <td>{user1.first_name}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.last_name)) && (
                    <tr>
                        <td>Фамилия</td>
                        <td>{user1.last_name}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.country)) && (
                    <tr>
                        <td>Страна</td>
                        <td>{user1.country}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.city)) && (
                    <tr>
                        <td>Город</td>
                        <td>{user1.city}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.sex)) && (
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
                (isNonNull(user1.alcohol)) && (
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
                (isNonNull(user1.smoking)) && (
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
                (isNonNull(user1.religion)) && (
                    <tr>
                        <td>Религия</td>
                        <td>{user1.religion}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.life_main)) && (
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
                (isNonNull(user1.bdate)) && (
                    <tr>
                        <td>Дата рождения</td>
                        <td>{user1.bdate}</td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.langs) && user1.langs?.length !== 0) && (
                    <tr>
                        <td>Языки</td>
                        <td>
                            {
                                user1.langs?.map(lang => (<p key={lang}>{lang}</p>))
                            }
                        </td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.universities) && user1.universities?.length !== 0) && (
                    <tr>
                        <td>Университет</td>
                        <td>
                            {
                                user1.universities?.map(univer => (
                                    <p key={`${user1.id}-univer`}>Город: {univer.city}<br/>Название: {univer.name}<br/>
                                        Направление: {univer.chair_name ? univer.chair_name : 'неизвестно'}<br/>Институт: {univer.faculty_name ? univer.faculty_name : 'неизвестно'}
                                    </p>
                                ))
                            }
                        </td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.schools) && user1.schools?.length !== 0) && (
                    <tr>
                        <td>Школа</td>
                        <td>
                            {
                                user1.schools?.map(school => (
                                    <p key={`${user1.id}-${school.name}`}>Город: {school.city}<br/>Название: {school.name}
                                    </p>))
                            }
                        </td>
                    </tr>
                )
            }
            {
                (isNonNull(user1.groups) && user1.groups?.length !== 0) && (
                    <tr>
                        <td>Сообщества</td>
                        <td>
                            {
                                user1.groups?.map(title => (
                                    <p key={`${user1.id}-${title}`}>{title}<br/>
                                    </p>))
                            }
                        </td>
                    </tr>
                )
            }
            </tbody>
        </Table>
    );
};

export default MyTableOneField;