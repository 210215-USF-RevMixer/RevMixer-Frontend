# base image
FROM node:12.2.0

ENV NODE_ENV production
# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /AngularTone

# add `/AngularTone/node_modules/.bin` to $PATH
ENV PATH /AngularTone/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /AngularTone/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . /AngularTone

# start app
CMD ng serve --host 0.0.0.0