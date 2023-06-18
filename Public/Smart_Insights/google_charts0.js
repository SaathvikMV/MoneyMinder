google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        if (document.getElementById('Food').textContent) {
  food = parseInt(document.getElementById('Food').textContent);
} else {
  food = 0;
}
        console.log(typeof(food));
  var housing = parseInt(document.getElementById('Housing')?.textContent) || 0;
  var health = parseInt(document.getElementById('Health')?.textContent) || 0;
  var savings = parseInt(document.getElementById('Savings')?.textContent) || 0;
  var entertainment = parseInt(document.getElementById('Entertainment')?.textContent) || 0;
  var travel = parseInt(document.getElementById('Travel')?.textContent) || 0;
  var miscellaneous = parseInt(document.getElementById('Miscellaneous')?.textContent) || 0;
        var data = google.visualization.arrayToDataTable([
          ['Category', 'Spendings in Rs'],
          ['Food',food],
          ['Housing',      housing],
          ['Personal and health care',  health],
          ['Travel', travel],
          ['Entertainment',    entertainment],
          ['Savings',savings],
        ]);

        var options = {
          title: 'Category breakup',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }
