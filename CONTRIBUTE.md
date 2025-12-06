# Contributing to LOLPROX

Thank you for your interest in contributing to LOLPROX! This document provides guidelines for submitting new Proxmox VE techniques and binaries.

## Submission Requirements

### Binary Documentation Format

All binary documentation should be placed in `_lolprox/` and follow this YAML frontmatter format:

```yaml
---
Name: binary-name
Description: Brief description of the binary and its legitimate purpose, followed by how adversaries may abuse it.
Author: 'Your Name'
Created: YYYY-MM-DD
Commands:
  - Command: exact command syntax
    Description: What the command does
    Usecase: How adversaries abuse this capability
    Category: discovery|execution|persistence|privilege-escalation|defense-evasion|credential-access|collection|lateral-movement|command-and-control|exfiltration|impact
    Privileges: Administrator|User|Any
    MitreID: TXXXX.XXX
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - alternative syntax 1
      - alternative syntax 2
    Tags:
      - Relevant Tag
Full_Path:
  - Path: /path/to/binary
Detection:
  - Note: Detection guidance
Resources:
  - Link: https://relevant-documentation.com
Acknowledgement:
  - Person: Contributor Name
    Handle: '@twitter_handle'
---
```

### Required Fields

- **Name**: The binary or tool name
- **Description**: Clear description of legitimate use and adversary abuse potential
- **Author**: Your name or handle
- **Created**: Date in YYYY-MM-DD format
- **Commands**: At least one documented command
- **Full_Path**: Filesystem path(s) to the binary

### Command Requirements

Each command entry must include:
- **Command**: Exact syntax (use `{placeholders}` for variable values)
- **Description**: Technical description of what the command does
- **Usecase**: How adversaries would abuse this in an attack
- **Category**: One of the defined categories
- **Privileges**: Required privilege level
- **MitreID**: MITRE ATT&CK technique ID (if applicable)
- **OperatingSystem**: Should be "Proxmox VE"

### Optional Fields

- **ProceduralExamples**: Alternative command syntaxes or variations observed in the wild
- **Tags**: Relevant tags (e.g., "Lateral Movement", "vsock", "Guest Agent Abuse")
- **Detection**: Detection and monitoring guidance
- **Resources**: Links to relevant documentation or threat intelligence
- **Acknowledgement**: Credit researchers who discovered or documented the technique

## Categories

Use one of the following categories for each command:

| Category | Description |
|----------|-------------|
| discovery | Gathering information about the environment |
| execution | Running code or commands |
| persistence | Maintaining access across reboots |
| privilege-escalation | Gaining higher privileges |
| defense-evasion | Avoiding detection |
| credential-access | Stealing credentials |
| collection | Gathering data for exfiltration |
| lateral-movement | Moving to other systems |
| command-and-control | Communicating with attacker infrastructure |
| exfiltration | Stealing data |
| impact | Destructive operations |

## Submission Process

1. Fork the repository
2. Create a new branch for your submission
3. Add your binary documentation in `_lolprox/`
4. Update `functions.md` if adding new capability categories
5. Update `mitre_attack_navigator_layer.json` with new MITRE mappings
6. Submit a pull request with:
   - Clear title describing the addition
   - Description of the technique(s) documented
   - Any relevant threat intelligence references

## Quality Guidelines

- **Test your commands**: All documented commands should be tested on a Proxmox VE system
- **Provide real examples**: Include actual output examples where helpful
- **Focus on LOTL**: Document native Proxmox tools, not third-party software
- **Include detection**: Help defenders by including detection guidance
- **Credit sources**: Acknowledge researchers and threat intelligence sources

## Code of Conduct

- This project is for **authorised security assessments only**
- Do not submit techniques that only work with exploits or vulnerabilities
- Focus on abuse of legitimate functionality ("Living Off The Land")
- Respect the security community and credit original researchers

## Questions?

Open an issue if you have questions about the contribution process or format requirements.
