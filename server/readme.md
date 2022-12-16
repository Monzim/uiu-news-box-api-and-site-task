# Server

## API

### GET /api/users

Returns a list of users

### POST /form

Creates a new user from a form submission with the following fields:

- name
- email

### GET /api/users:id

Returns a single user by id

# Make sure you add your own postgres database url

# Create new database table

CREATE TABLE users (
id serial PRIMARY KEY,
name varchar(255),
email varchar(255)
);
