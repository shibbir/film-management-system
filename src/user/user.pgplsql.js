const create_users_table = `
    CREATE TABLE IF NOT EXISTS fm.users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(25) NOT NULL UNIQUE
    )
`;

exports.create_users_table = create_users_table;
