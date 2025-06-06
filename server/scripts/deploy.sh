echo -e "\n\n1/3: Building Docker image"
docker build -t wetambara/tellme-server:latest -f Dockerfile .

echo -e "\n\n2/3: Pushing image to Docker Hub"
docker push wetambara/tellme-server:latest

echo -e "\n\n3/3: Updating kubernetes deployment image"
# kubectl rollout restart -n tellme deployment/deployment-server

