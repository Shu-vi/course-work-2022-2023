import React, {FC, useEffect, useState} from "react";
import {InputForm} from "./components/InputForm";
import UserService from "./api/UserService";
import MyTableTwoField from "./components/MyTableTwoField";
import {IViewUser} from "./views/IViewUser";
import {Utils} from "./utils/utils";
import {IUser} from "./models/IUser";
import {Modal, Spinner} from "react-bootstrap";
import MyTabs from "./components/MyTabs";
import MyTableOneField from "./components/MyTableOneField";
import MyTabsTwoField from "./components/MyTabsTwoField";

interface IInput {
    id: number;
    content: string;
}

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [inputs, setInputs] = useState<IInput[]>([
        {
            id: Date.now(),
            content: "",
        }
    ]);
    const [error, setError] = useState<string>('');
    const [users, setUsers] = useState<Array<IViewUser>>([]);

    useEffect(() => {
        // @ts-ignore
        VK.init({
            apiId: process.env.REACT_APP_VK_NUMBER
        });
        // @ts-ignore
        VK.Auth.getLoginStatus((r) => {
            if (r.status === 'unknown') {
                // @ts-ignore
                VK.Auth.login();
            }
        });
    }, []);

    function showLoading() {
        setLoading(true);
        setModalVisible(true);
    }

    function hideLoading() {
        setLoading(false);
        setModalVisible(false);
    }

    function clearPage() {
        setUsers([]);
        setError('');
    }


    function handleInputDelete(input: IInput): void {
        clearPage()
        setInputs(inputs.filter((i) => i.id !== input.id));
    }

    function handleInputAdd(): void {
        clearPage()
        setInputs([...inputs, {id: Date.now(), content: ""} as IInput]);
    }

    function handleInputChange(input: IInput, value: string) {
        setInputs(inputs.map((i) => (input.id === i.id ? {...i, content: value} : i)));
    }


    function handleCompareClick() {
        clearPage();
        if (inputs.length === 1) {
            if (inputs[0].content === '') {
                setError('Все поля обязательны для заполнения');
                return;
            }
        } else {
            if (inputs[0].content === '' || inputs[1].content === '') {
                setError('Все поля обязательны для заполнения');
                return;
            }
        }
        showLoading();
        if (inputs.length === 1) {
            const arr = [inputs[0].content]
            UserService.fetchUsers(arr)
                .then((users: IUser[]) => {
                    if (users.length < 1) {
                        throw new Error('Произошла ошибка. Проверьте корректность введённых данных и попробуйте снова');
                    }
                    const user = users[0]
                    if (user.deactivated) {
                        throw new Error(`Профиль пользователя с id ${user.id} удалён или ещё не создан`)
                    }
                    if (!user.can_access_closed) {
                        throw new Error(`Профиль пользователя ${user.first_name} ${user.last_name} с id ${user.id} является закрытым. Невозможно проанализировать.`);
                    }
                    return Promise.all(users.map(user => {
                        return Promise.all([
                            UserService.fetchGroupsByUserId(user.id),
                            UserService.fetchPostsByUserId(user.id)
                        ])
                            .then(([groups, posts]) => Utils.userModelToView(user, groups, posts))
                    }))
                })
                .then((userViews: IViewUser[]) => setUsers(userViews))
                .catch(e => setError(e.message))
                .finally(() => hideLoading());
        } else {
            const arr = inputs.map(input => input.content);
            UserService.fetchUsers(arr)
                .then((users: IUser[]) => {
                    if (users.length < 2) {
                        throw new Error('Произошла ошибка. Проверьте корректность введённых данных и попробуйте снова');
                    }
                    users.forEach((user) => {
                        if (user.deactivated) {
                            throw new Error(`Профиль пользователя с id ${user.id} удалён или ещё не создан`)
                        }
                        if (!user.can_access_closed) {
                            throw new Error(`Профиль пользователя ${user.first_name} ${user.last_name} с id ${user.id} является закрытым. Невозможно проанализировать.`);
                        }
                    })
                    return Promise.all(users.map(user => {
                        return Promise.all([
                            UserService.fetchGroupsByUserId(user.id),
                            UserService.fetchPostsByUserId(user.id)
                        ])
                            .then(([groups, posts]) => Utils.userModelToView(user, groups, posts))
                    }))
                })
                .then((userViews: IViewUser[]) => setUsers(userViews))
                .catch(e => setError(e.message))
                .finally(() => hideLoading());
        }

    }

    return (
        <div className='container'>

            {
                inputs.length === 1?
                    (<p className="h3 mt-2 mb-4">Анализ профиля Вконтакте</p>)
                    :
                    (<p className="h3 mt-2 mb-4">Сравнение пользователей Вконтакте</p>)
            }
            <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onCompareClick={handleCompareClick}
                error={error}
                onInputAdd={handleInputAdd}
                onInputDelete={handleInputDelete}
            />
            <Modal show={modalVisible} centered>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status"/>
                </Modal.Body>
            </Modal>
            {
                (!loading && inputs.length === 1) ?
                    <>
                        <MyTableOneField users={users}/>
                        <MyTabsTwoField users={users}/>
                    </>
                    :
                    <>
                        <MyTableTwoField users={users}/>
                        <MyTabs users={users}/>
                    </>
            }
        </div>
    );
};

export default App;