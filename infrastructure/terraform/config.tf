terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  required_version = ">= 1.10.0"
}



provider "digitalocean" {
  # DigitalOcean API token
  # located in the file "do_token"
  # This file should not be committed to version control.
  token = file("do_token")
}
