# Prometheus + Grafana Monitoring Demo

A small Node.js/Express app instrumented with custom Prometheus metrics, monitored by Prometheus, and visualized in Grafana.

## What this project demonstrates

- Exposing custom metrics (Counter and Gauge)
- Containerizing an app with Docker
- Docker networking between containers
- Configuring Prometheus to scrape a target
- Connecting Grafana to Prometheus
- Writing PromQL queries including rate()

## Metrics exposed

| Metric | Type | What it measures |
|---|---|---|
| my_app_requests_total | Counter | Total requests (only increases) |
| my_app_active_connections | Gauge | Simulated value, goes up/down |

## Running it

docker network create monitoring-net
docker build -t my-monitoring-app .
docker run -d -p 3000:3000 --name monitoring-app --network monitoring-net my-monitoring-app
docker run -d -p 9090:9090 --name prometheus --network monitoring-net -v "$(pwd)/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
docker run -d -p 3001:3000 --name grafana --network monitoring-net grafana/grafana

Then connect Grafana (localhost:3001) to Prometheus using URL: http://prometheus:9090
