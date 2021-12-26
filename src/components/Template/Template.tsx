import React from 'react';
import { useParams } from 'react-router-dom';


const TemplatePage: React.FC  = () => {

    type Params = {
        templateId: string;
    }

    let {templateId} = useParams<Params>();

  return (
    <p>Template Page Id: {templateId}</p>
  );
}

export default TemplatePage;


/*
    {
    "title": "test update3",
    "description": "test description0",
    "id": 1,
    "visibility": true,
    "owner": {
        "ownerID": 3,
        "owner": "testuser@example.com"
    },
    "game": {
        "gameID": "3",
        "gameTitle": "Yakuza 0"
    },
    "stepPositions": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
    ],
    "sectionPositions": [
        1,
        2,
        3
    ],
    "likes": 0,
    "sections": [
        {
            "id": 1,
            "name": "Test Name1",
            "description": "Test Description1",
            "position": 1,
            "steps": [
                {
                    "id": 1,
                    "name": "Test Name1",
                    "position": 1,
                    "description": "Test Description1"
                },
                {
                    "id": 2,
                    "name": "Test Name2",
                    "position": 2,
                    "description": "Test Description2"
                },
                {
                    "id": 3,
                    "name": "Test Name3",
                    "position": 3,
                    "description": "Test Description3"
                },
                {
                    "id": 4,
                    "name": "Test Name4",
                    "position": 4,
                    "description": "Test Description4"
                }
            ]
        },
        {
            "id": 2,
            "name": "Test Name2",
            "description": "Test Description2",
            "position": 2,
            "steps": [
                {
                    "id": 5,
                    "name": "Test Name1",
                    "position": 5,
                    "description": "Test Description1"
                },
                {
                    "id": 6,
                    "name": "Test Name2",
                    "position": 6,
                    "description": "Test Description2"
                },
                {
                    "id": 7,
                    "name": "Test Name3",
                    "position": 7,
                    "description": "Test Description3"
                },
                {
                    "id": 8,
                    "name": "Test Name4",
                    "position": 8,
                    "description": "Test Description4"
                }
            ]
        },
        {
            "id": 3,
            "name": "Test Name3",
            "description": "Test Description3",
            "position": 3,
            "steps": [
                {
                    "id": 9,
                    "name": "Test Name1",
                    "position": 9,
                    "description": "Test Description1"
                },
                {
                    "id": 10,
                    "name": "Test Name2",
                    "position": 10,
                    "description": "Test Description2"
                },
                {
                    "id": 11,
                    "name": "Test Name3",
                    "position": 11,
                    "description": "Test Description3"
                },
                {
                    "id": 12,
                    "name": "Test Name4",
                    "position": 12,
                    "description": "Test Description4"
                }
            ]
        }
    ]
}
*/