# Geolocator

By: Stiven Ramírez Arango - sramir70@eafit.edu.co

# Correr el código en contenedores de Docker

## Instalar Docker

### En Ubuntu:

      $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu$(lsb_release -cs) stable"
      $ sudo apt-get update
      $ sudo apt-get install docker-ce

### Centos 7

    source: https://docs.docker.com/install/linux/docker-ce/centos/
    
    $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    $ sudo yum install docker-ce
    $ sudo systemctl start docker
    $ sudo systemctl enable docker

    instalar docker-compose: https://docs.docker.com/compose/install/

    $ sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

    $ sudo chmod +x /usr/local/bin/docker-compose

### En Windows:

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-windows/install/)

### En MacOS:

Descargar el instalador grafico oficial de [Docker](https://docs.docker.com/docker-for-mac/install/)

## Descargar el proyecto github

      $ cd /tmp/
      $ mkdir apps
      $ cd apps
      $ git clone https://github.com/stivenramireza/Geolocator.git
      $ cd Geolocator

## Con Dockers independientes:

1. Adquirir el contenedor oficial de mongo:

            $ docker pull mongo
            $ docker run --name mongo-server -p 27017:27017 -v $(pwd)/data:/data/db -d mongo:latest

2. Construir el contenedor nodejs+app:

            $ cd appwebArticulosNodejs
            $ docker image build -t <docker_user>/artnode:<version> .
            $ docker image push <docker_user>/artnode:<version>
            $ docker run --name nodeapp --link mongo-server:mongo -p 3000:3000 -d <docker_user>/artnode:<version>

3. Adquirir el contenedor oficial de nginx:

            $ docker pull nginx
            $ docker run --name webapp --link nodeapp:node -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:latest

Con https con certificados autofirmados:

            $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/nginx.key -out ssl/nginx.crt
            $ docker run --name webapp --link nodeapp:node -p 80:80 -p 443:443 -v $(pwd)/ssl:/etc/nginx/ssl:ro -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:latest

4. comandos docker utiles:

* lista imagenes:

      $ docker image ls

* borrar una imagen:

      $ docker image rm <image_id>


* lista contenedores en ejecución: 

      $ docker container ls
      $ docker ps
  
* lista todos los contenedores estén o no ejecutando:

      $ docker container ls -a
      $ docker ps -a

* para la ejecución de un contenedor:

      $ docker container stop <container_id> 

* borrar un contenedor, despues que esta detenido:

      $ docker container rm <container_id> 

* ver los logs de un contenedor:

      $ docker container logs <container_id> 

## Con docker-compose

Con https con certificados autofirmados:

      $ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/nginx.key -out ssl/nginx.crt

Se ejecuta el docker-compose

      $ docker-compose build
      $ docker-compose up

comprobar la ejecución con un browser y visitar la URL:

    http://localhost_or_ipserver:3000
    para ir directamente al node.

comprobar la ejecución con un browser y visitar la URL:

    http://localhost_or_ipserver
    para ir directamente al webserver nginx.