import React, {FC, ReactNode} from "react";
import {Table} from "react-bootstrap";
import {IViewUser} from "../views/IViewUser";

interface Props {
    users: IViewUser[];
    title: string;
}

const MyTable: FC<Props> = ({title, users}) => {
    if (users.length === 0) {
        return null;
    }

    // Создаем две отдельные таблицы для различий и полных совпадений
    const differentTableRows: ReactNode[] = [];
    const matchingTableRows: ReactNode[] = [];

    // Ищем все уникальные свойства, которые есть у пользователей
    const uniqueProperties = Array.from(
        new Set(users.flatMap((user) => Object.keys(user)))
    );
    // Для каждого уникального свойства создаем строку таблицы
    uniqueProperties.forEach((property) => {
        // Получаем значения этого свойства у всех пользователей
        // @ts-ignore
        const propertyValues = users.map((user) => user[property]);

        // Если все значения одинаковы, то это полное совпадение, иначе - различие
        const isMatching: boolean = propertyValues.every(
            (value, index, array) => {
                return value === array[0];
            }
        );

        // @ts-ignore
        if (isMatching && (users[0][property] === undefined || users[0][property] === '')) {
            return;
        }

        // Создаем ячейки для каждого пользователя
        // @ts-ignore
        const cells = users.map((user) => {
            // @ts-ignore
            let content = user[property];
            if (property === 'langs') {
                return (<td key={`${user.id}-${property}`}>
                    {user.langs?.map(lang => {
                            return (<>
                                {lang} <br/>
                            </>)
                        }
                    )}
                </td>)
            } else if (property === 'schools') {
                return (<td key={`${user.id}-${property}`}>
                    {user.schools?.map(school => {
                            return (<>
                                Город: {school.city} <br/>
                                Название: {school.name}<br/>
                                <br/>
                            </>)
                        }
                    )}
                </td>)
            } else if(property === 'universities') {
                return (<td key={`${user.id}-${property}`}>
                    {user.universities?.map(university => {
                            return (<>
                                Город: {university.city} <br/>
                                Название: {university.name}<br/>
                                Институт: {university.faculty_name}<br/>
                                Направление: {university.chair_name}<br/>
                                <br/>
                            </>)
                        }
                    )}
                </td>)
            } else {
                return (<td key={`${user.id}-${property}`}>{content}</td>);
            }

        });

        // Создаем строку таблицы
        const row = (
            <tr key={property}>
                <td>{property}</td>
                {cells}
            </tr>
        );

        // Добавляем строку в нужную таблицу
        if (isMatching) {
            matchingTableRows.push(row);
        } else {
            differentTableRows.push(row);
        }
    });
    // Возвращаем две таблицы
    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th colSpan={users.length + 1}>{title} (различия)</th>
                </tr>
                <tr>
                    <th>Атрибут</th>
                    {users.map((user) => (
                        <th key={user.id}>id: {user.id}</th>
                    ))}
                </tr>
                </thead>
                <tbody>{differentTableRows}</tbody>
            </Table>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th colSpan={users.length + 1}>{title} (полное совпадение)</th>
                </tr>
                <tr>
                    <th>Атрибут</th>
                    {users.map((user) => (
                        <th key={user.id}>id: {user.id}</th>
                    ))}
                </tr>
                </thead>
                <tbody>{matchingTableRows}</tbody>
            </Table>
        </>
    );
};

export default MyTable;
