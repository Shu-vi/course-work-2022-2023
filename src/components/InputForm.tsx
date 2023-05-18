import React, {FC} from "react";
import {Button, Form} from "react-bootstrap";

interface IInput {
    id: number;
    content: string;
}

interface Props {
    inputs: IInput[];
    onInputChange: (input: IInput, value: string) => void;
    onCompareClick: () => void;
    error: string;
    onInputDelete: (input: IInput) => void;
    onInputAdd: () => void;
}

export const InputForm: FC<Props> = ({
                                         inputs,
                                         onInputChange,
                                         onCompareClick,
                                         error,
                                         onInputAdd,
                                         onInputDelete
                                     }) => {
    return (
        <Form style={{marginBottom: '10px'}}>
            {inputs.map((input) => (
                <Form.Group className="mb-3" controlId="formBasicEmail" key={input.id}>
                    <Form.Control
                        key={input.id}
                        className="mb-2"
                        type="email"
                        placeholder="Введите адрес страницы... Например: id123456789"
                        value={input.content}
                        onChange={(event) => {
                            onInputChange(input, event.target.value);
                        }}
                    />
                    {inputs.length > 1 && (
                        <Button variant="danger" onClick={() => onInputDelete(input)}>
                            Удалить
                        </Button>)
                    }
                </Form.Group>
            ))}
            {inputs.length > 0 && (
                <Button variant="success" className="mr-1" onClick={onCompareClick}>
                    {
                        inputs.length === 1 ? 'Анализ' : 'Сравнить'
                    }
                </Button>
            )}
            {inputs.length < 2 && (
                <Button variant="primary" onClick={onInputAdd}>
                    Добавить ещё
                </Button>
            )}
            <div className='text-danger'>{error}</div>
        </Form>
    );
};
