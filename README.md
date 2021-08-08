# Setup
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
