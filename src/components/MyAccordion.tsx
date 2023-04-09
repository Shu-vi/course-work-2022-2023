import React, {FC, useState} from 'react';

interface IInput {
    id: number;
    content: string;
}

interface Props {
    inputs: IInput[];
    onInputChange: (input: IInput, value: string) => void;
    onInputDelete: (input: IInput) => void;
    onInputAdd: () => void;
}

const Accordion: FC<Props> = (props) => {
    const [activeSections, setActiveSections] = useState<number[]>([]);

    const handleSectionClick = (sectionId: number) => {
        if (activeSections.includes(sectionId)) {
            setActiveSections(activeSections.filter((id) => id !== sectionId));
        } else {
            setActiveSections([...activeSections, sectionId]);
        }
    };

    return (
        <ul className="list-group">
            {inputs.map((item) => (
                <li key={item.id} className="list-group-item">
                    <button
                        className="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#section-${item.id}`}
                        onClick={() => handleSectionClick(item.id)}
                    >
                        {item.title}
                    </button>
                    <div
                        className={`collapse${activeSections.includes(item.id) ? ' show' : ''}`}
                        id={`section-${item.id}`}
                    >
                        <div className="card card-body">{item.content}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Accordion;