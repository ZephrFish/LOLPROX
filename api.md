---
layout: page
title: API
---

LOLPROX data can be accessed programmatically via the raw YAML files in the GitHub repository.

## Endpoints

### All Binaries
Access the raw binary documentation files:

```
https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/_lolprox/{binary}.md
```

Example:
```
https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/_lolprox/qm.md
```

### MITRE ATT&CK Navigator Layer
```
https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/mitre_attack_navigator_layer.json
```

### Function Categories
```
https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/_data/functions.yml
```

## Available Binaries

| Binary | Raw URL |
|--------|---------|
{% for bin in site.lolprox %}| {{ bin.Name }} | [{{ bin.Name }}.md](https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/_lolprox/{{ bin.Name }}.md) |
{% endfor %}

## Data Format

Each binary file uses YAML frontmatter with the following structure:

```yaml
---
Name: binary-name
Description: Description of the binary
Author: Author name
Created: YYYY-MM-DD
Commands:
  - Command: command syntax
    Description: What the command does
    Usecase: How adversaries abuse it
    Category: discovery|execution|persistence|...
    Privileges: Administrator|User|Any
    MitreID: TXXXX.XXX
    OperatingSystem: Proxmox VE
    ProceduralExamples:
      - example 1
      - example 2
    Tags:
      - Tag 1
Full_Path:
  - Path: /path/to/binary
Detection:
  - Note: Detection guidance
Resources:
  - Link: https://documentation.url
Acknowledgement:
  - Person: Name
    Handle: '@twitter'
---
```
