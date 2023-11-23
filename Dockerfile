
FROM nginx:latest 

WORKDIR /usr/share/nginx/html

COPY . /usr/share/nginx/html

# html : port 80 
EXPOSE 80 

