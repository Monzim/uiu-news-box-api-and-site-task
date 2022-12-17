package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	// TODO: Replace the connection string with your own
	db, err := sql.Open("postgres", "user=postgres password=<YOUR_PASSWORD> host=<YOUR_DB_URL> port=5432 dbname=postgres sslmode=require")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		// c.Header("Access-Control-Allow-Origin", "http://localhost:3000")

		c.String(http.StatusOK, "Hey, I'm a server! :D\nCreated by @monzim.\n\n Endpoint: /form\n Method: POST\n Body: name, email\n\n Endpoint: /users\n Method: GET\n\n Endpoint: /users/:id\n Method: GET\n")

	})

	r.POST("/form", func(c *gin.Context) {
		// c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		name := c.Request.FormValue("name")
		email := c.Request.FormValue("email")

		// print the values to the console
		// fmt.Println(">>GET NAME" + name)
		// fmt.Println(">>GET EMAIL" + email)

		fmt.Println(name)
		fmt.Println(email)

		stmt, err := db.Prepare("INSERT INTO users (name, email) VALUES ($1, $2)")
		if err != nil {

			fmt.Println(err)
			c.String(http.StatusInternalServerError, "Error")
			return
		}
		defer stmt.Close()
		_, err = stmt.Exec(name, email)
		if err != nil {
			fmt.Println(err)
			c.String(http.StatusInternalServerError, "Error")
			return
		}

		c.String(http.StatusOK, "Success")
	})

	r.GET("/users", func(c *gin.Context) {
		rows, err := db.Query("SELECT * FROM users")
		if err != nil {
			fmt.Println(err)
			c.String(http.StatusInternalServerError, "Error")
			return
		}
		defer rows.Close()

		response := "["
		for rows.Next() {
			var id int
			var name string
			var email string

			err = rows.Scan(&id, &name, &email)
			if err != nil {
				fmt.Println(err)
				c.String(http.StatusInternalServerError, "Error")
				return
			}

			response += fmt.Sprintf(`{"id": %d, "name": "%s", "email": "%s"},`, id, name, email)
		}

		response = strings.TrimSuffix(response, ",")
		response += "]"

		c.String(http.StatusOK, response)
	})

	r.GET("/users/:id", func(c *gin.Context) {
		// c.Header("Access-Control-Allow-Origin", "http://localhost:3000")

		userID := c.Param("id")
		row := db.QueryRow("SELECT * FROM users WHERE id = $1", userID)

		var id int
		var name string
		var email string
		err = row.Scan(&id, &name, &email)
		if err == sql.ErrNoRows {
			c.String(http.StatusNotFound, "User not found")
			return
		} else if err != nil {
			fmt.Println(err)
			c.String(http.StatusInternalServerError, "Error")
			return
		}

		response := fmt.Sprintf(`{"id": %d, "name": "%s", "email": "%s"}`, id, name, email)
		c.String(http.StatusOK, response)
	})

	r.Run(":8080")
}
