# The image is for updating dependencies and running the dev server,
# which is why we mount the directory instead of copy it.

# Using Node version 24 because of a Yarn bug.
FROM node:24-trixie

# Maybe we will include Claude Code later...
#RUN npm install -g @anthropic-ai/claude-code

RUN ["mkdir", "-p", "/repo"]
WORKDIR /repo

EXPOSE 8000/tcp
#ENTRYPOINT ["yarn", "start", "--host"]
ENTRYPOINT ["sleep", "infinity"]
