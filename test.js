<script>
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60{"}"},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.json("https://api.makerburn.com/growth/status", function(data) {
    
      // Set the x and y scales
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain([data.treasury.systemSurplus, data.treasury.mkrValue, data.treasury.aaveValue, data.treasury.ensValue])
        .padding(0.2);
      var y = d3.scaleLinear()
        .domain([0, 13000]) // Update this value to the maximum value in the data
        .range([ height, 0]);
    
      // Add the x axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
      // Add the y axis
      svg.append("g")
        .call(d3.axisLeft(y));
    
      // Add the bars
      svg.selectAll("mybar")
        .data(data.treasury)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.systemSurplus, d.mkrValue, d.aaveValue, d.ensValue); {"}"})
          .attr("y", function(d) { return y(d.Value); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.Value); })
          .attr("fill", "#69b3a2")
    });
    
    </script>
    
