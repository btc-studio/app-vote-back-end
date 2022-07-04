const { Criterias } = require("../models/criteria.model");

exports.findCriteriaById = async (id) => {
    try {
        const criteria = await internalFindCriteria(id);
        return criteria;
    } catch (error) {
        return error;
    }
};

exports.findAllCriterias = async () => {
    try {
        const criterias = await Criterias.findAll();
        return criterias;
    } catch (error) {
        return error;
    }
};

exports.createNewCriteria = async (criteria_req) => {
    try {
        const criteria = await Criterias.create({
            id: criteria_req.id,
            description: criteria_req.description,
            created_by: criteria_req.created_by,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return criteria;
    } catch (error) {
        return error;
    }
};

exports.updateCriteria = async (criteria_req) => {
    try {
        const criteria = await internalFindCriteria(criteria_req.id);
        if (criteria === null) {
        } else {
            criteria.description =
                criteria_req.description == null
                    ? criteria.description
                    : criteria_req.description;
            criteria.updated_at = new Date();
            await criteria.save();
        }
        return criteria;
    } catch (error) {
        return error;
    }
};

exports.deleteCriteria = async (id) => {
    try {
        const criteria = await Criterias.destroy({
            where: {
                id: id,
            },
        });
        return criteria;
    } catch (error) {
        return error;
    }
};

internalFindCriteria = async (id) => {
    const criteria = await Criterias.findOne({
        where: {
            id: id,
        },
    });
    return criteria;
};
