---
Name: pvesh
Description: pvesh is the Proxmox VE API shell tool that provides command-line access to the entire Proxmox API. It can manage VMs, containers, storage, users, permissions, and all cluster resources. Adversaries with administrative access can use pvesh to enumerate the entire infrastructure, modify configurations, and execute privileged operations.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pvesh get /nodes --output-format=json-pretty
    Description: Lists all nodes in the Proxmox cluster with CPU, memory, and disk usage statistics.
    Usecase: Enumerate all nodes in the cluster to understand the infrastructure scope and identify targets.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesh get /nodes
      - pvesh get /nodes --output-format=json

  - Command: pvesh get /cluster/resources --type vm --output-format=json-pretty
    Description: Lists all virtual machines across all cluster nodes with their status, memory, and disk allocation.
    Usecase: Enumerate all VMs in the cluster to identify high-value targets for data theft or ransomware deployment.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesh get /cluster/resources --type vm
      - pvesh get /cluster/resources

  - Command: pvesh get /access/users --output-format=json-pretty
    Description: Lists all users configured in Proxmox VE with their realm, enabled status, and expiration.
    Usecase: Enumerate user accounts to identify potential targets for credential attacks or privilege escalation.
    Category: account enumeration
    Privileges: Administrator
    MitreID: T1087.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesh get /access/users
      - pvesh get /access/users --full

  - Command: pvesh get /access/acl --output-format=json-pretty
    Description: Lists all access control list entries showing user/group permissions on resources.
    Usecase: Map out the permission structure to identify overly permissive configurations or escalation paths.
    Category: permission enumeration
    Privileges: Administrator
    MitreID: T1069.001
    OperatingSystem: Proxmox VE

  - Command: pvesh get /nodes/{node}/qemu/{vmid}/agent/exec --command "whoami"
    Description: Execute arbitrary commands on a VM through the QEMU guest agent.
    Usecase: Lateral movement by executing commands on guest VMs without network access.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE
    Tags:
      - Lateral Movement
      - Guest Agent Abuse

  - Command: pvesh get /nodes/{node}/qemu/{vmid}/agent/file-read --file /etc/passwd
    Description: Read files from a VM through the QEMU guest agent.
    Usecase: Exfiltrate sensitive files from guest VMs without network access or authentication.
    Category: collection
    Privileges: Administrator
    MitreID: T1005
    OperatingSystem: Proxmox VE

  - Command: pvesh create /access/users --userid attacker@pve --password secret123
    Description: Create a new local user account in Proxmox VE.
    Usecase: Persistence by creating a backdoor account with administrative access.
    Category: persistence
    Privileges: Administrator
    MitreID: T1136.001
    OperatingSystem: Proxmox VE

  - Command: pvesh create /access/acl --path / --roles Administrator --users attacker@pve
    Description: Grant full administrative privileges to a user on all resources.
    Usecase: Privilege escalation by granting admin rights to a controlled account.
    Category: privilege escalation
    Privileges: Administrator
    MitreID: T1098
    OperatingSystem: Proxmox VE

  - Command: pvesh get /nodes/{node}/storage/{storage}/content --output-format=json-pretty
    Description: List storage content including VM images, backups, and ISO files.
    Usecase: Discover backup files and VM disk images for potential exfiltration or tampering.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: pvesh create /nodes/{node}/qemu/{vmid}/snapshot --snapname backdoor
    Description: Create a snapshot of a VM that can be used to restore or analyze later.
    Usecase: Create snapshots before deploying malware to enable rollback, or snapshot target VMs for offline analysis.
    Category: collection
    Privileges: Administrator
    MitreID: T1074.001
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/bin/pvesh

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pvesh.1.html
  - Link: https://pve.proxmox.com/wiki/Proxmox_VE_API
  - Link: https://pve.proxmox.com/pve-docs/api-viewer/

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
