---
Name: pveversion
Description: pveversion displays Proxmox VE version and package information. It provides detailed system information including kernel version, QEMU version, and all installed Proxmox packages. Adversaries use this for initial reconnaissance to identify the exact Proxmox version for vulnerability research and exploit selection.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pveversion -v
    Description: Display verbose version information including all Proxmox packages and kernel version.
    Usecase: Initial reconnaissance to determine exact Proxmox version, kernel, and package versions for vulnerability identification.
    Category: discovery
    Privileges: Any
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveversion
      - pveversion -v
      - pveversion --verbose

  - Command: pveversion
    Description: Display basic Proxmox VE version in one line.
    Usecase: Quick version check for target identification.
    Category: discovery
    Privileges: Any
    MitreID: T1082
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/bin/pveversion

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pveversion.1.html

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
