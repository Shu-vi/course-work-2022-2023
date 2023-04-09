import React, {FC, useEffect, useState} from "react";
import {Header} from "./components/Header";
import {InputForm} from "./components/InputForm";
import UserService from "./api/UserService";
import {IUser} from "./models/IUser";

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

    useEffect(() => {
        //@ts-ignore
        VK.init({
            apiId: process.env.REACT_APP_VK_NUMBER
        });
        // @ts-ignore
        VK.Auth.getLoginStatus((r) => {
            if (r.status == 'unknown'){
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

    function handleInputDelete(input: IInput): void {
        setInputs(inputs.filter((i) => i.id !== input.id));
    }

    function handleInputAdd(): void {
        setInputs([...inputs, {id: Date.now(), content: ""} as IInput]);
    }

    function handleCompareClick(): void {
        let arr: string[];
        arr = [];
        inputs.forEach((value) => {
            arr.push(value.content);
        });
        let users: IUser[];
        UserService.fetchUsers(arr).then(d => {users = d; console.log(users)}).catch(e => setError(e.message));

    }

    return (
        <div className='container'>
            <Header/>
            <InputForm
                inputs={inputs}
                onInputChange={handleInputChange}
                onInputDelete={handleInputDelete}
                onInputAdd={handleInputAdd}
                onCompareClick={handleCompareClick}
                error={error}
            />
        </div>
    );
};

export default App;
