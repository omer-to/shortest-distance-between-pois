# Setup
## Using Docker for backend only
Clone the repository, navgiate to the project root, and install dependencies.
It will compile TypeScript files into JavaScript in `postInstall` hook.

Navigate to the project root, and run the following command to build the Docker image from the GitLab repository (might require root permission):
```sh
sudo sh scripts/build.sh
```
The command will create a new image tagged as `marti/latest`.

After successfully creating the container image, run the container with the following command:
```sh
sh scripts/run.sh
```
This command will forward the traffic from the host machine's port 4000 to the docker container's 4000.

## Using docker-compose
Checkout to the branch in which the back-end code is added as a submodule, and both run in a separate docker containers.

```sh
git checkout dockerized && git submodule update --init --recursive
```

Build the image for back-end code:
```sh
cd backend && docker build . -t marti:latest
```

Build the image for the solution code:
```sh
cd client && docker build . -t client:latest
```

Navigate back to the project root folder, and start the services:
```sh
docker-compose up
```