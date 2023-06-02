fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // Call the function to render the table comparison
    renderTableComparison(data);
  })
  .catch((error) => {
    console.error("Error al obtener el archivo JSON:", error);
  });

  function renderTableComparison(data) {
    const container = document.getElementById("table-container");
  
    if (container) {
      // Create the table element with Bootstrap classes
      const table = document.createElement("table");
  
      // Create the table header
      const head = document.createElement("thead");
      const headerRow = document.createElement("tr");
      const header1 = document.createElement("th");
      header1.textContent = "Institucion Financiera";
      const header2 = document.createElement("th");
      header2.textContent = "Instrumento";
      headerRow.appendChild(header1);
      headerRow.appendChild(header2);
      head.appendChild(headerRow);
      table.appendChild(head);
  
      const body = document.createElement("tbody");
      // Create table rows for each data element
      data.forEach((item) => {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        cell1.textContent = item.institucionFinanciera;
        const cell2 = document.createElement("td");
        cell2.textContent = item.instrumento[0].debito;
        row.appendChild(cell1);
        row.appendChild(cell2);
        body.appendChild(row)
        table.appendChild(body);
      });
  
      // Append the table to the container
      container.appendChild(table);
    }
  }
