---
Name: pvesr
Description: pvesr (Proxmox VE Storage Replication) manages storage replication jobs between cluster nodes. Adversaries can use pvesr to understand replication topology, identify data movement patterns, and potentially abuse replication for data exfiltration.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pvesr list
    Description: List all storage replication jobs.
    Usecase: Enumerate replication jobs to understand data movement between nodes.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesr list
      - pvesr list --output-format=json

  - Command: pvesr status
    Description: Show status of replication jobs including last sync time.
    Usecase: Identify active replication schedules and timing for operational planning.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: pvesr read {id}
    Description: Read configuration of a specific replication job.
    Usecase: Understand replication targets and schedules.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/sbin/pvesr

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pvesr.1.html
  - Link: https://pve.proxmox.com/wiki/Storage_Replication

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
