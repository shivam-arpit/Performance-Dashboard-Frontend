let barChartInstance;
let lineChartInstance;

document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('dashboardChart').getContext('2d');

    // Default chart - Bar
    barChartInstance = new Chart(ctx, getBarChartConfig());

    // Compare checkbox and dropdown logic (unchanged)
    // ...

    // Disable unchecking any .row-toggle checkboxes
    document.querySelectorAll('.row-toggle').forEach(checkbox => {
        checkbox.addEventListener('click', function (e) {
            if (!this.checked) {
                e.preventDefault();
            }
        });
    });
     document.querySelectorAll('.row-toggle').forEach(checkbox => {
        checkbox.addEventListener('click', function (e) {
            if (!this.checked) {
                e.preventDefault();
            }
        });
    });

    document.getElementById("liveMintToggle")?.addEventListener("click", function (event) {
        event.preventDefault();
        const details = document.getElementById("liveMintDetails");
        details?.classList.toggle("hidden");
    });
});

// Function to show bar chart
function showChart() {
    destroyChart();
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    barChartInstance = new Chart(ctx, getBarChartConfig());
}

// Function to show line chart
function showTable() {
    destroyChart();
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    lineChartInstance = new Chart(ctx, getLineChartConfig());
}

// Destroy existing chart if any
function destroyChart() {
    if (barChartInstance) {
        barChartInstance.destroy();
        barChartInstance = null;
    }
    if (lineChartInstance) {
        lineChartInstance.destroy();
        lineChartInstance = null;
    }
}

// Bar chart config (original chart)
function getBarChartConfig() {
    return {
        type: 'bar',
        data: {
            labels: [
                'Hindustan Times', 'Livemint', 'HT Tamil', 'HT Bangla', 'HT Productivity', 'HT Kannada'
            ],
            datasets: [
                {
                    label: 'Impressions (01-06-2025 - 14-06-2025)',
                    data: [2000000, 2500000, 500000, 2700000, 2600000, 900000],
                    backgroundColor: 'rgba(255, 72, 0, 0.96)',
                },
                {
                    label: 'Impressions (01-07-2025 - 14-07-2025)',
                    data: [2000000, 2500000, 500000, 2500000, 2600000, 900000],
                    backgroundColor: 'rgba(189, 64, 14, 0.89)',
                },
                {
                    label: 'Revenue (01-06-2025 - 14-06-2025)',
                    data: [3000000, 2800000, 200000, 2900000, 2700000, 1000000],
                    backgroundColor: 'rgba(255, 196, 0, 0.95)',
                },
                {
                    label: 'Revenue (01-07-2025 - 14-07-2025)',
                    data: [700000, 750000, 250000, 720000, 710000, 300000],
                    backgroundColor: 'rgba(255, 98, 0, 0.96)',
                    type: 'bar',
                    yAxisID: 'y1'
                }
            ]
        },
        options: getChartOptions()
    };
}

// Line chart config
function getLineChartConfig() {
    return {
        type: 'line',
        data: {
            labels: [
                'Hindustan Times', 'Livemint', 'HT Tamil', 'HT Bangla', 'HT Productivity', 'HT Kannada'
            ],
            datasets: [
                {
                    label: 'Impressions (01-06-2025 - 14-06-2025)',
                    data: [2000000, 2500000, 500000, 2700000, 2600000, 900000],
                    borderColor: 'rgba(255, 72, 0, 0.96)',
                    fill: false
                },
                {
                    label: 'Impressions (01-07-2025 - 14-07-2025)',
                    data: [2000000, 2500000, 500000, 2500000, 2600000, 900000],
                    borderColor: 'rgba(189, 64, 14, 0.89)',
                    fill: false
                },
                {
                    label: 'Revenue (01-06-2025 - 14-06-2025)',
                    data: [3000000, 2800000, 200000, 2900000, 2700000, 1000000],
                    borderColor: 'rgba(255, 196, 0, 0.95)',
                    fill: false
                },
                {
                    label: 'Revenue (01-07-2025 - 14-07-2025)',
                    data: [700000, 750000, 250000, 720000, 710000, 300000],
                    borderColor: 'rgba(255, 98, 0, 0.96)',
                    fill: false,
                    yAxisID: 'y1'
                }
            ]
        },
        options: getChartOptions()
    };
}

// Shared chart options
function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Impressions and Revenue Comparison by Property'
            }
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Impressions'
                }
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Revenue'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };
}
document.getElementById('enableCompare')?.addEventListener('change', function () {
    const from2 = document.getElementById('dateFrom2');
    const to2 = document.getElementById('dateTo2');

   const disable = !this.checked;
    from2.disabled = disable;
    to2.disabled = disable;
});
 document.querySelectorAll('.freeze-toggle').forEach(checkbox => {
    const span = checkbox.nextElementSibling;
    if (!checkbox.checked) {
      span.classList.add('frozen');
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        span.classList.remove('frozen');
      } else {
        span.classList.add('frozen');
      }
    });
  });
   function toggleDetails(row) {
  const levelClass = Array.from(row.classList).find(cls => cls.startsWith("level-"));
  const currentLevel = parseInt(levelClass?.split('-')[1]);

  let next = row.nextElementSibling;

  while (next) {
    const nextLevelClass = Array.from(next.classList).find(cls => cls.startsWith("level-"));
    const nextLevel = parseInt(nextLevelClass?.split('-')[1]);

    if (!nextLevelClass || nextLevel <= currentLevel) break;

    // Only show direct children
    if (nextLevel === currentLevel + 1) {
      next.classList.toggle('show');
    }

    next = next.nextElementSibling;
  }

  const icon = row.querySelector(".toggle-icon");
  if (icon) {
    icon.textContent = icon.textContent === "▶" ? "▼" : "▶";
  }
}
function showPopup(cell) {
  const popup = document.getElementById("customPopup");
  const content = document.getElementById("popupContent");

  // Set the popup content dynamically
  content.textContent = "Details for: " + cell.closest("tr").cells[0].innerText;

  // Get position of the clicked element
  const rect = cell.getBoundingClientRect();

  // Position popup near the clicked cell
  
}

// Optional: hide popup on click anywhere outside
document.addEventListener("click", function (e) {
  const popup = document.getElementById("customPopup");
  if (!popup.contains(e.target) && !e.target.closest("td.clickable")) {
    popup.style.display = "none";
  }
});