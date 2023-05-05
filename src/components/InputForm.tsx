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
}

export const InputForm: FC<Props> = ({
                                         inputs,
                                         onInputChange,
                                         onCompareClick,
                                         error
                                     }) => {
    return (
        <Form style={{marginBottom: '10px'}}>
            {inputs.map((input) => (
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
            ))}
            {inputs.length > 0 && (
                <Button variant="success" className="mr-1" onClick={onCompareClick}>
                    Сравнить
                </Button>
            )}
            <div className='text-danger'>{error}</div>
        </Form>
    );
};
