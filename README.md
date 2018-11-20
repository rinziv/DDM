# Didactic Data Mining

> A frontend for the Didactic Data Mining project

# Executing this project
This project is the frontend for the tool. In order to execute the backend, you have to execute the backend first. 

To execute the backend (RESTful APIs), please, follow the instructions in [this repository](https://github.com/alessandro308/DDM_rest)

Then, execute the following commands:

### Developing mode (hot reload active)
```bash
npm install
npm run dev
```
With this mode, you can simply open your browser at `http://localhost:8080` and start to learn!

### Production mode
```
npm install
npm run build
```
This mode creates static files that have to be served by some webserver (Apache, nginx or whatever you want). If you open your `index` file as `file://`, the project doesn't work due some security rules of the browser.

### Run it in the container
In order to run the docker container you can build your image using the `Dockerfile` or just type
```bash
docker run -p 8080:80 alessandro308/ddm:webserver
```
and then, see the page at `http://localhost:8080`
