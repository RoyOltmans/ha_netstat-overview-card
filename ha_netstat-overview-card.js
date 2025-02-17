class NetworkConnectionsCard extends HTMLElement {
  set hass(hass) {
    if (!this._card) {
      const card = document.createElement("ha-card");
      this._card = card;

      // Remove default card margins, borders, shadows, etc.
      card.style.margin = "0";
      card.style.padding = "0";
      card.style.border = "none";
      card.style.boxShadow = "none";
      card.style.borderRadius = "0";

      // Fill the entire height in Panel Mode (minus HA header ~48px)
      card.style.height = "calc(100vh - 48px)";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.boxSizing = "border-box";

      // Build card content
      card.innerHTML = `
        <style>
          /* Make .scroll-container fill leftover space in the card */
          .scroll-container {
            flex: 1;
            overflow-y: auto;
          }
          
          /* Use separate borders (not collapsed) to reduce sticky issues */
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }

          /* Sticky table header cells */
          thead th {
            position: sticky;
            top: 0;
            z-index: 2;
            /* Force a solid background so it doesn't appear transparent */
            background-color: var(--primary-color);
            /* White text */
            color: #fff;
            /* White bottom edge (instead of border) to avoid 1px gap issues */
            box-shadow: 0 1px 0 0 #fff;
            /* You could use a real border if you prefer:
               border-bottom: 1px solid #fff; 
            */
            padding: 8px;
            text-align: center;
            /* Ensure the background doesn’t bleed (some Safari versions) */
            background-clip: padding-box;
          }

          /* Body cells use normal divider color */
          tbody td {
            border: 1px solid var(--divider-color);
            padding: 8px;
            text-align: center;
            background: var(--card-background-color, #fff);
          }

          /* Make sure we have no accidental gaps or margins */
          table, thead, tbody, tr, th, td {
            margin: 0;
            box-sizing: border-box;
          }
        </style>
        
        <div class="scroll-container">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Src Port</th>
                <th>Target</th>
                <th>Port</th>
              </tr>
            </thead>
            <tbody id="network-rows"></tbody>
          </table>
        </div>
      `;

      this._tbody = card.querySelector("#network-rows");
      this.appendChild(card);
    }

    const sensor = hass.states["sensor.network_connections"];
    if (!sensor || !sensor.attributes || !sensor.attributes.connections) {
      this._tbody.innerHTML = `<tr><td colspan="4">No Data Available</td></tr>`;
      return;
    }

    // Populate table rows
    this._tbody.innerHTML = sensor.attributes.connections
      .map(
        (conn) => `
          <tr>
            <td>${conn.source}</td>
            <td>${conn.sport}</td>
            <td>${conn.target}</td>
            <td>${conn.port}</td>
          </tr>
        `
      )
      .join("");
  }

  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    // Estimate size in "rows"
    return 5;
  }
}

customElements.define("netstat-overview-card", NetworkConnectionsCard);
