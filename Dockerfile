# Base image.
FROM fotinakis/baseimage-nodejs:0.10.33

# Add 'web' user which will run the application.
RUN adduser web --home /home/web --shell /bin/bash --disabled-password --gecos ""
ENV HOME /home/web
USER web

# Make npm packages be installed as the non-root web user.
ENV NPM_PACKAGES $HOME/.npm-packages
RUN mkdir -p $NPM_PACKAGES
RUN echo "prefix = $NPM_PACKAGES" >> ~/.npmrc
ENV NODE_PATH $NPM_PACKAGES/lib/node_modules
ENV PATH $NPM_PACKAGES/bin:$PATH

# Install the binaries we need.
RUN npm install -g ember-cli bower

# Add directory where all application code will live and own it by the web user.
USER root
RUN mkdir /app
# Add the whole application source to the image and own it all by web:web.
# Note: this is overwritten in development because fig mounts a shared volume at /app.
ADD . /app/
RUN chown -R web:web /app
WORKDIR /app/
USER web

# Default command to run when this container is run.
CMD ["ember", "server"]
