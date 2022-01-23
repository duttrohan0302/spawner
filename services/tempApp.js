
exports.findAll = async function (Model) {
    try {
        const data = await Model.find({});

        return data;
    } catch (e) {
        return e;
    }
}


exports.findNum = async function (Model, findBy, value,num) {

    try {
        const obj = {}
        obj[findBy] = value
        console.log(obj)
        const data = await Model.find(obj).limit(num)

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

exports.update = async function (Model, object, id) {
    try {
        console.log("here")
        // const data = await Model.findOneAndUpdate({[findBy]:value}, object, { new: true, omitUndefined: true })
        const data = await Model.findByIdAndUpdate(id, object, { new: true, omitUndefined: true })
        return data;

    } catch (e) {
        return e;
    }
}

exports.delete = async function (Model, id) {
    try {
        // const data = await Model.findOneAndDelete({[findBy]:value})
        const data = await Model.findByIdAndDelete(id)
        return data;

    } catch (e) {
        return e;
    }
}