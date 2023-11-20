FROM nginx:latest 

# WORKDIR /code
WORKDIR /usr/share/nginx/html

COPY . /usr/share/nginx/html
# COPY . /code/
# COPY index.html /usr/share/nginx/html

# html : port 80 
EXPOSE 80 

