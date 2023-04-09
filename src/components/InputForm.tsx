import React, {FC} from "react";
import {Button, Form} from "react-bootstrap";

interface IInput {
    id: number;
    content: string;
}

interface Props {
    inputs: IInput[];
    onInputChange: (input: IInput, value: string) => void;
    onInputDelete: (input: IInput) => void;
    onInputAdd: () => void;
    onCompareClick: () => void;
    error: string;
}

export const InputForm: FC<Props> = ({
                                         inputs,
                                         onInputChange,
                                         onInputDelete,
                                         onInputAdd,
                                         onCompareClick,
                                         error
                                     }) => {
    return (
        <Form>
            {inputs.map((input) => (
                <Form.Group className="mb-3" controlId="formBasicEmail" key={input.id}>
                    <Form.Control
                        className="mb-2"
                        type="email"
                        placeholder="Введите адрес страницы... Например: id123456789"
                        value={input.content}
                        onChange={(event) => {
                            onInputChange(input, event.target.value);
                        }}
                    />
                    <Button variant="danger" onClick={() => onInputDelete(input)}>
                        Удалить
                    </Button>
                </Form.Group>
            ))}
            {inputs.length > 0 && (
                <Button variant="success" className="mr-1" onClick={onCompareClick}>
                    Сравнить
                </Button>
            )}
            {inputs.length < 5 && (
                <Button variant="primary" onClick={onInputAdd}>
                    Добавить ещё
                </Button>
            )}
            <div className='text-danger'>{error}</div>
        </Form>
    );
};
