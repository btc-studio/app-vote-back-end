const { Criterias } = require("../models/criteria.model");
const sequelize = require("../commons/database/database").sequelize;

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
    const t = await sequelize.transaction();
    try {
        const criteria = await Criterias.create({
            id: criteria_req.id,
            description: criteria_req.description,
            created_by: criteria_req.created_by,
            created_at: new Date(),
            updated_at: new Date(),
        });
        await t.commit();
        return criteria;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.updateCriteria = async (criteria_req) => {
    const t = await sequelize.transaction();
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
        await t.commit();
        return criteria;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.deleteCriteria = async (id) => {
    const t = await sequelize.transaction();
    try {
        const criteria = await Criterias.destroy({
            where: {
                id: id,
            },
        });
        await t.commit();
        return criteria;
    } catch (error) {
        await t.rollback();
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
