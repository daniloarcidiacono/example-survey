# example-survey

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### NGINX config
Replace root location path.

```
worker_processes  1;

error_log  logs/error.log;
error_log  logs/error.log  notice;
error_log  logs/error.log  info;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;
    rewrite_log on;

    keepalive_timeout  0;

    server {
        listen       8080;
        server_name  localhost;    
        access_log  logs/host.access.log  main;

        location / {
            root   "C:\work\workspace_java\Stage_2019_BE\example-survey\dist";

            # https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
            try_files $uri $uri/ /index.html;
        }

        # https://stackoverflow.com/questions/38594788/nginx-proxy-pass-all-url-parameters        
        location /api/ {
            # Note the slash at end, which with the above location block
            # will replace "/api/" with "/". This will not work with regex
            # locations
            proxy_pass http://127.0.0.1:9500/;
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```
