# Base image.
# Check for new versions: https://github.com/phusion/passenger-docker/blob/master/Changelog.md
FROM phusion/passenger-nodejs:0.9.15

RUN apt-get update
RUN apt-get upgrade -y

# Set correct environment variables.
ENV HOME /root

# Setup the app directory and build the ember app.
RUN npm install -g ember-cli bower
ADD . /home/app/
WORKDIR /home/app/
RUN npm rebuild
RUN ember build --environment=production

# Configure nginx to serve dist directory.
RUN rm /etc/nginx/sites-enabled/default
ADD ./config/server/nginx-site.conf /etc/nginx/sites-enabled/nginx-site.conf

# Nginx is disabled by default. Enable it (see https://github.com/phusion/passenger-docker).
RUN rm -f /etc/service/nginx/down

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Default command to run when this container is run (use baseimage-docker's init process).
# DO NOT CHANGE. See: http://phusion.github.io/baseimage-docker/
CMD ["/sbin/my_init"]
