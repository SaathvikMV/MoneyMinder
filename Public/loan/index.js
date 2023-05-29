function incrementDate() {
    const dateInput = document.getElementById('date-input');
    const currentDate = new Date(dateInput.value);
    const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    dateInput.value = nextDate.toISOString().split('T')[0];
}

function decrementDate() {
    const dateInput = document.getElementById('date-input');
    const currentDate = new Date(dateInput.value);
    const prevDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    dateInput.value = prevDate.toISOString().split('T')[0];
}

$("#laddbtn").click(function () {
    let table=$.getElementById('ltable');
    let row=table.insertRow(-1);
    c1.innerText,c2.innerText,c3.innerText,c4.innerText,c5.innerText,c6.innerText='hi','hello','hey','there','how','you'
    let c1=row.insertCell(0);
    let c2=row.insertCell(1);
    let c3=row.insertCell(2);
    let c4=row.insertCell(3);
    let c5=row.insertCell(4);
    let c6=row.insertCell(5);

  });



  $(document).ready(function() {
    $('select[name="person"]').change(function() {
      var selectedOption = $(this).val();
      if (selectedOption === "new") {
        $('input[name="newPerson"]').show().prop('required', true);
        // $('select[name="person"]').hide().prop('required', true);
      } else {
        $('input[name="newPerson"]').hide().prop('required', false);
      }
    });
  });

  $(document).ready(function() {
      $('select[name="loan_type"]').change(function() {
        var selectedLoanType = $(this).val();
        if (selectedLoanType === "lent") {
          $('label[for="From"]').text("To");
        } else {
          $('label[for="From"]').text("From");
        }
      });
    });







    // Store the initial data
    const initialData = [];

    // Get references to the relevant elements
    const sortSelect = document.getElementById('sort-select');
    const hideOrNot = document.querySelector('.hide_or_not');
    const showAllButton = document.getElementById('show-all-button');

    // Function to handle the change event of the sort-select dropdown
    function handleSortSelectChange() {
      const selectedOption = sortSelect.value;

      // Check the selected option and hide/show the hideOrNot element accordingly
      if (selectedOption === 'date_asc' || selectedOption === 'date_dec') {
        hideOrNot.style.display = 'none';
      } else {
        hideOrNot.style.display = 'block';
      }
    }

    // Attach the event listener to the sort-select dropdown
    sortSelect.addEventListener('change', handleSortSelectChange);

    // Get the table rows and store the initial data
    const tableRows = document.querySelectorAll('#data-table tbody tr');
    for (let i = 0; i < tableRows.length; i++) {
      const item = {
        date: "",
        type: "",
        from: "",
        reason: "",
        amount: ""
      };
      const tableData = tableRows[i].children;
      item.date = tableData[0].innerText;
      item.type = tableData[1].innerText;
      item.from = tableData[2].innerText;
      item.reason = tableData[3].innerText;
      item.amount = tableData[4].innerText;
      initialData.push(item);
    }

    // Event listener for form submission
    document.querySelector('.hist-form').addEventListener('submit', function(event) {
      event.preventDefault();
      const filter = event.target.elements.sort_select.value;

      let items = [...initialData]; // Use a copy of the initial data

      // Apply filter based on date if selected
      if (filter !== 'date_asc' && filter !== 'date_dec') {
        const data = event.target.elements.date_input.value;
        if (data) {
          const selectedDate = formatDate(data); // Format the input date
          items = items.filter(item => item.date === selectedDate);
        }
      }

      // Apply sorting based on the selected filter
      if (filter === 'type') {
        items.sort((a, b) => a.type.localeCompare(b.type));
      } else if (filter === 'amount_asc') {
        items.sort((a, b) => a.amount - b.amount);
      } else if (filter === 'amount_dec') {
        items.sort((a, b) => b.amount - a.amount);
      } else if (filter === 'date_asc') {
        items.sort((a, b) => {
          const dateA = formatDateForSorting(a.date);
          const dateB = formatDateForSorting(b.date);
          return dateA.localeCompare(dateB);
        });
      } else if (filter === 'date_dec') {
        items.sort((a, b) => {
          const dateA = formatDateForSorting(a.date);
          const dateB = formatDateForSorting(b.date);
          return dateB.localeCompare(dateA);
        });
      }

      renderTable(items);
    });

    // Event listener for Show All button
    showAllButton.addEventListener('click', function() {
      renderTable(initialData);
    });

    // Function to render the table
    function renderTable(data) {
      const tbody = document.querySelector('#data-table tbody');
      while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
      }

      if (data.length === 0) {
        document.getElementById('no-elements-message').innerText = 'No elements found for this date.';
        document.getElementById('data-table').classList.add('hidden');
document.getElementById('no_element').classList.remove('hidden');
} else {
document.getElementById('data-table').classList.remove('hidden');
document.getElementById('no-elements-message').innerText = '';
document.getElementById('no_element').classList.add('hidden');

for (const item of data) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.innerText = item.date;
  tr.appendChild(td1);
  const td2 = document.createElement('td');
  td2.innerText = item.type;
  tr.appendChild(td2);
  const td3 = document.createElement('td');
  td3.innerText = item.from;
  tr.appendChild(td3);
  const td4 = document.createElement('td');
  td4.innerText = item.reason;
  tr.appendChild(td4);
  const td5 = document.createElement('td');
  td5.innerText = item.amount;
  tr.appendChild(td5);
  tbody.appendChild(tr);
}
}
}



function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Function to format the date for sorting
function formatDateForSorting(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${month}/${day}/${year}`;
}
