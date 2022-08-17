# production environment
FROM node:alpine
RUN mkdir build
COPY ./build ./build
RUN yarn global add serve
EXPOSE 80
CMD ["serve", "-l", "80", "-s", "build"]