import React, {FC, ReactNode} from "react";
import {Table} from "react-bootstrap";
import {IUser} from "../models/IUser";

interface Props {
    users: IUser[];
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
        const isMatching = propertyValues.every(
            (value, index, array) => value === array[0]
        );

        // Создаем ячейки для каждого пользователя
        // @ts-ignore
        const cells = users.map((user) => <td key={`${user.id}-${property}`}>{JSON.stringify(user[property])}</td>);

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
