import React, {FC} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {IViewUser} from "../views/IViewUser";
import {UserWallAnalysis} from "./UserWallAnalysis";
import {UserGroupsAnalysis} from "./UserGroupsAnalysis";

interface Props {
    users: IViewUser[];
}

const MyTabs: FC<Props> = ({users}) => {
    if (users.length < 2) {
        return null
    }
    const [user1, user2] = users;

    return (
        <Tabs
            defaultActiveKey="wall"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >
            <Tab eventKey="wall" title="Анализ стены">
                <div className="border-3 border p-3 mb-3">
                    <div>
                        {user1.first_name} {user1.last_name}:
                    </div>
                    <UserWallAnalysis user={user1}/>
                </div>
                <div className="border-3 border p-3 mb-5">
                    <div>
                        {user2.first_name} {user2.last_name}:
                    </div>
                    <UserWallAnalysis user={user2}/>
                </div>
            </Tab>
            <Tab eventKey="groups" title="Анализ сообществ">
                <div className="border-3 border p-3 mb-3">
                    <div>
                        На основе групп, в которых состоит {user1.first_name} {user1.last_name}, можно сделать предположение, что его интересуют следующие тематики:
                    </div>
                    <UserGroupsAnalysis user={user1}/>
                </div>
                <div className="border-3 border p-3 mb-5">
                    <div>
                        На основе групп, в которых состоит {user2.first_name} {user2.last_name}, можно сделать предположение, что его интересуют следующие тематики:
                    </div>
                    <UserGroupsAnalysis user={user2}/>
                </div>
            </Tab>
        </Tabs>
    );
};

export default MyTabs;