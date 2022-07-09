exports.createDataPolls = (poll_id, criteria_ids, user_options) => {
    const data = [];
    // insert to user options table
    criteria_ids.forEach((criteria_id) => {
        user_options.forEach((user_option) => {
            const json = {};
            json.criteria_id = criteria_id;
            json.poll_id = poll_id;
            json.user_id = user_option.user_id;
            json.total_vote = 0;

            data.push(json);
        });
    });
    return data;
};
