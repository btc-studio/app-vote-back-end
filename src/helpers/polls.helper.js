exports.createDataPolls = (poll_id, criteria_ids) => {
    const datas = new Array();
    // insert to user options table
    user_ids.forEach((user_id) => {
        const json = new Object();
        json.user_id = user_id;
        json.option_id = option_id;

        datas.push(json);
    });
    return datas;
};
