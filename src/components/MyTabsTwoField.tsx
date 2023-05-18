import React, {FC} from 'react';
import {IViewUser} from "../views/IViewUser";
import {Tab, Tabs} from "react-bootstrap";
import {UserWallAnalysis} from "./UserWallAnalysis";
import {UserGroupsAnalysis} from "./UserGroupsAnalysis";

interface Props {
    users: IViewUser[];
}

const MyTabsTwoField: FC<Props> = ({users}) => {
    if (users.length < 1) {
        return null
    }
    const [user] = users;

    return (
        <Tabs
            defaultActiveKey="wall"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >
            <Tab eventKey="wall" title="Анализ стены">
                <div className="border-3 border p-3 mb-5">
                    <div>
                        {user.first_name} {user.last_name}:
                    </div>
                    <UserWallAnalysis user={user}/>
                </div>
            </Tab>
            <Tab eventKey="groups" title="Анализ сообществ">
                <div className="border-3 border p-3 mb-5">
                    <div>
                        На основе групп, в которых состоит {user.first_name} {user.last_name}, можно сделать предположение, что его интересуют следующие тематики:
                    </div>
                    <UserGroupsAnalysis user={user}/>
                </div>
            </Tab>
        </Tabs>
    );
};

export default MyTabsTwoField;