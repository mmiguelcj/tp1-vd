function desenhaGrafo(dadosGrafo){		

	console.log(dadosGrafo);			
	var dadosPessoa;		
	//Arrumando dados para o Donnuts		
	//Para cada pessoa no grafico.		
	$.each(dadosGrafo, function (id_pessoa, pessoa){		
		dadosPessoa = [];		
		console.log(id_pessoa);		
		//Desenhe um grafico		
		$.each(pessoa, function(id_lugar, lugar){		
      console.log(id_lugar, lugar);		
      dadosPessoa.push({label : id_lugar, count : lugar.length});			
    });		

    var width = 250;		
    var height = 250;		
    var radius = Math.min(width, height) / 2;		
        var donutWidth = 55;                            // NEW		

        var color = d3.scale.category20b();		

        var svg = d3.select('#grafico')		
        .append('svg')		
        .attr('width', width)		
        .attr('height', height)		
        .append('g')		
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        /*Basta adicionar a legenda aqui.*/
        svg.append("text")
        .style("text-anchor", "middle")
        .text(id_pessoa);		

        var arc = d3.svg.arc()		
        .innerRadius(radius-donutWidth)		
        .outerRadius(radius);		

        var pie = d3.layout.pie()
        .value(function(d) { return d.count; })		
        .sort(null);

        d3.select

        /*aqui começa*/

        /*aqui termina*/

        /*Hoover*/
      	//Tentando o hoover de novo.
		var tooltip = d3.select('#grafico')                               // NEW
			.append('div')                                                // NEW
			.attr('class', 'tooltip');                                    // NEW

		tooltip.append('div')                                           // NEW
			.attr('class', 'label');                                      // NEW

		tooltip.append('div')                                           // NEW
			.attr('class', 'count');                                      // NEW

		tooltip.append('div')                                           // NEW
   .attr('class', 'percent');

   var path = svg.selectAll('path')		
   .data(pie(dadosPessoa))		
   .enter()		
   .append('path')		
   .attr('d', arc)		
   .attr('fill', function(d, i) { 		
    return color(d.data.label);		
  });



		path.on('mouseover', function(d) {                            // NEW
            var total = d3.sum(dadosPessoa.map(function(d) {                // NEW
              return d.count;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.count / total) / 10; // NEW
            tooltip.select('.label').html(d.data.label);                // NEW
            tooltip.select('.count').html(d.data.count);                // NEW
            tooltip.select('.percent').html(percent + '%');             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW

        path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW

        path.on('mousemove', function(d) {
          tooltip.style('top', (d3.event.pageY + 10) + 'px')
          .style('left', (d3.event.pageX + 10) + 'px');
        });

      });      		
};		

/*Carrega os grafos em memória.*/		
$.getJSON("grafo.json", function(data){		
	dadosGrafo = data;		
	/*Enviando apenas o primeiro gráfico por enquanto.*/		
	desenhaGrafo(dadosGrafo[0]);		
});