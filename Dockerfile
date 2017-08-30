FROM node:8.1.4-alpine
LABEL name "designmanual"

ENV HOME=/home/app
ENV APP_PATH=$HOME/designmanual

COPY yarn.lock lerna.json .babelrc package.json $APP_PATH/

WORKDIR $APP_PATH
RUN yarn

COPY packages $APP_PATH/packages
COPY scripts $APP_PATH/scripts

RUN yarn postinstall

WORKDIR $APP_PATH
RUN yarn run build-storybook
EXPOSE 5000
CMD ["npm", "run", "serve-storybook"]