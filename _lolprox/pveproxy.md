---
Name: pveproxy
Description: pveproxy is the Proxmox VE API daemon that handles all web interface and API requests. Understanding pveproxy configuration and logs helps adversaries identify authentication mechanisms, API endpoints, and potential vulnerabilities. The associated certificates and keys are critical targets.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: cat /etc/pve/priv/pve-root-ca.key
    Description: Read the Proxmox root CA private key.
    Usecase: Extract the root CA key to forge certificates for MITM attacks or impersonation.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.004
    OperatingSystem: Proxmox VE
    Tags:
      - Certificate Theft
      - MITM

  - Command: cat /etc/pve/pve-root-ca.pem
    Description: Read the Proxmox root CA certificate.
    Usecase: Obtain the root CA certificate for trust analysis or certificate forging.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.004
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/local/pve-ssl.key
    Description: Read the node's SSL private key.
    Usecase: Extract SSL key for MITM attacks on the web interface.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.004
    OperatingSystem: Proxmox VE

  - Command: openssl x509 -in /etc/pve/local/pve-ssl.pem -text -noout
    Description: Analyze the node's SSL certificate.
    Usecase: Examine certificate details including validity, SANs, and issuer.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/priv/authkey.key
    Description: Read the authentication key used for ticket signing.
    Usecase: Extract the auth key to forge authentication tickets.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.004
    OperatingSystem: Proxmox VE
    Tags:
      - Credential Access
      - Ticket Forgery

  - Command: grep -r "ticket" /var/log/pveproxy/
    Description: Search proxy logs for authentication tickets.
    Usecase: Harvest authentication tickets from logs for session hijacking.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.001
    OperatingSystem: Proxmox VE

  - Command: systemctl status pveproxy
    Description: Check pveproxy service status.
    Usecase: Verify API service is running and identify any configuration issues.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

  - Command: cat /etc/default/pveproxy
    Description: Read pveproxy configuration defaults.
    Usecase: Identify custom configurations, cipher suites, and security settings.
    Category: discovery
    Privileges: Administrator
    MitreID: T1082
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/bin/pveproxy
  - Path: /etc/pve/priv/pve-root-ca.key
  - Path: /etc/pve/pve-root-ca.pem
  - Path: /etc/pve/local/pve-ssl.key
  - Path: /etc/pve/priv/authkey.key

Detection:
  - Note: Monitor access to /etc/pve/priv/ directory
  - Note: Watch for certificate file reads
  - Note: Alert on unauthorized private key access

Resources:
  - Link: https://pve.proxmox.com/wiki/Certificate_Management
  - Link: https://pve.proxmox.com/pve-docs/pveproxy.8.html

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
