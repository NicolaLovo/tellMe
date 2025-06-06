# TellMe

## Objectives

TellMe is an app that facilitates communication between citizens and public administrations. It allows the Municipality to publish surveys and generate useful reports for monitoring the territory.
Users can participate in municipal surveys and questionnaires proposed by public and private entities, with incentives in the form of prizes. The app also includes a feature to report issues encountered in the area.

## Development

### Prerequisites

- node.js version 20.0.0 or higher
- npm version 9.0.0 or higher

### Server

Install the dependencies:

```bash
cd server
npm install
```

Run the server in development mode:

```bash
npm run dev
```

Build the server:

```bash
npm run build
```

Run the server in production mode:

```bash
npm start
```

### Client

Install the dependencies:

```bash
cd client
npm install
```

Run the client in development mode:

```bash
npm run dev
```

Build the client:

```bash
npm run build
```

Run the client in production mode:

```bash
npm run preview
```

### Apiary documentation

The API documentation is available at the following link: [Apiary](https://app.apiary.io/tellme/editor). You can view the API documentation and test the endpoints directly from the Apiary interface.

## Deployment

### Stage 1: infrasgtructure setup

1. Obtain a DigitalOcean access token and save it in a file named `do_token` in `./infrastructure/terraform/do_token`. Necessary permissions: `kubernetes:write`, `kubernetes:read`
2. Initialize Terraform:
   ```bash
   cd infrastructure/terraform
   terraform init
   ```
3. Apply the Terraform configuration to create the infrastructure:
   ```bash
   terraform apply
   ```
   This will create a Kubernetes cluster and other necessary resources.

### Stage 2: build and push Docker images

For the client:

```sh
cd 
```
