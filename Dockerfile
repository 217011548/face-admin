FROM nginx
ADD default.conf /etc/nginx/conf.d/default.conf
ADD dist/ /var/www/html
