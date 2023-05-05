import React, {FC, useEffect, useState} from "react";
import {InputForm} from "./components/InputForm";
import UserService from "./api/UserService";
import MyTable from "./components/MyTable";
import {IViewUser} from "./views/IViewUser";
import {Utils} from "./utils/utils";
import {IUser} from "./models/IUser";
import {Modal, Spinner} from "react-bootstrap";

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
        },
        {
            id: Date.now() + 1,
            content: "",
        },
    ]);
    const [error, setError] = useState<string>('');
    const [users, setUsers] = useState<Array<IViewUser>>([]);

    useEffect(() => {
        // Используйте окружение, чтобы получить ID API VK.
        // @ts-ignore
        VK.init({
            apiId: process.env.REACT_APP_VK_NUMBER
        });
        // @ts-ignore
        VK.Auth.getLoginStatus((r) => {
            // Если пользователь не авторизован, откройте окно авторизации VK.
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

    function handleInputChange(input: IInput, value: string) {
        setInputs(inputs.map((i) => (input.id === i.id ? {...i, content: value} : i)));
    }

    function handleCompareClick() {
        showLoading();
        const arr = inputs.map(input => input.content);
        UserService.fetchUsers(arr)
            .then((users: IUser[]) => Promise.all(users.map(user => {
                return UserService.fetchGroupsByUserId(user.id)
                    .then(groups => Utils.userModelToView(user, groups))
            })))
            .then((userViews: IViewUser[]) => setUsers(userViews))
            .catch(e => setError(e.message))
            .finally(() => hideLoading());
    }

    return (
        <div className='container'>
            <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onCompareClick={handleCompareClick}
                error={error}
            />
            <Modal show={modalVisible} centered>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" />
                </Modal.Body>
            </Modal>
            {!loading && <MyTable users={users} />}
        </div>
    );
};

export default App;