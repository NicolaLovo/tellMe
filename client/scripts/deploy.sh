echo -e "\n\n1/3: Building Docker image"
docker build -t wetambara/tellme-client:latest -f Dockerfile .

echo -e "\n\n2/3: Pushing image to Docker Hub"
docker push wetambara/tellme-client:latest

echo -e "\n\n3/3: Updating kubernetes deployment image"
# kubectl rollout restart -n tellme deployment/deployment-client

