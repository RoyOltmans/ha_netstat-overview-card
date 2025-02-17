# Netstat Overview Card

A Home Assistant **Lovelace** custom card for displaying network connection data from a sensor (`sensor.network_connections`). The table features **sticky headers**, ensuring the column names remain visible when scrolling. The card is designed for **Panel Mode**, making it fill the entire screen.

![preview](/images/preview.png)

## Features

- Displays live network connections (Source, Source Port, Target, Destination Port).
- **Sticky header row** stays visible while scrolling.
- Fully responsive and optimized for **Panel Mode** in Lovelace.
- Customizable header background color (`var(--primary-color)`) with **white text and borders**.
- Integrates seamlessly with Home Assistant.


## Requirements

- **Home Assistant** with Lovelace UI.


## Installation

### Step 1: Download the Card

1. **Download** or copy `ha_netstat-overview-card.js`.
2. Place it in your Home Assistant **`www` folder** (e.g., `/config/www/`).

### Step 2: Add as a Lovelace Resource

#### UI Mode
1. Navigate to **Settings** → **Dashboards** → **Resources**.
2. Click the **+ Add Resource** button.
3. Enter the URL: `/local/ha_netstat-overview-card.js`.
4. Set **Resource Type** to **JavaScript Module**.
5. Click **Create**.

#### YAML Mode
Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/ha_netstat-overview-card.js
      type: module
```

### Step 3: Restart and Clear Cache
1. **Restart** Home Assistant.
2. **Clear your browser cache** (Ctrl+Shift+R or equivalent) to ensure the new card loads correctly.


## Usage

### Adding the Card in Lovelace

1. Create a new **Panel Mode** view in Lovelace (Settings → Dashboards → Edit View → Enable Panel Mode).
2. Add a **Manual Card** with the following YAML:

```yaml
type: custom:netstat-overview-card
```

3. Save and refresh the dashboard.

### Example View Configuration

```yaml
title: Netstat
icon: mdi:server-network
panel: true  # Ensures full-screen usage
cards:
  - type: custom:netstat-overview-card
```


## Sensor Data Example

Here’s an example of the expected format for `sensor.network_connections` (Viewable in Developer Tools → States):

```yaml
sensor.network_connections:
  state: "Last Updated: 2025-02-11 13:45"
  attributes:
    connections:
      - source: "192.168.1.10"
        sport: 57832
        target: "192.168.1.1"
        port: 443
      - source: "192.168.1.11"
        sport: 33445
        target: "example.com"
        port: 80
```

The card will automatically display each connection in a scrollable table.

### Sensor with network connections needed

Example sensor using netstat commandline stile (but can also be filled from a router etc) gathering connections configuration.yaml

```yaml
command_line:
  - sensor:
        name: Network Connections
        command: "netstat -ntu | awk '{if (NR>2) print $4, $5}' | awk -F'[: ]+' '{print $(NF-3), $(NF-2), $(NF-1), $(NF)}' | grep -E '^[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+ [0-9]+ [0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+ [0-9]+$' | jq -c -R '[inputs | capture(\"(?<source>[0-9.]+) (?<sport>[0-9]+) (?<target>[0-9.]+) (?<port>[0-9]+)\") | {source, sport: ( .sport | tonumber ), target, port: ( .port | tonumber )}] | {connections: .}'"
        value_template: "{{ value_json.connections | length }}"
        json_attributes:
            - connections
        scan_interval: 60
```

## Customizing the Card

### Adjusting Full-Screen Behavior
- The card fills **`calc(100vh - 48px)`**, subtracting `48px` to avoid the HA top bar overlap.
- If you see a **small gap**, adjust this value in `netstat-overview-card.js`.
- Example alternative values:
  ```css
  height: calc(100vh - 56px);  /* Adjust for different themes */
  height: 100vh;  /* Extends behind the top bar */
  ```

### Ensuring Sticky Header Works
If the header text appears to scroll but the background does not:
- Ensure you have enough rows to **force scrolling**.
- Sticky behavior is optimized for **modern browsers** (Chrome, Firefox, Edge, latest Safari).
- The card uses `border-collapse: separate; border-spacing: 0;` to avoid 1px transparency issues.


## Troubleshooting

### Header Not Sticky / Transparent Line
- Try adding more rows to see if scrolling works properly.
- Clear browser cache and refresh Home Assistant UI.

### No Data Appearing
- Check Developer Tools → States for `sensor.network_connections`.
- Ensure `connections` contains valid data.

### Panel Mode Issues
- Ensure this card is the **only card** in the view.
- If multiple cards are needed, disable **Panel Mode** and set a `max-height` in the card’s CSS.


## License

This project is licensed under the MIT License. See the LICENSE file for details.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```


## Contributions

Contributions are welcome! Please fork the repository and submit a pull request.

## Issues

If you encounter any problems or have suggestions for improvement, please open an issue in this repository.

## Acknowledgments
- The Home Assistant community for inspiration and support.

