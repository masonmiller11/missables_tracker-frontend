import React, { useEffect, useContext, useState } from 'react';
import {
    Button,
    Card,
    Divider,
    Classes,
    ButtonGroup,
    Elevation,
    H5,
} from '@blueprintjs/core';

import Template from '../../api/models/Template/Template';
import classes from './TemplateList.module.css';
import TemplateCard from './TemplateCard/TemplateCard';

const TemplateList: React.FC<{ gameId: string }> = ({ gameId: gameIdProp }) => {
    //set fake template list
    //TODO replace this with API call.
    useEffect(() => {
        let fakeList = [
            {
                title: 'test update3',
                description: 'test description0',
                id: 1,
                visibility: true,
                owner: {
                    ownerID: 3,
                    owner: 'testuser@example.com',
                },
                game: {
                    gameID: 3,
                    gameTitle: 'Yakuza 0',
                },
                stepPositions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                sectionPositions: [1, 2, 3],
                likes: 1002,
                sections: [
                    {
                        id: 1,
                        name: 'Test Name1',
                        description: 'Test Description1',
                        position: 1,
                        steps: [
                            {
                                id: 1,
                                name: 'Test Name1',
                                position: 1,
                                description: 'Test Description1',
                            },
                            {
                                id: 2,
                                name: 'Test Name2',
                                position: 2,
                                description: 'Test Description2',
                            },
                            {
                                id: 3,
                                name: 'Test Name3',
                                position: 3,
                                description: 'Test Description3',
                            },
                            {
                                id: 4,
                                name: 'Test Name4',
                                position: 4,
                                description: 'Test Description4',
                            },
                        ],
                    },
                    {
                        id: 2,
                        name: 'Test Name2',
                        description: 'Test Description2',
                        position: 2,
                        steps: [
                            {
                                id: 5,
                                name: 'Test Name1',
                                position: 5,
                                description: 'Test Description1',
                            },
                            {
                                id: 6,
                                name: 'Test Name2',
                                position: 6,
                                description: 'Test Description2',
                            },
                            {
                                id: 7,
                                name: 'Test Name3',
                                position: 7,
                                description: 'Test Description3',
                            },
                            {
                                id: 8,
                                name: 'Test Name4',
                                position: 8,
                                description: 'Test Description4',
                            },
                        ],
                    },
                    {
                        id: 3,
                        name: 'Test Name3',
                        description: 'Test Description3',
                        position: 3,
                        steps: [
                            {
                                id: 9,
                                name: 'Test Name1',
                                position: 9,
                                description: 'Test Description1',
                            },
                            {
                                id: 10,
                                name: 'Test Name2',
                                position: 10,
                                description: 'Test Description2',
                            },
                            {
                                id: 11,
                                name: 'Test Name3',
                                position: 11,
                                description: 'Test Description3',
                            },
                            {
                                id: 12,
                                name: 'Test Name4',
                                position: 12,
                                description: 'Test Description4',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'test name1',
                description: 'test description1',
                id: 2,
                visibility: true,
                owner: {
                    ownerID: 3,
                    owner: 'testuser@example.com',
                },
                game: {
                    gameID: 3,
                    gameTitle: 'Yakuza 0',
                },
                stepPositions: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                sectionPositions: [1, 2, 3],
                likes: 50,
                sections: [
                    {
                        id: 4,
                        name: 'Test Name1',
                        description: 'Test Description1',
                        position: 1,
                        steps: [
                            {
                                id: 13,
                                name: 'Test Name1',
                                position: 13,
                                description: 'Test Description1',
                            },
                            {
                                id: 14,
                                name: 'Test Name2',
                                position: 14,
                                description: 'Test Description2',
                            },
                            {
                                id: 15,
                                name: 'Test Name3',
                                position: 15,
                                description: 'Test Description3',
                            },
                            {
                                id: 16,
                                name: 'Test Name4',
                                position: 16,
                                description: 'Test Description4',
                            },
                        ],
                    },
                    {
                        id: 5,
                        name: 'Test Name2',
                        description: 'Test Description2',
                        position: 2,
                        steps: [
                            {
                                id: 17,
                                name: 'Test Name1',
                                position: 17,
                                description: 'Test Description1',
                            },
                            {
                                id: 18,
                                name: 'Test Name2',
                                position: 18,
                                description: 'Test Description2',
                            },
                            {
                                id: 19,
                                name: 'Test Name3',
                                position: 19,
                                description: 'Test Description3',
                            },
                            {
                                id: 20,
                                name: 'Test Name4',
                                position: 20,
                                description: 'Test Description4',
                            },
                        ],
                    },
                    {
                        id: 6,
                        name: 'Test Name3',
                        description: 'Test Description3',
                        position: 3,
                        steps: [
                            {
                                id: 21,
                                name: 'Test Name1',
                                position: 21,
                                description: 'Test Description1',
                            },
                            {
                                id: 22,
                                name: 'Test Name2',
                                position: 22,
                                description: 'Test Description2',
                            },
                            {
                                id: 23,
                                name: 'Test Name3',
                                position: 23,
                                description: 'Test Description3',
                            },
                            {
                                id: 24,
                                name: 'Test Name4',
                                position: 24,
                                description: 'Test Description4',
                            },
                        ],
                    },
                ],
            },
        ];

        setTemplateList(fakeList);
    }, []);

    const [templateList, setTemplateList] = useState<null | Template[]>(null);

    if (templateList) {
        return (
            <div className={classes.templateListContainer}>
                {/* <p>Game Id To Pull Templates: {gameIdProp}</p> */}
                {templateList!.map((template) => (
                    <TemplateCard template={template} />
                ))}
            </div>
        );
    }
    {
        return <p>'loadimg</p>;
    }
};

export default TemplateList;
