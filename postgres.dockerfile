FROM postgres:13.22-trixie

LABEL author="Bolhaszook"
LABEL description="Postgres Image for demo"
LABEL version="1.0"

COPY *.sql /docker-entrypoint-initdb.d/