import React, {FC, useEffect, useState} from "react";
import {InputForm} from "./components/InputForm";
import UserService from "./api/UserService";
import MyTable from "./components/MyTable";
import {IViewUser} from "./views/IViewUser";
import {Utils} from "./utils/utils";

interface IInput {
    id: number;
    content: string;
}

const App: FC = () => {
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

    function handleInputChange(input: IInput, value: string): void {
        setInputs(
            inputs.map((i) => (input.id === i.id ? {...i, content: value} : i))
        );
    }

    function handleCompareClick(): void {
        let arr: string[];
        arr = [];
        inputs.forEach((value) => {
            arr.push(value.content);
        });
        UserService.fetchUsers(arr)
            .then(data => setUsers(data.map(user => {
                return Utils.userModelToView(user);
            })))
            .catch(e => setError(e.message));
    }

    return (
        <div className='container'>
            <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onCompareClick={handleCompareClick}
                error={error}
            />
            <MyTable users={users}/>
        </div>
    );
};

export default App;
