import React, {FC, useEffect, useState} from "react";
import {InputForm} from "./components/InputForm";
import UserService from "./api/UserService";
import MyTable from "./components/MyTable";
import {IViewUser} from "./views/IViewUser";
import {Utils} from "./utils/utils";
import {IUser} from "./models/IUser";
import {IGroup} from "./models/IGroup";
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
        //@ts-ignore
        VK.init({
            apiId: process.env.REACT_APP_VK_NUMBER
        });
        // @ts-ignore
        VK.Auth.getLoginStatus((r) => {
            if (r.status === 'unknown') {
                //@ts-ignore
                VK.Auth.login();
            }
        });
    }, []);

    function showLoading(): void {
        setModalVisible(true);
        setLoading(true);
    }

    function hideLoading(): void {
        setModalVisible(false);
        setLoading(false);
    }

    function handleInputChange(input: IInput, value: string): void {
        setInputs(
            inputs.map((i) => (input.id === i.id ? {...i, content: value} : i))
        );
    }

    function handleCompareClick(): void {
        showLoading();
        let arr: string[];
        arr = [];
        inputs.forEach((value) => {
            arr.push(value.content);
        });
        UserService.fetchUsers(arr)
            .then((users: IUser[]) => {
                const userPromises = users.map((user) => {
                    return UserService.fetchGroupsByUserId(user.id)
                        .then((groups: IGroup[]) => {
                            const userView: IViewUser = Utils.userModelToView(user);
                            userView.groups = Utils.groupsModelToView(groups);
                            return userView;
                        })
                })
                return Promise.all(userPromises);
            })
            .then((userViews: IViewUser[]) => setUsers(userViews))
            .catch(e => setError(e.message))
            .finally(() => {
                hideLoading();
            });
    }

    return (
        <div className='container'>
            <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onCompareClick={handleCompareClick}
                error={error}
            />
            {
                loading && (
                    <Modal show={modalVisible} backdrop="static" keyboard={false}>
                        <Modal.Body className="d-flex justify-content-center align-items-center">
                            <Spinner animation="border" role="status">
                            </Spinner>
                        </Modal.Body>
                    </Modal>
                )
            }
            {
                !loading && (
                    <MyTable users={users}/>
                )
            }
        </div>
    );
};

export default App;
