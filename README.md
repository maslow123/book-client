## Tools that need to be installed
- [Docker](https://www.docker.com/)
- [Make](https://community.chocolatey.org/packages/make)

## How to run the application?
- Clone this repository and [book-service](https://github.com/maslow123/book-service) repository
- Make sure the service is running (view README.md on [book-service](https://github.com/maslow123/book-service) repository to run it)
- Open your terminal / cmd, and type the command on below:
    ```
    make runapp
    ```
- Make sure the service is running properly, as follows:
    ```
    $ docker ps
    CONTAINER ID   IMAGE                           COMMAND                  CREATED          STATUS          PORTS                    NAMES
    6f3b0a9fa012   maslow123/books-api:latest      "docker-entrypoint.s…"   16 seconds ago   Up 15 seconds   0.0.0.0:8080->8080/tcp   book-service_api_1
    74356b486479   maslow123/books-client:latest   "docker-entrypoint.s…"   43 seconds ago   Up 40 seconds   0.0.0.0:3000->80/tcp       fe
    ```
- Open your browser, and hit url http://localhost:3000
- Finish
