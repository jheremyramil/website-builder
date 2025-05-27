FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    vim \
    libzip-dev \
    libpq-dev \
    libcurl4-openssl-dev \
    mariadb-client

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

RUN apt-get update && apt-get install -y dnsutils

RUN apt-get update && apt-get install -y netcat-openbsd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . /var/www
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]
