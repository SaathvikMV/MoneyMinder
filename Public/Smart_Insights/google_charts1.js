google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
  var monthlyExpenses = JSON.parse("[" + document.getElementById('monthlyExpenses').textContent + "]");

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Amount');


    data.addRows([
    [1, monthlyExpenses[0][0]],[2, monthlyExpenses[0][1]],[3, monthlyExpenses[0][2]],
      [4, monthlyExpenses[0][3]],[5, monthlyExpenses[0][4]],[6, monthlyExpenses[0][5]],[7, monthlyExpenses[0][6]],[8, monthlyExpenses[0][7]],
      [9, monthlyExpenses[0][8]],[10, monthlyExpenses[0][9]],[11, monthlyExpenses[0][10]],[12, monthlyExpenses[0][11]]
    ]);


      var options = {
        hAxis: {
          title: 'Month'
        },
        vAxis: {
          title: 'Spendings in Rs'
        },
        backgroundColor: '#f5f5f5'
      };

      var chart = new google.visualization.LineChart(document.getElementById('linear_1'));
      chart.draw(data, options);
    }
