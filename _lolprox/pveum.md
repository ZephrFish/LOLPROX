---
Name: pveum
Description: pveum (Proxmox VE User Manager) manages users, groups, roles, and permissions in Proxmox VE. Adversaries can use pveum to enumerate accounts, create backdoor users, escalate privileges, and manipulate access controls for persistence.
Author: 'ZephrFish'
Created: 2025-12-06
Commands:
  - Command: pveum user list
    Description: List all users configured in Proxmox VE.
    Usecase: Enumerate all user accounts to identify targets for credential attacks.
    Category: account enumeration
    Privileges: Administrator
    MitreID: T1087.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveum user list
      - pveum user list --output-format=json-pretty

  - Command: pveum acl list
    Description: List all access control list entries showing permissions.
    Usecase: Map permission structure to identify privilege escalation paths.
    Category: permission enumeration
    Privileges: Administrator
    MitreID: T1069.001
    OperatingSystem: Proxmox VE

  - Command: pveum user add {userid}@{realm} --password {password}
    Description: Create a new user account.
    Usecase: Create backdoor accounts for persistent access.
    Category: persistence
    Privileges: Administrator
    MitreID: T1136.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveum user add backdoor@pve --password secret123
      - pveum user add svc-backup@pam --password P@ssw0rd --comment "Backup Service"

  - Command: pveum acl modify / --roles Administrator --users {user}@{realm}
    Description: Grant administrative privileges to a user.
    Usecase: Escalate privileges for a controlled account to full administrator.
    Category: privilege escalation
    Privileges: Administrator
    MitreID: T1098
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveum acl modify / --roles Administrator --users backdoor@pve
      - pveum acl modify /vms/100 --roles PVEVMAdmin --users attacker@pam

  - Command: pveum user token add {userid}@{realm} {tokenid}
    Description: Create an API token for a user.
    Usecase: Create API tokens for persistent API access without passwords.
    Category: persistence
    Privileges: Administrator
    MitreID: T1098.001
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveum user token add root@pam backdoor --privsep=0
      - pveum user token add backdoor@pve api-access

  - Command: pveum role add {rolename} --privs {privileges}
    Description: Create a custom role with specific privileges.
    Usecase: Create custom roles with specific privileges for stealthy access.
    Category: privilege escalation
    Privileges: Administrator
    MitreID: T1098
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - pveum role add BackdoorRole --privs "VM.PowerMgmt,VM.Console,VM.Audit"

  - Command: pveum group list
    Description: List all groups configured in Proxmox VE.
    Usecase: Enumerate groups to understand organizational structure and target high-privilege groups.
    Category: discovery
    Privileges: Administrator
    MitreID: T1069.001
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/user.cfg
    Description: Read the user configuration file directly.
    Usecase: Extract user configuration including group memberships and role assignments.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.001
    OperatingSystem: Proxmox VE

  - Command: cat /etc/pve/priv/token.cfg
    Description: Read API token configuration file.
    Usecase: Extract API tokens for unauthorized access.
    Category: credential access
    Privileges: Administrator
    MitreID: T1552.001
    OperatingSystem: Proxmox VE

Full_Path:
  - Path: /usr/bin/pveum

Detection:
  - Note: Monitor /etc/pve/user.cfg for changes
  - Note: Alert on new user creation or ACL modifications
  - Note: Watch for API token creation

Resources:
  - Link: https://pve.proxmox.com/pve-docs/pveum.1.html
  - Link: https://pve.proxmox.com/wiki/User_Management

Acknowledgement:
  - Person: ZephrFish
    Handle: '@ZephrFish'
---
