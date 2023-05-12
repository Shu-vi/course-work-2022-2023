import {FC, useState, useEffect} from 'react';
import NnService from '../api/NnService';

interface Props {
    user: {
        first_name: string;
        last_name: string;
        groups?: string[];
    };
}

export const UserGroupsAnalysis: FC<Props> = ({user}) => {
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        if (user.groups && user.groups.length > 0) {
            Promise.all(user.groups.map(group => NnService.classifyText(group)))
                .then(labels => {
                    console.log(labels)
                    const uniqueLabels = Array.from(new Set(labels));
                    setLabels(uniqueLabels);
                });
        }
    }, [user.groups]);

    if (!user.groups || user.groups.length === 0) {
        return (
            <div>
                У пользователя {user.first_name} {user.last_name} нет групп для того,
                чтобы выявить его интересы на их основе
            </div>
        );
    }

    return (
        <div>
            {labels.map((label, index) => (
                    <span key={index}>
                        {label}{index === labels.length - 1 ? '.' : ', '}
                     </span>
                )
            )}
        </div>
    );
};