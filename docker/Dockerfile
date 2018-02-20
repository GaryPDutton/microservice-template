FROM node

#####################################################################
# SETTING APPLICATION NAME AND LOCATION
#####################################################################

ENV APP_NAME=microservices-template
ENV APP_DIR=/opt/$APP_NAME


#####################################################################
# SETTING UP APPLICATION DIRECTORY AND ENVIRONMENT VARIABLES
#####################################################################

RUN mkdir -p $APP_DIR && mkdir -p /tmp/.$APP_NAME
WORKDIR $APP_DIR

#####################################################################
# ADDING HOSTS ENTRY AND INSTALLING DEPS
#####################################################################

COPY package.json $APP_DIR
COPY /dist $APP_DIR/dist
COPY /build $APP_DIR/build
COPY /build/certs /etc/ssl/certs

RUN ls $APP_DIR;

RUN npm install --production
RUN npm install nodemon -g

RUN chmod +x build/wait-for-it.sh

#####################################################################
# EXPOSE PORT
#####################################################################
EXPOSE 2456

#####################################################################
# ADDING APPLICATION
#####################################################################

CMD ./build/wait-for-it.sh -t 100 rabbitmq:5672 && nodemon --legacy-watch dist/server.js 2456
