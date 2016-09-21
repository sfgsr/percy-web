FROM gcr.io/percy_dev/baseimage-web:2016-09-07-164954

# Configure nginx to serve dist directory.
RUN rm /etc/nginx/sites-enabled/default
ADD config/nginx_site.conf /etc/nginx/sites-enabled/site.conf

# Configure nginx to run automatically.
ADD config/run_nginx.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

# Global npm packages.
RUN npm install -g bower

# Global test/development packages.
# TODO: if these get much bigger, split out to separate Dockerfile so we don't bloat the prod image.
RUN npm install -g phantomjs-prebuilt

# Setup the app directory and build the ember app.
ADD . /app/src/
RUN chown -R app:app /app/src/
USER app
ENV HOME /app/
WORKDIR /app/src/
RUN npm install
RUN bower install
RUN npm run build-production
USER root
ENV HOME /root
