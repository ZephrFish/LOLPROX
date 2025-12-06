// MITRE ATT&CK Technique ID to Name Mapping
mapping = {"T1001": "Data Obfuscation", "T1005": "Data from Local System", "T1021": "Remote Services", "T1059": "Command and Scripting Interpreter", "T1059.004": "Unix Shell", "T1069": "Permission Groups Discovery", "T1069.001": "Local Groups", "T1074": "Data Staged", "T1074.001": "Local Data Staging", "T1078": "Valid Accounts", "T1082": "System Information Discovery", "T1087": "Account Discovery", "T1087.001": "Local Account", "T1090": "Proxy", "T1090.001": "Internal Proxy", "T1098": "Account Manipulation", "T1098.001": "Additional Cloud Credentials", "T1105": "Ingress Tool Transfer", "T1135": "Network Share Discovery", "T1136": "Create Account", "T1136.001": "Local Account", "T1485": "Data Destruction", "T1489": "Service Stop", "T1529": "System Shutdown/Reboot", "T1548": "Abuse Elevation Control Mechanism", "T1552": "Unsecured Credentials", "T1552.001": "Credentials In Files", "T1552.004": "Private Keys", "T1562": "Impair Defenses", "T1562.004": "Disable or Modify System Firewall", "T1567": "Exfiltration Over Web Service", "T1572": "Protocol Tunneling", "T1610": "Deploy Container", "T1611": "Escape to Host"};

window.addEventListener('load', function () {
    document.querySelectorAll('*[data-attack-tid]').forEach((element) => {
        let tid = element.dataset['attackTid'];
        if (mapping[tid]) {
            element.innerHTML = "<a href=\"https://attack.mitre.org/techniques/"+tid.replace('.','/')+"/\"><span class=\"attack-technique-id\">"+tid+"</span>: <span class=\"attack-technique-name\">" + mapping[tid] + "</span></a>";
        }
    });

    // If there is a pre-existing query, refresh
    var search = document.getElementById('bin-search');
    if(search != null){
        var query = document.getElementById('bin-search').value.toLowerCase().trim();
        if(query){
            filter(query);
        }
    }
});
