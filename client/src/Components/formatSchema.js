// const schema = {
//     models: [
//         {
//             "Name of the model": {
//                 attributes: [
//                     {
//                         name: "Name of the attribute",
//                         type: "Data type of attribute, if ObjectId then ask what relation with which model"
//                     }
//                 ],
//                 relations: [
//                     {
//                         with: "Name of anther/same model",
//                         type: "type of relation => one to one, one to many, many to one, many to many"
//                     }
//                 ],
//                 // All 4 operations on every model
//                 // operations:[
//                 //     {
//                 //         type:"type of operation, get, put, patch, delete"
//                 //     }
//                 // ]
//             }
//         }
//     ]
// }

// Json

// {
//     "name": "App trial 1",
//     "email": "apptrial1@gmail.com",
//     "slug": "app-trial-1",
//     "password": "12345678",
//     "schema": [
//         {
//             "name": "user",
//             "attributes":[
//                 {
//                     "name": "name",
//                     "type": "String"
//                 },
//                 {
//                     "name": "email",
//                     "type": "String"
//                 },
//                 {
//                     "name": "password",
//                     "type": "String"
//                 },
//                 {
//                     "name": "phone",
//                     "type": "Number"
//                 },
//                 {
//                     "name": "calendar",
//                     "type": "ObjectId",
//                     "ref": "calendar"
//                 }
//             ],
//             "relations":[
//                 {
//                     "with": "calendar",
//                     "type": "one to one"
//                 }
//             ]
//         },
//         {
//             "name": "calendar",
//             "attributes":[
//                 {
//                     "name": "slug",
//                     "type": "String"
//                 },
//                 {
//                     "name": "event",
//                     "type": "Array",
//                     "ref": "event"
//                 }
//             ],
//             "relations":[
//                 {
//                     "with": "user",
//                     "type": "one to one"
//                 },
//                 {
//                     "with": "event",
//                     "type": "one to many"
//                 }
//             ]
//         },
//         {
//             "name": "event",
//             "attributes":[
//                 {
//                     "name": "title",
//                     "type": "String",
//                     "ref": ""
//                 },
//                 {
//                     "name": "startTime",
//                     "type": "Date"
//                 },
//                 {
//                     "name": "endTime",
//                     "type": "Date"
//                 }
//             ],
//             "relations":[
//                 {
//                     "with": "calendar",
//                     "type": "many to one"
//                 }
//             ]
//         }
//     ]
// }

// Json


const appSchema = 
    [
        {
            name: "Name of the model",
            attributes:[
                {
                    name: "Name of the attribute",
                    type: "Data type of attribute, if ObjectId then ask what relation with which model",
                    ref: "only applicable when type===ObjectId"
                }
            ],
            relations:[
                {
                    with: "Name of anther/same model",
                    type: "type of relation => one to one, one to many, many to one, many to many"
                }
            ]
        }
    ]


    // Relations is unnecessary if we give the details in attributes only