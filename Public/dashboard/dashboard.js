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

// function sortFunction(formData) {
//     console.log(formData)
// }
document.getElementsByClassName('hist-form')[0].addEventListener('submit', function(event) {
    event.preventDefault()
    const data = event.target[0].value
    const filter = event.target[1].value
    console.log(data, filter)
    const table = document.getElementsByTagName('tr')
    const items = []
    for (let i = 1; i < table.length; i++) {
        const item = {
            name: "",
            amount: "",
            date: "",
            category: ""
        }
        item.name = table[i].children[0].innerText
        item.amount = table[i].children[1].innerText
        item.date = table[i].children[2].innerText
        item.date = new Date(item.date.replaceAll('/', '-'))
        item.category = table[i].children[3].innerText
        items.push(item)
    }

    if (filter == 'amount_asc') {
        items.sort((a, b) => { return a.amount - b.amount })
    } else if (filter == 'amount_dec') {
        items.sort((a, b) => { return b.amount - a.amount })
    } else if (filter == 'date_asc') {
        items.sort((a, b) => {
            const d1 = a.date
            const d2 = b.date
            return d1 - d2
        })
    } else if (filter == 'date_dec') {
        items.sort((a, b) => {
            const d1 = a.date
            const d2 = b.date
            return d2 - d1
        })
    }
    //const tbody = document.getElementsByTagName('tbody')[0]
    //tbody.remove()
    const newTbody = document.createElement('tbody')
    let tbody = document.getElementsByTagName('tbody')[0]
    while (tbody.hasChildNodes())
        tbody.removeChild(tbody.firstChild)
    for (const item of items) {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        td1.innerText = item.name
        tr.appendChild(td1)
        const td2 = document.createElement('td')
        td2.innerText = item.amount
        tr.appendChild(td2)
        const td3 = document.createElement('td')
        td3.innerText = item.date.toLocaleDateString('zh-Hans-CN')
        tr.appendChild(td3)
        const td4 = document.createElement('td')
        td4.innerText = item.category
        tr.appendChild(td4)
        tbody.appendChild(tr)
    }
})


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
