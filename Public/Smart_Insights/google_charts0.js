google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Category', 'Spendings in Rs'],
          ['Food and drinks',     11000],
          ['Bills & Utilities',      2000],
          ['Groceries',  2000],
          ['Travel', 2000],
          ['Medical',    7000],
          ['Others',    7000]
        ]);

        var options = {
          title: 'Category breakup',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
