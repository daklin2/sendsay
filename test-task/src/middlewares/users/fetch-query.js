const fetchQuery = (user, request) => new Promise((resolve) => resolve(user.request(request)));

export default fetchQuery;
