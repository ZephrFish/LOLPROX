---
Name: pve-firewall
Description: pve-firewall manages the Proxmox VE firewall including cluster-wide rules, host rules, and per-VM/container rules. Adversaries can manipulate firewall rules to enable lateral movement, disable security controls, or establish persistence through allowed network paths.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pve-firewall status
    Description: Show firewall status for the cluster and local node.
    Usecase: Determine if firewall is enabled and identify security posture.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pve-firewall status
      - pve-firewall localnet

  - Command: cat /etc/pve/firewall/cluster.fw
    Description: Read cluster-wide firewall rules.
    Usecase: Understand network security rules for planning lateral movement.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/nodes/{node}/host.fw
    Description: Read host-specific firewall rules.
    Usecase: Identify node-specific security configurations.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/firewall/{vmid}.fw
    Description: Read VM/container-specific firewall rules.
    Usecase: Identify per-VM security rules and potential bypass opportunities.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: pve-firewall compile
    Description: Compile and display the iptables rules that will be applied.
    Usecase: Understand exact iptables rules for firewall bypass planning.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pve-firewall compile | grep -E "ACCEPT|DROP"

  - Command: pvesh set /nodes/{node}/firewall/options --enable 0
    Description: Disable the firewall on a specific node.
    Usecase: Disable firewall to enable unrestricted network access.
    Category: defense evasion
    Privileges: Administrator
    MitreID: T1562.004
    OperatingSystem: Proxmox VE
    Tags:
      - Defense Evasion

  - Command: pvesh create /cluster/firewall/rules --action ACCEPT --type in --source 0.0.0.0/0 --dport 4444 --proto tcp
    Description: Add a firewall rule allowing inbound traffic.
    Usecase: Create firewall exceptions for C2 traffic or lateral movement.
    Category: defense evasion
    Privileges: Administrator
    MitreID: T1562.004
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/sbin/pve-firewall
  - Path: /etc/pve/firewall/cluster.fw
  - Path: /etc/pve/firewall/

Detection:
  - Note: Monitor /etc/pve/firewall/ for changes
  - Note: Watch for firewall disable operations
  - Note: Alert on permissive rule additions

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pve-firewall.8.html
  - Link: https://pve.proxmox.com/wiki/Firewall

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
