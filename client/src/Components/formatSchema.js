const schema = {
    models: [
        {
            "Name of the model": {
                attributes: [
                    {
                        name: "Name of the attribute",
                        type: "Data type of attribute, if ObjectId then ask what relation with which model"
                    }
                ],
                relations: [
                    {
                        with: "Name of anther/same model",
                        type: "type of relation => one to one, one to many, many to one, many to many"
                    }
                ],
                // All 4 operations on every model
                // operations:[
                //     {
                //         type:"type of operation, get, put, patch, delete"
                //     }
                // ]
            }
        }
    ]
}