
exports.findAll = async function (Model) {
    try {
        const data = await Model.find({});

        return data;
    } catch (e) {
        return e;
    }
}


exports.findOne = async function (Model, findBy, value) {

    try {
        const obj = {}
        obj[findBy] = value
        console.log(obj)
        const data = await Model.find(obj)

        return data;

    } catch (e) {
        return e;
    }

}

exports.create = async function (Model, object) {
    try {
        const data = await Model.create(object)
        return data;

    } catch (e) {
        return e;
    }
}

exports.update = async function (Model, object, findBy, value) {
    try {
        console.log("here")
        const data = await Model.findOneAndUpdate({ [findBy]: value }, object, { new: true, omitUndefined: true })
        return data;

    } catch (e) {
        return e;
    }
}

exports.delete = async function (Model, findBy, value) {
    try {
        const data = await Model.findOneAndDelete({[findBy]:value})
        return data;

    } catch (e) {
        return e;
    }
}