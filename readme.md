# Server

You can use the already build server binary in /server folder
the build the connect with my Postgres database. It will run on port 8080.

TO RUN THE SERVER:

```
cd server
./server
```

## OR

You can build the server yourself with the following command:

```
cd server
go build server.go
```

But you will need to add your own postgres database url

## API

### GET /api/users

Returns a list of users

### POST /form

Creates a new user from a form submission with the following fields:

- name
- email

### GET /api/users:id

Returns a single user by id
