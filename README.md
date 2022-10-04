# br-plc-as-webserver [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Made For B&R](https://github.com/hilch/BandR-badges/blob/main/Made-For-BrAutomation.svg)](https://www.br-automation.com)

Demo: use a B&amp;R plc as a web server 

![demo](https://github.com/hilch/br-plc-as-webserver/blob/master/media/demo.gif)


## Repository

- As/webdemo : Automation Studio project (ArSim)
- USER/web : HTML website data which should be stored in Flash memory (USER- partition)

## Installation / Usage

1. download release https://github.com/hilch/br-plc-as-webserver/releases

1. set 'Web root directory' to your 'USER/web' - directory ![web-file-device](https://github.com/hilch/br-plc-as-webserver/blob/master/media/web_file_device.png)

1. Compile the Automation Studio project

1. the Automation Studio project uses an ArSim inside, so install the project by 'Offline-Installation' ![projekt-installation](https://github.com/hilch/br-plc-as-webserver/blob/master/media/project_installation.png)

1. Navigate to http://127.0.0.1:80 with your browser

