FROM node

RUN npm install -g @anthropic-ai/claude-code
RUN mkdir -p /mnt/website
RUN mkdir -p /home/node/.claude
RUN chown node /mnt/website
RUN chown node /home/node/.claude

USER node

WORKDIR /mnt/website

ENTRYPOINT ["bash"]
