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
	(new google.visualization.Table(document.querySelector("#rank #history"))).draw(data, {sort: 'disable'});
	// Time Top Ten
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Nickname');
	data.addColumn('number', 'Time (s)');
	var name;
	for(var i=0;i<Game.stat.global.time.length; i++){
		name = Game.stat.global.time[i].uid == game.modules['Auth-Module'].user.user_id ? 'You' :Game.stat.global.time[i].nickname;
		data.addRow([name, Math.round(Number(Game.stat.global.time[i].time)/1000)]);
	}
	(new google.visualization.BarChart(document.querySelector("#rank #time"))).draw(data);
	// Ranking
	data = new google.visualization.DataTable();
	data.addColumn('string', 'Ranking');
	data.addColumn('number', 'Total');
	var arr = [];
	for(var i=1;i<9;i++)
	if(Game.stat.self.rank[i]){
		arr[arr.length] = [i+'', Number(Game.stat.self.rank[i])];
	}
	data.addRows(arr);
	(new google.visualization.PieChart(document.querySelector("#rank #rank"))).draw(data, {'title':'Rank Distribution','titleTextStyle':{'fontSize':24},'width':'100%','height':'90%','backgroundColor':'transparent', 'legend':{position:'bottom'}});
	// free
	data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Heightest', Number(Game.stat.self.highest.height)]
        ]);
	var ratio = Number(Game.stat.global.height[0].height);
	new google.visualization.Gauge(document.querySelector("#rank #free")).draw(data, { width: '100%', height: '100%',max:Math.round(ratio), redFrom: Math.round(ratio*0.9), redTo:Math.round(ratio) , yellowFrom:Math.round(ratio*0.75), yellowTo: Math.round(ratio*0.9), minorTicks: 5});
	data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Speed(m/mins)', Math.round(Number(Game.stat.self.fastest.height)/(Number(Game.stat.self.fastest.time))*60*1000)]
        ]);
	ratio = Number(Game.stat.global.time[0].height)/(Number(Game.stat.global.time[0].time))*60*1000;
	new google.visualization.Gauge(document.querySelector("#rank #speed")).draw(data, { width: '100%', height: '100%',max:Math.round(ratio), redFrom: Math.round(ratio*0.9), redTo:Math.round(ratio) , yellowFrom:Math.round(ratio*0.75), yellowTo: Math.round(ratio*0.9), minorTicks: 5 });
}