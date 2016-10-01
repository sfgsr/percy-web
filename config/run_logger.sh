#!/bin/bash

# This file is copied into /etc/service/<service>/log/run in containers, and runit will use it
# to log stdout/stderr from the supervised services. Usually we log directly to syslog, but this
# catches catastrophe logging such as if the supervised service can't start at all.
exec logger -p user.error