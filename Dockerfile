FROM nginx

RUN  mkdir /var/log/ruck \
  && touch /var/log/ruck/nginx.access.log \
  && touch /var/log/ruck/nginx.error.log

COPY ./dist /srv/www/ruck/dist
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN chown -R nginx /srv/www/ruck
