# Geolocator

By: Stiven Ramírez Arango - sramir70@eafit.edu.co

# Despligue en un Servidor Centos 7.x en el DCA

## se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

    user1$ nvm install v7.7.4

## se instala el servidor mongodb

como root:

    user1$ sudo yum install mongodb-server -y'

ponerlo a correr:

    user1$ sudo systemctl enable mongod'
    user1$ sudo systemctl start mongod'

lo instala de los repositorios propios de Centos.

tambien lo puede instalar de un repo de mongodb:

ver pág: https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

## se instala NGINX

    user1$ sudo yum install nginx
    user1$ sudo systemctl enable nginx
    user1$ sudo systemctl start nginx

Abrir el puerto 80

    user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
    user1$ sudo firewall-cmd --reload

## abrir los puertos en el firewall que utilizara la app:

    user1$ sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
    user1$ sudo firewall-cmd --reload
    user1$ sudo firewall-cmd --list-all

como medida desesperada, puede parar y desactivar el firewalld, cosa que no es recomendable:

    user1$ sudo systemctl stop firewalld   
    user1$ sudo systemctl disable firewalld
    user1$ sudo systemctl start firewalld

## se instala Apache Web Server

    user1$ sudo yum install httpd

## descargar el proyecto github

    user1$ mkdir apps
    user1$ cd apps
    user1$ git clone https://github.com/stivenramireza/Geolocator.git
    user1$ cd Geolocator
    user1$ npm install

## se ensaya la aplicación

    user1$ npm start

por defecto abre el puerto 3000, entre a un browser y digite: http://ip-servidor:3000

cuando termine de probar, detenga la aplicación (^C)

    user1$

## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

    user1$ npm install -g pm2
    user1$ cd apps
    user1$ cd appwebArticulosNodejs
    user1$ pm2 start app.js
    user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

    user1$ pm2 startup systemd

    una vez ejecutado este comando, le indicará las instrucciones para dejarlo como un servicio.

## MUY MUY IMPORTANTE: Deshabilitar SELINUX

    user1$ sudo vi /etc/sysconfig/selinux

        SELINUX=disabled

    user1$ sudo reboot