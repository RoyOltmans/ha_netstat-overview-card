# Netstat Overview Card

A Home Assistant **Lovelace** custom card for displaying network connection data from a sensor (`sensor.network_connections`). The table features **sticky headers**, ensuring the column names remain visible when scrolling. The card is designed for **Panel Mode**, making it fill the entire screen.

## Features

- Displays live network connections (Source, Source Port, Target, Destination Port).
- **Sticky header row** stays visible while scrolling.
- Fully responsive and optimized for **Panel Mode** in Lovelace.
- Customizable header background color (`var(--primary-color)`) with **white text and borders**.

---

## Prerequisites

1. A Home Assistant sensor named `sensor.network_connections`.
   - The sensor must have an attribute `connections` that is an **array** of objects with these properties:
     ```json
     {
       "source": "...",
       "sport": "...",
       "target": "...",
       "port": "..."
     }
     ```

2. Home Assistant **version 0.115+** for custom card support.

---

## Installation

### Step 1: Download the Card

1. **Download** or copy `netstat-overview-card.js`.
2. Place it in your Home Assistant **`www` folder** (e.g., `/config/www/`).

### Step 2: Add as a Lovelace Resource

#### UI Mode
1. Navigate to **Settings** → **Dashboards** → **Resources**.
2. Click the **+ Add Resource** button.
3. Enter the URL: `/local/netstat-overview-card.js`.
4. Set **Resource Type** to **JavaScript Module**.
5. Click **Create**.

#### YAML Mode
Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/netstat-overview-card.js
      type: module
```

### Step 3: Restart and Clear Cache
1. **Restart** Home Assistant.
2. **Clear your browser cache** (Ctrl+Shift+R or equivalent) to ensure the new card loads correctly.

---

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

---

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

---

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

---

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

---

## Credits & Contributions
This card was created for Home Assistant users needing a **clean, easy-to-read** netstat-style overview.

### Contributions
If you have improvements, feel free to contribute via GitHub (if applicable) or share feedback!

---

Enjoy your live **Netstat Overview Card** in Home Assistant! 🚀

