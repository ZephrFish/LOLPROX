---
layout: page
title: LOLPROX
---

<div class="header-box">
<div markdown="1">

**Living Off The Land Proxmox** (LOLPROX) is the curated catalog of native Proxmox VE binaries and techniques that adversaries can abuse for post-exploitation operations.

This project maintains a comprehensive list of binaries natively available in Proxmox VE that can be leveraged by adversaries during security assessments and red team operations. The documentation is compiled from real-world testing and threat research.

For the full write-up on LOLPROX techniques and methodology, see the [blog post](https://blog.zsec.uk/lolprox/). For defensive guidance and detection strategies, see the [defense blog post](https://blog.zsec.uk/lolprox-defend/).

</div>
<img src="/assets/logo.svg" class="logo" alt="LOLPROX logo">
</div>

The project was created by [ZephrFish](https://twitter.com/ZephrFish), inspired by the [LOLESXi](https://lolesxi-project.github.io/LOLESXi/) project and following the methodology established by [LOLBAS](https://lolbas-project.github.io/).

See also:
- [LOLESXi](https://lolesxi-project.github.io/LOLESXi/) - for VMware ESXi
- [LOLBAS](https://lolbas-project.github.io/) - for Windows
- [GTFOBins](https://gtfobins.github.io/) - for Unix

The MITRE ATT&CK mappings for all documented techniques can be visualised using the [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/#layerURL=https://raw.githubusercontent.com/ZephrFish/LOLPROX/main/mitre_attack_navigator_layer.json).

This site can be accessed programmatically; see the [API](/api/) for more information. For a quick reference of all documented capabilities, see the [Functions](/functions/) page.

Want to contribute? Check out the [contribution guidelines on GitHub](https://github.com/ZephrFish/LOLPROX/blob/main/CONTRIBUTE.md).

{% include bin_table.html %}
