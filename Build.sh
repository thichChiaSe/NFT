echo Bakco#115 | docker login -u bakcovn --password-stdin
docker build -t bakcovn/irm-fe:dev-t .
docker push bakcovn/irm-fe:dev-t
docker rmi  bakcovn/irm-fe:dev-t
