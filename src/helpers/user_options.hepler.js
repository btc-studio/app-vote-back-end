exports.createDataUserOptions = (option_id, user_ids) => {
    const data = [];
    // insert to user options table
    user_ids.forEach((user_id) => {
        const json = {};
        json.user_id = user_id;
        json.option_id = option_id;

        data.push(json);
    });
    return data;
};
