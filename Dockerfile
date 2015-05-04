FROM gcr.io/perceptual_ci_prod/baseimage-api:latest

# Configure nginx to serve dist directory.
RUN rm /etc/nginx/sites-enabled/default
ADD config/server/nginx-site.conf /etc/nginx/sites-enabled/nginx-site.conf

# Configure nginx to run automatically.
ADD config/server/nginx.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

# Setup the app directory and build the ember app.
RUN npm install -g ember-cli bower
ADD . /home/app/
WORKDIR /home/app/
RUN npm rebuild
RUN ember build --environment=production
