---
Name: qm
Description: qm (QEMU Machine) is the primary command-line tool for managing QEMU/KVM virtual machines in Proxmox VE. It provides comprehensive VM lifecycle management including creation, modification, snapshotting, and guest agent interaction. Adversaries can abuse qm for lateral movement via guest agent commands, data exfiltration through snapshots, and VM manipulation for impact.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: qm list
    Description: Lists all QEMU virtual machines on the current node with their VMID, name, status, memory, and boot disk.
    Usecase: Enumerate all VMs on a node to identify targets for lateral movement or ransomware deployment.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm list
      - qm list | grep running

  - Command: qm config {vmid}
    Description: Display full configuration of a VM including hardware, network, and storage settings.
    Usecase: Reconnaissance to understand VM configuration, identify attached networks, and find storage locations.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm config 100
      - qm config 100 --current

  - Command: qm guest exec {vmid} -- /bin/bash -c "command"
    Description: Execute arbitrary commands inside a running VM through the QEMU guest agent.
    Usecase: Lateral movement by executing commands on guest VMs without network authentication. Can be used to deploy payloads, harvest credentials, or pivot through the infrastructure.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm guest exec 102 -- cat /etc/shadow
      - qm guest exec 102 -- /bin/bash -c "whoami && id"
      - qm guest exec 103 -- powershell.exe -Command "Get-Process"
    Tags:
      - Lateral Movement
      - Guest Agent Abuse
      - Credential Access

  - Command: qm guest cmd {vmid} file-read /path/to/file
    Description: Read files directly from a guest VM through the QEMU guest agent.
    Usecase: Exfiltrate sensitive files like credentials, configurations, or data without network access.
    Category: collection
    Privileges: Administrator
    MitreID: T1005
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm guest cmd 102 file-read /etc/passwd
      - 'qm guest cmd 103 file-read "C:\Windows\System32\config\SAM"'

  - Command: qm guest cmd {vmid} file-write /path/to/file base64content
    Description: Write files to a guest VM through the QEMU guest agent using base64-encoded content.
    Usecase: Deploy malware, backdoors, or persistence mechanisms to guest VMs without network access.
    Category: execution
    Privileges: Administrator
    MitreID: T1105
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm guest cmd 102 file-write /tmp/payload.sh $(base64 -w0 payload.sh)

  - Command: qm snapshot {vmid} {snapname}
    Description: Create a snapshot of a VM preserving its current state including memory.
    Usecase: Snapshot VMs before deploying ransomware for rollback capabilities, or snapshot targets for offline disk analysis.
    Category: collection
    Privileges: Administrator
    MitreID: T1074.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm snapshot 100 pre-attack
      - qm snapshot 100 backup --vmstate

  - Command: qm listsnapshot {vmid}
    Description: List all snapshots for a VM showing the snapshot tree.
    Usecase: Identify existing snapshots that may contain older credentials or sensitive data.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: qm stop {vmid}
    Description: Stop a running virtual machine (ungraceful shutdown).
    Usecase: Impact by forcefully shutting down critical VMs to cause denial of service.
    Category: impact
    Privileges: Administrator
    MitreID: T1529
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm stop 100
      - for vm in $(qm list | awk 'NR>1 {print $1}'); do qm stop $vm; done

  - Command: qm destroy {vmid}
    Description: Permanently destroy a VM and all its data.
    Usecase: Destructive impact by permanently deleting VMs and their data.
    Category: impact
    Privileges: Administrator
    MitreID: T1485
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm destroy 100 --purge

  - Command: qm monitor {vmid}
    Description: Access the QEMU monitor interface for low-level VM control.
    Usecase: Direct QEMU monitor access enables advanced operations like memory dumping, device manipulation, and debugging.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm monitor 100
      - echo "info status" | qm monitor 100

  - Command: qm cloudinit dump {vmid} user
    Description: Dump the cloud-init user-data configuration for a VM.
    Usecase: Extract credentials, SSH keys, and configuration secrets from cloud-init templates.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - qm cloudinit dump 100 user
      - qm cloudinit dump 100 network

  - Command: qm showcmd {vmid}
    Description: Display the full QEMU command line used to start a VM.
    Usecase: Reveal sensitive configuration including VNC passwords, disk paths, and network configuration.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: qm agent {vmid} ping
    Description: Ping the QEMU guest agent to verify it's responsive.
    Usecase: Identify VMs with guest agent enabled for potential lateral movement.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - 'for vm in $(qm list | awk ''NR>1 && $3=="running" {print $1}''); do echo -n "VM $vm: "; qm agent $vm ping 2>&1; done'

Full_Path:
  - Path: /usr/sbin/qm

Detection:
  - Note: Monitor /var/log/pve/tasks/* for qm guest exec commands
  - Note: Watch for unusual snapshot creation patterns
  - Note: Alert on mass VM operations (stop/destroy)

Resources:
  - Link: https://pve.proxmox.com/pve-docs/qm.1.html
  - Link: https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines
  - Link: https://pve.proxmox.com/wiki/Qemu-guest-agent

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
