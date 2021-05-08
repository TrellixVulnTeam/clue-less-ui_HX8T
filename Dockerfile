# Use official node image as the base image
FROM node:latest
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm install -g @angular/cli
ENTRYPOINT ng serve --host 0.0.0.0 --port 4200 --disable-host-check

# # Stage 2: Serve app with nginx server
# FROM nginx:latest
# COPY --from=build /usr/local/app/dist/ui /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80