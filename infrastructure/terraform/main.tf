locals {
  region = "ams3"
}

# Define a Kubernetes cluster in DigitalOcean
# This cluster will have a single node pool with auto-scaling enabled.
resource "digitalocean_kubernetes_cluster" "main_cluster" {
  name    = "main-cluster"
  region  = local.region
  version = "latest"

  node_pool {
    name = "main-pool"
    # 2CPU, 4GB RAM
    size       = "s-2vcpu-4gb"
    auto_scale = true
    min_nodes  = 1
    max_nodes  = 3
  }
}