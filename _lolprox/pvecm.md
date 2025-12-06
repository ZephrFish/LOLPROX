---
Name: pvecm
Description: pvecm (Proxmox VE Cluster Manager) manages Proxmox VE cluster operations including node membership, quorum, and corosync configuration. Adversaries can use pvecm to enumerate cluster topology, identify all nodes for lateral movement, and understand the cluster authentication infrastructure.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pvecm status
    Description: Display cluster status including quorum, node membership, and ring status.
    Usecase: Enumerate cluster topology to identify all nodes and their status for lateral movement planning.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvecm status
      - pvecm status 2>/dev/null || echo "Standalone node"

  - Command: pvecm nodes
    Description: List all nodes in the cluster with their node ID, name, and status.
    Usecase: Identify all cluster members for comprehensive infrastructure enumeration.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: pvecm expected {votes}
    Description: Set expected votes for quorum calculation.
    Usecase: Manipulation of cluster quorum to enable operations without full consensus (potentially disruptive).
    Category: impact
    Privileges: Administrator
    MitreID: T1489
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/corosync.conf
    Description: Read the corosync configuration file containing cluster node IPs and authentication settings.
    Usecase: Extract cluster node IP addresses and network configuration for lateral movement.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - cat /etc/pve/corosync.conf
      - grep -E "ring0_addr|name" /etc/pve/corosync.conf

Full_Path:
  - Path: /usr/bin/pvecm

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pvecm.1.html
  - Link: https://pve.proxmox.com/wiki/Cluster_Manager

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
