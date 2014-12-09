# Base image.
FROM fotinakis/baseimage-nodejs:0.10.33

# Add 'web' user which will run the application.
RUN adduser web --home /home/web --shell /bin/bash --disabled-password --gecos ""

# Add directory where all application code will live and own it by the web user.
RUN mkdir /app
RUN chown -R web:web /app

# Become the web user.
ENV HOME /app
USER web
WORKDIR /app/

# Install npm modules. Individually add package.json here to take advantage of container caching.
ADD package.json /app/
RUN npm install

# Add the whole application source to the image and own it all by web:web.
# Note: this is overwritten in development because fig mounts a shared volume at /app.
ADD . /app/
USER root
RUN chown -R web:web /app
USER web

# Default command to run when this container is run.
CMD ["./node_modules/.bin/ember", "server"]
