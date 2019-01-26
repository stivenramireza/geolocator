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