document.addEventListener("DOMContentLoaded", function() {
  const userLink = document.querySelector(".nav-link.dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  userLink.addEventListener("click", function(e) {
    e.preventDefault();
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function(event) {
    const isClickInsideDropdown = dropdownMenu.contains(event.target) || userLink === event.target;
    if (!isClickInsideDropdown) {
      dropdownMenu.style.display = "none";
    }
  });
});



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

// Get references to the relevant elements
var sortSelect = document.getElementById('sort-select');
var hideOrNot = document.querySelector('.hide_or_not');

// Function to handle the change event of the sort-select dropdown
function handleSortSelectChange() {
  var selectedOption = sortSelect.value;

  // Check the selected option and hide/show the hideOrNot element accordingly
  if (selectedOption === 'date_asc' || selectedOption === 'date_dec') {
    hideOrNot.style.display = 'none';
  } else {
    hideOrNot.style.display = 'block';
  }
}

// Attach the event listener to the sort-select dropdown
sortSelect.addEventListener('change', handleSortSelectChange);








// Store the initial data
// Store the initial data
const initialData = [];

// Get references to the relevant elements
var sortSelect = document.getElementById('sort-select');
var hideOrNot = document.querySelector('.hide_or_not');

// Function to handle the change event of the sort-select dropdown
function handleSortSelectChange() {
  var selectedOption = sortSelect.value;

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
const tableRows = document.getElementsByTagName('tr');
for (let i = 1; i < tableRows.length; i++) {
  const item = {
    name: "",
    amount: "",
    date: "",
    category: ""
  };
  const tableData = tableRows[i].children;
  item.name = tableData[0].innerText;
  item.amount = tableData[1].innerText;
  item.date = tableData[2].innerText;
  item.date = new Date(item.date.replaceAll('/', '-'));
  item.category = tableData[3].innerText;
  initialData.push(item);
}

// Event listener for form submission
document.getElementsByClassName('hist-form')[0].addEventListener('submit', function(event) {
  event.preventDefault();
  const filter = event.target.elements.sort_select.value;
  console.log(filter);

  let items = [...initialData]; // Use a copy of the initial data

  // Apply filter based on date if selected
  if (filter !== 'date_asc' && filter !== 'date_dec') {
    const data = event.target.elements.date_input.valueAsDate;
    if (data) {
      const selectedDate = data.toDateString();
      items = items.filter(item => item.date.toDateString() === selectedDate);
    }
  }

  // Apply sorting based on the selected filter
  if (filter === 'amount_asc') {
    items.sort((a, b) => a.amount - b.amount);
  } else if (filter === 'amount_dec') {
    items.sort((a, b) => b.amount - a.amount);
  } else if (filter === 'category') {
    items.sort((a, b) => a.category.localeCompare(b.category));
  } else if (filter === 'date_asc') {
    items.sort((a, b) => a.date.getTime() - b.date.getTime());
  } else if (filter === 'date_dec') {
    items.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  const tbody = document.getElementsByTagName('tbody')[0];
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  if (items.length === 0) {
    document.getElementById('no-elements-message').innerText = 'No elements found for this date.';
    document.getElementById('data-table').classList.add('hidden');
    document.getElementById('no_element').classList.remove('hidden');
  } else {
    document.getElementById('data-table').classList.remove('hidden');
    document.getElementById('no-elements-message').innerText = '';
    document.getElementById('no_element').classList.add('hidden');

    for (const item of items) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.innerText = item.name;
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      td2.innerText = item.amount;
      tr.appendChild(td2);
      const td3 = document.createElement('td');
      // ...
      td3.innerText = item.date.toLocaleDateString('zh-Hans-CN');
      tr.appendChild(td3);
      const td4 = document.createElement('td');
      td4.innerText = item.category;
      tr.appendChild(td4);
      tbody.appendChild(tr);
    }
  }
});

// Event listener for "Show All" button
document.getElementsByClassName('mid_button')[1].addEventListener('click', function(event) {
  event.preventDefault();

  // Use the initialData to show all elements
  const items = [...initialData];

  const tbody = document.getElementsByTagName('tbody')[0];
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  if (items.length === 0) {
    document.getElementById('no-elements-message').innerText = 'No elements found.';
    document.getElementById('data-table').classList.add('hidden');
    document.getElementById('no_element').classList.remove('hidden');
  } else {
    document.getElementById('data-table').classList.remove('hidden');
    document.getElementById('no-elements-message').innerText = '';
    document.getElementById('no_element').classList.add('hidden');

    for (const item of items) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.innerText = item.name;
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      td2.innerText = item.amount;
      tr.appendChild(td2);
      const td3 = document.createElement('td');
      td3.innerText = item.date.toLocaleDateString('zh-Hans-CN');
      tr.appendChild(td3);
      const td4 = document.createElement('td');
      td4.innerText = item.category;
      tr.appendChild(td4);
      tbody.appendChild(tr);
    }
  }
});


$('.inp-form').submit(function(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Serialize form data
  var formData = $(this).serialize();

  // Store the current scroll position in sessionStorage
sessionStorage.setItem('scrollPosition', $(window).scrollTop());

// Perform AJAX form submission
$.ajax({
  url: $(this).attr('action'),
  type: $(this).attr('method'),
  data: formData,
  success: function(response) {
    $('#inp-form').trigger('reset'); // Clear the form

    // Redirect to the specified page and scroll to the stored position
    window.location.href = '/user/dashboard?scroll=' + sessionStorage.getItem('scrollPosition');

    // Clear the browser's cache
    window.location.reload(true);
  }
});
});

