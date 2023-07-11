var quest = [
    {
        text: "Does the feature have a web interface?",
        items: [
            {
                text: "Does the feature take user input?",
                help: "Select this if your product takes user inputs in any form. E.g., Text, File, Media",
                guide: "#1.1 Web Interface (Takes User Input)\r\nPossible attack categories:\r\n    XSS (CWE-20, CWE-79, CWE-80)\r\n    SQL Injection (CWE-89, CWE-564)\r\n    CRLF Injection (CWE-88, CWE-93)\r\n    Command Injection (CWE-77)\r\n    XML Injection (CWE-91, CWE-112)\r\n    Null Byte Injection (CWE-158)\r\n    LDAP Injection (CWE-90)\r\n    XPATH Injection (CWE-643)\r\n    Buffer Overflow (CWE-121, CWE-120, CWE-122, CWE-680)\r\n    Resource Consumption (CWE-400)\r\n    Large Memory Allocation (CWE-789)\r\n    Integer Overflow (CWE-190)\r\n\r\nRemediation:\r\n    use CSL.Validator -\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Validator\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/ValidatorExtended\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature generate HTML output?",
                guide: "#1.2 Web Interface(HTML generated to be displayed in a browser)\r\nPossible attack categories:\r\n    XSS - Reflected, Persistent, DOM (CWE-20, CWE-79, CWE-80)\r\n    HTML Injection (CWE-88)\r\n    Sensitive Information Disclosure (CWE-200)\r\n\r\nRemediation:\r\n    Use CSL.Encoder -\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Encoder\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/EncoderExtended\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                "text": "Do you have CSRF protection in your application?",
                "guide": "1.3 Web Interface(CSRF)\r\nPossible attack categories:\r\n    CSRF\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-1.3WebInterface \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                "selected": false
            },
            {
                "text": "Does the feature implement security headers?",
                "guide": "1.4 Web Interface(security headers)\r\nPossible attack categories:\r\n    Content-Security-Policy\r\n    Feature-Policy\r\n    X-XSS-Protection\r\n    X-Content-Type-Options\r\n     X-Frame-Options\r\n   Access-Control-Allow-Origin\r\n    Referrer-Policy\r\n    Expect-CT\r\n    Strict-Transport-Security\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-1.4WebInterface \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                "selected": false
            }
        ]
    },
    {
        text: "Does the feature implement email functionality?",
        items: [
            {
                text: " Does the feature take user input into email body?",
                guide: "#2.1 Sends Email(User input into email body)\r\nPossible attack categories:\r\n    HTML Injection (CWE-88)\r\n    Hyperlink Injection in Email leading to Phishing attacks (CWE-88)\r\n\r\nRemediation:\r\n    Use CSL.Encoder - \r\n    https://iwiki.eur.ad.sag/display/ARCH/HTML+Encoding\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature take user supplied SMTP configurations?",
                help: "Select this if your product leverage encryption or hashing mechanism for storing sensitive information",
                guide: "2.2 Sends Email(SMTP configurations)\r\nPossible attack categories:\r\n    Password in Config file (CWE-260)\r\n    SSRF (CWE-918)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-2.2SendsEmail \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature implement CAPTCHA functionality?",
        items: [],
        guide: "3.1 CAPTCHA(Using CAPTCHA)\r\nPossible attack categories:\r\n    CAPTCHA bypass (CWE-639)\r\n    CAPTCHA enumeration (CWE-804)\r\n    CAPTCHA replay (CWE-294)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-3.1CAPTCHA \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n"

    },
    {
        text: "Does the feature make use of any outbound connections?",
        items: [
            {
                text: " Does the feature use stored passwords?",
                guide: "4.1 Outbound Connections(Storing Passwords)\r\nPossible attack categories:\r\n    Password cracking (CWE-522, CWE-916)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-4.1OutboundConnections \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature provide user defined configurations?",
                help: "Select this if your product has a feature to customize users configurations",
                guide:  "4.2 Outbound Connections(User defined configurations)\r\nPossible attack categories:\r\n    SSRF (CWE-918)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-4.2OutboundConnections \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature provide file operations?",
        items: [
            {
                text: " Does the feature use temporary files?",
                help: "Select this if file upload functionality is concerned",
                guide: "#5.1 File operations are used on the server(Temporary files are used)\r\nPossible attack categories:\r\n    Insecure Temporary File (CWE-377)\r\n    Predictable Filenames (CWE-341)\r\n\r\nRemediation:\r\n    Use CSL.getRandomFilename() - \r\n    https://iwiki.eur.ad.sag/display/ARCH/Randomization+Details\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Randomizer  \r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature provide file upload functionality to the server?",
                help: "Select this if file upload functionality is concerned",
                guide: "5.2 File operations are used on the server(File upload to the server)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    RCE (CWE-94)\r\n    XSS (CWE-20, CWE-79, CWE-80)\r\n    File upload XSS (CWE-434)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-5.2Fileoperations \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: " Does the feature provide opening a file based on user-supplied input?",
                guide: "5.3 File operations are used on the server(Opening a file based on user-supplied input)\r\nPossible attack categories:\r\n    Path Traversal (CWE-22)\r\n    External control of filename (CWE-73)\r\n    LFI (CWE-98)\r\n    RFI (CWE-98)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-5.3Fileoperations \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: " Does the feature provide file download functionality?",
                guide: "5.4 File operations are used on the server(File Download)\r\nPossible attack categories:\r\n    XSS(CWE-20, CWE-79, CWE-80)\r\n    CSV Injection(CWE)\r\n    Download without Integrity Check (CWE-494)\r\n    Relative Path Traversal (CWE-23)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-5.4Fileoperations \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: " Does the feature provide zip extraction functionality?",
                guide: "5.5 File operations are used on the server(Zip extraction)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    Zipbomb (CWE-409)\r\n    Zipslip (CWE-22)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-5.5Fileoperations \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: " Does the feature provide functionality to upload multiple file extensions?",
                guide: "5.6 File operations are used on the server(Multiple file extensions supported)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    RCE (CWE-94)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-5.6Fileoperations \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
        ]
    },
    {
        text: "Does the feature use cryptographic algorithms and secrets?",
        items: [
            {
                text: "Does the feature implement storage of keys and passwords?",
                help: "Select this if your product store keys and passwords in filesystem or DB",
                guide: "6.1 Cryptographic algorithms and secrets(Keys and password storage)\r\nPossible attack categories:\r\n    Password cracking (CWE-522, CWE-916)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-6.1CryptographicAlgorithmsAndSecrets \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature generate random numbers?",
                guide: "6.2 Cryptographic algorithms and secrets(Generate Random numbers)\r\nPossible attack categories:\r\n    Weak Cryptography (CWE-338)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-6.2CryptographicAlgorithmsAndSecrets \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature use database?",
        items: [
            {
                text: "Does the feature store passwords in database?",
                guide: "7.1 Database usage(Store sensitive information in Database)\r\nPossible attack categories:\r\n    Information Leak (CWE-532)\r\n    Improper masking of PII (CWE-359)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-7.1Databaseusage \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature execute SQL queries?",
                help: "Select this if your product leverage encryption or hashing mechanism for storing sensitive information",
                guide: "7.2 Database usage(Execute SQL Queries)\r\nPossible attack categories:\r\n    SQL Injection (CWE-89, CWE-564)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-7.2Databaseusage \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature perform parsing on any of the following data formats? (E.g., XML, JSON etc.)",
        items: [
            {
                text: "Does the feature perform XML parsing where the XML data is provided as an external or user input?",
                guide: "8.1 Processing of external input(XML parsing)\r\nPossible attack categories:\r\n    XXE (CWE-611)\r\n    SSRF (CWE-918)\r\n    DTD attacks (CWE-776)\r\n    XML Bomb (CWE-776)\r\n    DoS (CWE-400)\r\n    XML Attribute (CWE-91)\r\n    Blowup (CWE-91)\r\n    XML Entity Expansion (CWE-776)\r\n    XML External Entity (CWE-91)\r\n    XML Injection (CWE-91, CWE-112)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-8.1ProcessingOfExternalInput \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature perform JSON parsing where the JSON data is provided as an external or user input?",
                guide:  "8.2 Processing of external input(JSON data)\r\nPossible attack categories:\r\n    JSON Injection (CWE-74)\r\n    JSON Hijacking (CWE-74)\r\n\r\nRemediation:\r\n     https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-8.2ProcessingOfExternalInput \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature perform REGEX parsing where the REGEX expression is provided as an external or user input?",
                guide: "8.3 Processing of external input(REGX parsing)\r\nPossible attack categories:\r\n    ReDoS (CWE-185)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-8.3ProcessingOfExternalInput \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature implement logging?",
        help: "Select this if the code concerns the logging or audit functionality",
        items: [
            {
                text: "Does the feature use Log4J or other logging frameworks?",
                guide: "9.1 Logging support\r\nPossible attack categories:\r\n    Forged log entries (CWE-117)\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-9.1LoggingSupport \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Does the feature log sensitive information? (e.g., username, IP address etc.)",
                guide:  "9.2 Logging support(Sensitive information in logs)\r\nPossible attack categories:\r\n    Information Leak (CWE-532)\r\n    Improper masking of PII (CWE-359)\r\n    XSS (CWE-20, CWE-79, CWE-80)\r\n    CRLF Injection (CWE-88, CWE-93)\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-9.2LoggingSupport \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
			{
                text:"Does the feature export log files?",
                guide: "9.3 Export logs\r\nPossible attack categories:\r\n    XSS(CWE-20, CWE-79, CWE-80)\r\n    CSV Injection(CWE-74)\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-9.3LoggingSupport \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Does the feature need access control to allow users to use the feature?",
        items: [
            {
                text: "Is the feature allowed to be used by administrator only?",
                guide:  "10.1 Access Controls (Admin only feature)\r\nPossible attack categories:\r\n    Privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-10.1AccessControls \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Is the feature allowed to be used by selective roles only?",
                guide:"10.2 Access Controls(Feature for all roles)\r\nPossible attack categories:\r\n    Vertical privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-10.2AccessControls \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            },
            {
                text: "Is the feature allowed to be used by anonymous/guest users?",
                guide: "10.3 Access Controls(Feature for anonymous/guest roles)\r\nPossible attack categories:\r\n    Vertical privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-10.3AccessControls \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                selected: false,
            }
        ]
    },
    {
        text: "Do you have new 3rd party component added as part of this feature?",
        items: [],
        guide:  "11.1 3rd party component\r\nPossible attack categories:\r\n    Security vulnerabilities\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-11.1ThirdPartyComponent \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n"
        
    },
    {
        text: "General Recommendation",
        help: "This section contains general recommendations to secure an application",
        items: [],
        guide:  "General Recommendation\r\n    1.Configure your server to disable directory listing\r\n   2.Implement Logout buttons in all authenticated pages\r\n    3.Application should ensure that no internal application information is revealed to any user unless necessary\r\n    \r\n https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-GeneralRecommendation \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n"  
    }
]

module.exports = {
    quest
}

/*var quest = {
    items: {
        "Feature Security Impact Analysis": {
            text: "Feature Security Impact Analysis",
            selected: false,
            classes: "list-group-item-info",
            items: {
                "Web Interface": {
                    text: "Does the feature have a web interface?",
                    selected: false,
                    items: {
                        "User Input": {
                            text: "Does the feature take user input?",
                            help: "Select this if your product takes user inputs in any form. E.g., Text, File, Media",
                            guide: "#1.1 Web Interface (Takes User Input)\r\nPossible attack categories:\r\n    XSS (CWE-20, CWE-79, CWE-80)\r\n    SQL Injection (CWE-89, CWE-564)\r\n    CRLF Injection (CWE-88, CWE-93)\r\n    Command Injection (CWE-77)\r\n    XML Injection (CWE-91, CWE-112)\r\n    Null Byte Injection (CWE-158)\r\n    LDAP Injection (CWE-90)\r\n    XPATH Injection (CWE-643)\r\n    Buffer Overflow (CWE-121, CWE-120, CWE-122, CWE-680)\r\n    Resource Consumption (CWE-400)\r\n    Large Memory Allocation (CWE-789)\r\n    Integer Overflow (CWE-190)\r\n\r\nRemediation:\r\n    use CSL.Validator -\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Validator\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/ValidatorExtended\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "HTML": {
                            text: "Does the feature generate HTML output?",
                            guide: "#1.2 Web Interface(HTML generated to be displayed in a browser)\r\nPossible attack categories:\r\n    XSS - Reflected, Persistent, DOM (CWE-20, CWE-79, CWE-80)\r\n    HTML Injection (CWE-88)\r\n    Sensitive Information Disclosure (CWE-200)\r\n\r\nRemediation:\r\n    Use CSL.Encoder -\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Encoder\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/EncoderExtended\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "CSRF": {
                            "text": "Do you have CSRF protection in your application?",
                            "guide": "1.3 Web Interface(CSRF)\r\nPossible attack categories:\r\n    CSRF\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-1.3WebInterface \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            "selected": false
                        },
                        "security headers": {
                            "text": "Does the feature implement security headers?",
                            "guide": "1.4 Web Interface(security headers)\r\nPossible attack categories:\r\n    Content-Security-Policy\r\n    Feature-Policy\r\n    X-XSS-Protection\r\n    X-Content-Type-Options\r\n     X-Frame-Options\r\n   Access-Control-Allow-Origin\r\n    Referrer-Policy\r\n    Expect-CT\r\n    Strict-Transport-Security\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-1.4WebInterface \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            "selected": false
                        },
                    },
                },
                "EMAIL": {
                    text: "Does the feature implement email functionality?",
                    selected: false,
                    items: {
                        "Email Body": {
                            text: " Does the feature take user input into email body?",
                            guide: "#2.1 Sends Email(User input into email body)\r\nPossible attack categories:\r\n    HTML Injection (CWE-88)\r\n    Hyperlink Injection in Email leading to Phishing attacks (CWE-88)\r\n\r\nRemediation:\r\n    Use CSL.Encoder - \r\n    https://iwiki.eur.ad.sag/display/ARCH/HTML+Encoding\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "SMTP configurations": {
                            text: "Does the feature take user supplied SMTP configurations?",
                            help: "Select this if your product leverage encryption or hashing mechanism for storing sensitive information",
                            guide: "#2.2 Sends Email(SMTP configurations)\r\nPossible attack categories:\r\n    Password in Config file (CWE-260)\r\n    SSRF (CWE-918)\r\n\r\nRemediation:\r\n    1.Encrypt the password in config file. Use Passman\r\n    2.Use the configuration only from a whitelisted set of IP address.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "CAPTCHA": {
                    text: "Does the feature implement CAPTCHA functionality?",
                    selected: false,
                    items: {
                    },
                    guide: "#3.1 CAPTCHA(Using CAPTCHA)\r\nPossible attack categories:\r\n    CAPTCHA bypass (CWE-639)\r\n    CAPTCHA enumeration (CWE-804)\r\n    CAPTCHA replay (CWE-294)\r\n\r\nRemediation:\r\n    Use Google Recaptcha or Math captcha\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                },

                "Outbound Connections": {
                    text: "Does the feature make use of any outbound connections?",
                    selected: false,
                    items: {
                        "Storing passwords": {
                            text: " Does the feature use stored passwords?",
                            guide: "#4.1 Outbound Connections(Storing Passwords)\r\nPossible attack categories:\r\n    Password cracking (CWE-522, CWE-916)\r\n\r\nRemediation:\r\n    Encrypt the password in config file. Use Passman\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "User defined configurations": {
                            text: "Does the feature provide user defined configurations?",
                            help: "Select this if your product has a feature to customize users configurations",
                            guide: "#4.2 Outbound Connections(User defined configurations)\r\nPossible attack categories:\r\n    SSRF (CWE-918)\r\n\r\nRemediation:\r\n    Use the configuration only from a whitelisted set of IP address.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "File operations": {
                    text: "Does the feature provide file operations?",
                    help: "Select this if file operations are performed on the server side",
                    selected: false,
                    items: {
                        "Temporary files are used": {
                            text: " Does the feature use temporary files?",
                            help: "Select this if file upload functionality is concerned",
                            guide: "#5.1 File operations are used on the server(Temporary files are used)\r\nPossible attack categories:\r\n    Insecure Temporary File (CWE-377)\r\n    Predictable Filenames (CWE-341)\r\n\r\nRemediation:\r\n    Use CSL.getRandomFilename() - \r\n    https://iwiki.eur.ad.sag/display/ARCH/Randomization+Details\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Randomizer  \r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "File upload to the server": {
                            text: "Does the feature provide file upload functionality to the server?",
                            help: "Select this if file upload functionality is concerned",
                            guide: "#5.2 File operations are used on the server(File upload to the server)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    RCE (CWE-94)\r\n    XSS (CWE-20, CWE-79, CWE-80)\r\n    File upload XSS (CWE-434)\r\n\r\nRemediation:\r\n    Use:\r\n    1.CSL.Validator.isValidFileName.\r\n    2.CSL.Validator.isValidFileContent.\r\n    3.CSL.Validator.isValidFileUpload.\r\n    4.SAGCustomValidator.validateFileType\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Opening a file based on user-supplied input": {
                            text: " Does the feature provide opening a file based on user-supplied input?",
                            guide: "#5.3 File operations are used on the server(Opening a file based on user-supplied input)\r\nPossible attack categories:\r\n    Path Traversal (CWE-22)\r\n    External control of filename (CWE-73)\r\n    LFI (CWE-98)\r\n    RFI  (CWE-98)\r\n\r\nRemediation:\r\n    Use:\r\n    1.getValidFilePathLocalOS().\r\n    2.getValidExistingDirectoryPathLocalOS()\r\n    3.getValidDirectoryPathLocalOS()\r\n    4.getValidExistingFilePathLocalOS()\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "File Download": {
                            text: " Does the feature provide file download functionality?",
                            guide: "#5.4 File operations are used on the server(File Download)\r\nPossible attack categories:\r\n    Download without Integrity Check (CWE-494)\r\n    Relative Path Traversal (CWE-23)\r\n\r\nRemediation:\r\n    1.Ensure the checksum values are provided for downloadable(for clients to check)\r\n    2.Use CSL.Validator (to avoid path traversal)- \r\n    https://iwiki.eur.ad.sag/display/ARCH/Validation+of+paths+in+the+filesystem\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Zip extraction": {
                            text: " Does the feature provide zip extraction functionality?",
                            guide: "#5.4 File operations are used on the server(Zip extraction)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    Zipbomb (CWE-409)\r\n    Zipslip (CWE-22)\r\n\r\nRemediation:\r\n    Use SAGCustomValidator.checkIsZipFileSafe.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Multiple file extensions": {
                            text: " Does the feature provide functionality to upload multiple file extensions?",
                            guide: "#5.5 File operations are used on the server(Multiple file extensions supported)\r\nPossible attack categories:\r\n    DoS (CWE-400)\r\n    Zipbomb (CWE-409)\r\n    Zipslip (CWE-22)\r\n\r\nRemediation:\r\n    Use SAGCustomValidator.checkIsZipFileSafe.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "Cryptography": {
                    text: "Does the feature use cryptographic algorithms and secrets?",
                    help: "Select this if changes touch up on code that uses cryptography: encryption, decryption, hashing, random number generation etc. or stores secrets like passwords and keys",
                    selected: false,
                    items: {
                        "Keys and password storage": {
                            text: "Does the feature implement storage of keys and passwords?",
                            help: "Select this if your product store keys and passwords in filesystem or DB",
                            guide: "#6.1 Cryptographic algorithms and secrets(Keys and password storage)\r\nPossible attack categories:\r\n    Password cracking (CWE-522, CWE-916)\r\n\r\nRemediation:\r\n    Encrypt the password in config file. Use Passman\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Generate Random numbers": {
                            text: "Does the feature generate random numbers?",
                            guide: "#6.3 Cryptographic algorithms and secrets(Generate Random numbers)\r\nPossible attack categories:\r\n    Weak Cryptography (CWE-338)\r\n\r\nRemediation:\r\n    Use CSL.Randomizer - \r\n    https://iwiki.eur.ad.sag/display/ARCH/Randomization+Details\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Randomizer\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "Database": {
                    text: "Does the feature use database?",
                    help: "Select this if the code makes use of a database",
                    selected: false,
                    items: {
                        "Passwords in Database": {
                            text: "Does the feature store passwords in database?",
                            guide: "#7.1 Database usage(Store sensitive information in Database)\r\nPossible attack categories:\r\n    Information Leak (CWE-532)\r\n    Improper masking of PII (CWE-359)\r\n\r\nRemediation:\r\n    1.Encrypt the password in config file. Use Passman\r\n    2.Apply Data masking. <tba> in CSL.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Execute SQL Queries": {
                            text: "Does the feature execute SQL queries?",
                            help: "Select this if your product leverage encryption or hashing mechanism for storing sensitive information",
                            guide: "#7.2 Database usage(Execute SQL Queries)\r\nPossible attack categories:\r\n    SQL Injection (CWE-89, CWE-564)\r\n\r\nRemediation:\r\n    1.Effective way: Use prepared statements\r\n    2.Alternate way: Use encodeForMySQL(),encodeForOracle()\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "Input processing": {
                    text: "Does the feature perform parsing on any of the following data formats? (E.g., XML, JSON etc.)",
                    help: "Select this if your code will be processing or parsing data that may originate externally at least in part",
                    selected: false,
                    items: {
                        "XML parsing": {
                            text: "Does the feature perform XML parsing where the XML data is provided as an external or user input?",
                            guide: "#8.1 Processing of external input(XML parsing)\r\nPossible attack categories:\r\n    XXE (CWE-611)\r\n    SSRF (CWE-918)\r\n    DTD attacks (CWE-776)\r\n    XML Bomb (CWE-776)\r\n    DoS (CWE-400)\r\n    XML Attribute (CWE-91)\r\n    Blowup (CWE-91)\r\n    XML Entity Expansion (CWE-776)\r\n    XML External Entity (CWE-91)\r\n    XML Injection (CWE-91, CWE-112)\r\n\r\nRemediation:\r\n    Please implement accordingly Refer: https://iwiki.eur.ad.sag/x/2QnnEg\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "JSON data": {
                            text: "Does the feature perform JSON parsing where the JSON data is provided as an external or user input?",
                            guide: "#8.2 Processing of external input(JSON data)\r\nPossible attack categories:\r\n    JSON Injection (CWE-74)\r\n    JSON Hijacking (CWE-74)\r\n\r\nRemediation:\r\n     JSON Sanitizer (to be integrated in to CSL)\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "REGX parsing": {
                            text: "Does the feature perform REGEX parsing where the REGEX expression is provided as an external or user input?",
                            guide: "#8.3 Processing of external input(REGX parsing)\r\nPossible attack categories:\r\n    ReDoS (CWE-185)\r\n\r\nRemediation:\r\n    JSON Sanitizer (to be integrated in to CSL)\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "Logging": {
                    text: "Does the feature implement logging?",
                    help: "Select this if the code concerns the logging or audit functionality",
                    selected: false,
                    items: {
                        "Log4j is used": {
                            text: "Does the feature use Log4J or other logging frameworks?",
                            guide: "#9.1 Logging support(Log4j is used)\r\nPossible attack categories:\r\n    Forged log entries (CWE-117)\r\n\r\nRemediation:\r\n    1.Use \"csl-logger\" appender plugin for Log4j\r\n    2.CSL.IEncoderExtended.encodeForLog() -\r\n    https://iwiki.eur.ad.sag/display/ARCH/Log+Encoding\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Sensitive information in logs": {
                            text: "Does the feature log sensitive information? (e.g., username, IP address etc.)",
                            guide: "#9.2 Logging support(Sensitive information in logs)\r\nPossible attack categories:\r\n    Information Leak (CWE-532)\r\n    Improper masking of PII (CWE-359)\r\n\r\nRemediation:\r\n    1. Avoid sensitive information in logs\r\n    2. Leverage Data masking in logs (to be integrated in to CSL)\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },

                "Access Control": {
                    text: "Does the feature need access control to allow users to use the feature?",
                    selected: false,
                    items: {
                        "Admin only feature": {
                            text: "Is the feature allowed to be used by administrator only?",
                            guide: "#10.1 Access Controls (Admin only feature)\r\nPossible attack categories:\r\n    Privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     Ensure the feature is tightly bound with only 'Admin' role.\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Feature for selective roles": {
                            text: "Is the feature allowed to be used by selective roles only?",
                            guide: "#10.2 Access Controls(Feature for all roles)\r\nPossible attack categories:\r\n    Vertical privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     Ensure the feature is tightly bound with appropriate roles\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                        "Feature for anonymous/guest users": {
                            text: "Is the feature allowed to be used by anonymous/guest users?",
                            guide: "#10.3 Access Controls(Feature for anonymous/guest roles)\r\nPossible attack categories:\r\n    Vertical privilege escalation (CWE-269)\r\n    Insecure Direct Object Reference (CWE-639)\r\n\r\nRemediation:\r\n     Ensure the feature is tightly bound with appropriate roles\r\n\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                            selected: false,
                        },
                    },
                },
                "3rd party component": {
                    "text": "Do you have new 3rd party component added as part of this feature?",
                    "selected": false,
                    "items": {
                    },
                    "guide": "11.1 3rd party component\r\nPossible attack categories:\r\n    Security vulnerabilities\r\n\r\nRemediation:\r\n    https://iwiki.eur.ad.sag/display/RNDWMNFT/Security+Impact+Analysis+Attack+Remediations#SecurityImpactAnalysisAttackRemediations-11.1ThirdPartyComponent \r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n"
                },
                "General recommendation": {
                    text: "General Recommendation",
                    help: "This section contains general recommendations to secure an application",
                    items: {
                    },
                    selected: true,
                    guide: "General Recommendation\r\n    1.Configure your server to disable directory listing\r\n    2.Assure third-Party links/page(partial/full) open in different tab, with a disclaimer\r\n    3.Implement Logout buttons in all authenticated pages\r\n    4.Please consider implementing CSRF defense techniques\r\n    5.Application should ensure that no internal application information is revealed to any user unless necessary\r\n    6.Assure third-party software are up to date\r\n    7.Ensure that the application sets Secure Headers to increase the security of the application\r\n---------------------------------------------------------------------------------------------------------------------------------------------------------\r\n",
                },
            },
        },
    }
}
    */

