/**
 * Draw rank on GUI
 */
function drawGraph(){
	
	// History
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Rank');
	data.addColumn('number', 'Height (m)');
	data.addColumn('number', 'Time (s)');
	data.addRows(Game.stat.self.history);
	(new google.visualization.PieChart(document.querySelector("#rank #history"))).draw(data, {'title':'Rank Distribution','width':'100%','height':'100%'});
	(new google.visualization.Table(document.querySelector("#rank #history"))).draw(data, {showRowNumber: false});
	// Ranking
	data = new google.visualization.DataTable();
	data.addColumn('number', 'Ranking');
	data.addColumn('number', 'Total');
	var arr = [];
	for(var i=1;i<9;i++)
	if(Game.stat.self.rank[i]){
		arr[arr.length] = [i, Game.stat.self.rank[i]];
	}
	data.addRows(arr);
	(new google.visualization.PieChart(document.querySelector("#rank #rank"))).draw(data, {'title':'Rank Distribution','width':'100%','height':'100%'});
	
	// free
	data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Heightest', Game.stat.self.highest]
        ]);
				new google.visualization.Gauge(document.querySelector("#rank #free")).draw(data, { width: '100%', height: '100%', redFrom: 90, redTo: 100, yellowFrom:75, yellowTo: 90, minorTicks: 5 });
}