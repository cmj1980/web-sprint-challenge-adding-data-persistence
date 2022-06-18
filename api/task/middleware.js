const db = require('../../data/dbConfig');

const validateTask = async (req, res, next) => {
    let {
        task_description,
        project_id
    } = req.body;
    if (typeof task_description !== 'string' ||
        task_description.trim() == '') {
        next({
            status: 400,
            message: "invalid task_description"
        });
        return;
    }
    if (typeof project_id !== 'number' ||
        project_id < 1) {
        next({
            status: 400,
            message: "project_id must be a positive number"
        });
        return;
    }

    const result = await db('projects').where({
        project_id
    });
    if (!result.length) {
        next({
            status: 404,
            message: `project with project_id ${project_id} not found`
        });
        return;
    }

    next();
}

module.exports = {
    validateTask
}