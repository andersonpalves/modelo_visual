var calendar_view = {};
$(function () {
    calendar_view = {
        chart: {
            renderTo: 'calendar_view',
            type: 'heatmap',
            plotBorderWidth: 0,
            //height: 500,
            //width: 800,
            marginTop: 50,
            events: {
                    // show the month name (series.name) as label of every block
                // add text element to the BBox - using SVGRenderer
                load: function() {
                    var series = this.series,
                        bbox;

                    series.forEach(function(s) {
                        bbox = s.group.getBBox(true);
                        this.renderer.text(
                                s.name,
                                bbox.x + 
                                this.plotLeft + 
                                bbox.width / 2,
                                bbox.y + 
                                this.plotTop - 10
                            )
                            .attr({
                                align: 'center'
                            })
                            .css({
                                color: '#666666',
                                fontSize: '11px'
                            })
                            .add();
                    }, this);
                }
            }
        },
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            type: 'category',
            title: null,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickWidth: 0,
            opposite: true,
            labels: {
                // don't show the axis label : it's the category id
            // see plotOptions -> dataLabels to show the week number
                enabled: false 
            }
        },

        yAxis: {
            type: 'category',
            categories: [ 
                'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.',
            ' ', ' ', ' ',
            'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.',
            ],
            title: null,
            reversed: true,
            lineWidth: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            minTickInterval: 1,
            labels: {
                style: {
                fontSize: '9px'
            }
            }
        },

        colorAxis: {
            stops: [
                [0, '#3060cf'],
                [0.5, '#fffbbc'],
                [0.9, '#c4463a'],
                [1, '#c4463a']
            ],
            min: 0,
            startOnTick: false,
            endOnTick: false,
            stops: [
                [0,   '#ffffff'],
                [0.1, '#3060cf'],
                [0.5, '#fffbbc'],
                [1, '#c4463a']
            ],
            labels: {
            enabled: true
            }
        },
        legend: {
            layout: 'horizontal',
            verticalAlign: 'bottom',
        // align: 'left',
            margin: 30,
            y: 20,
            borderWidth: 0,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },

        tooltip: {
            useHTML: true,
        formatter: function () {
            if(this.point.value==0) return false;
            var s = Highcharts.dateFormat('%a %e. %B %Y', this.point.date);
            s +='<br><b>Consumption: ' + this.point.value;
            if(this.point.publicday != undefined)
            {
                s +='<br>--';
                s += '<br><div class="publicday">'+this.point.publicday+'</div>';
            
            if(this.point.fedstate != undefined)
                s += '<div class="fedstate">'+this.point.fedstate+'</div>';
            else
                s += '<div class="fedstate">Bundesweit</div>';
            }
            return s;
        }
        },
        
        plotOptions: {
            series: {
                events: {
                    click: function (e) {
                        console.log(e)
                    }
                },
                // show the week number under the calendar blocks
            // use the datas of last block row and move it down
                dataLabels: {
                    enabled: true,
                    y: 20,
                    crop: false,
                    overflow: 'allow',
                    //zIndex: 20,
                    formatter: function() {
                        if(this.point.y == 6 || this.point.y == 16) 
                        return this.point.week;
                    else
                        return null;
                    },
                    style: {
                    fontSize: '9px',
                    color: '#999999',
                    fontWeight: 'normal',
                    textOutline: 'none'
                    }
                },
                borderColor: '#ffffff',
                borderWidth: 3
            }
        },

        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        credits: {
            enabled: false
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: "100%"
                }
            }]
        },

        series: [{
            name: 'January',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate']
        },{
            name: 'February',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [6, 0, 0,  5, Date.UTC(2019, 0, 28)], 
            [6, 1, 0,  5, Date.UTC(2019, 0, 29)], 
            [6, 2, 0,  5, Date.UTC(2019, 0, 30)], 
            [6, 3, 0,  5, Date.UTC(2019, 0, 31)], 
            [6, 4, 1,  5, Date.UTC(2019, 1, 1)], 
            [6, 5, 2,  5, Date.UTC(2019, 1, 2)], 
            [6, 6, 3,  5, Date.UTC(2019, 1, 3)], 
            [7, 0, 1,  6, Date.UTC(2019, 1, 4)], 
            [7, 1, 1,  6, Date.UTC(2019, 1, 5)], 
            [7, 2, 1,  6, Date.UTC(2019, 1, 6)], 
            [7, 3, 1,  6, Date.UTC(2019, 1, 7)], 
            [7, 4, 1,  6, Date.UTC(2019, 1, 8)], 
            [7, 5, 2,  6, Date.UTC(2019, 1, 9)], 
            [7, 6, 3,  6, Date.UTC(2019, 1, 10)], 
            [8, 0, 1,  7, Date.UTC(2019, 1, 11)], 
            [8, 1, 1,  7, Date.UTC(2019, 1, 12)], 
            [8, 2, 1,  7, Date.UTC(2019, 1, 13)], 
            [8, 3, 1,  7, Date.UTC(2019, 1, 14)], 
            [8, 4, 1,  7, Date.UTC(2019, 1, 15)], 
            [8, 5, 2,  7, Date.UTC(2019, 1, 16)], 
            [8, 6, 3,  7, Date.UTC(2019, 1, 17)], 
            [9, 0, 1,  8, Date.UTC(2019, 1, 18)], 
            [9, 1, 1,  8, Date.UTC(2019, 1, 19)], 
            [9, 2, 1,  8, Date.UTC(2019, 1, 20)], 
            [9, 3, 1,  8, Date.UTC(2019, 1, 21)], 
            [9, 4, 1,  8, Date.UTC(2019, 1, 22)], 
            [9, 5, 2,  8, Date.UTC(2019, 1, 23)], 
            [9, 6, 3,  8, Date.UTC(2019, 1, 24)], 
            [10, 0, 1,  9, Date.UTC(2019, 1, 25)], 
            [10, 1, 1,  9, Date.UTC(2019, 1, 26)], 
            [10, 2, 1,  9, Date.UTC(2019, 1, 27)], 
            [10, 3, 1,  9, Date.UTC(2019, 1, 28)], 
            [10, 4, 0,  9, Date.UTC(2019, 2, 1)], 
            [10, 5, 0,  9, Date.UTC(2019, 2, 2)], 
            [10, 6, 0,  9, Date.UTC(2019, 2, 3)]
            ]
        },{
            name: 'March',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [12, 0, 0,  9, Date.UTC(2019, 1, 25)], 
            [12, 1, 0,  9, Date.UTC(2019, 1, 26)], 
            [12, 2, 0,  9, Date.UTC(2019, 1, 27)], 
            [12, 3, 0,  9, Date.UTC(2019, 1, 28)], 
            [12, 4, 1,  9, Date.UTC(2019, 2, 1)], 
            [12, 5, 2,  9, Date.UTC(2019, 2, 2)], 
            [12, 6, 3,  9, Date.UTC(2019, 2, 3)], 
            [13, 0, 1, 10, Date.UTC(2019, 2, 4)], 
            [13, 1, 1, 10, Date.UTC(2019, 2, 5)], 
            [13, 2, 1, 10, Date.UTC(2019, 2, 6)], 
            [13, 3, 1, 10, Date.UTC(2019, 2, 7)], 
            [13, 4, 1, 10, Date.UTC(2019, 2, 8)], 
            [13, 5, 2, 10, Date.UTC(2019, 2, 9)], 
            [13, 6, 3, 10, Date.UTC(2019, 2, 10)], 
            [14, 0, 1, 11, Date.UTC(2019, 2, 11)], 
            [14, 1, 1, 11, Date.UTC(2019, 2, 12)], 
            [14, 2, 1, 11, Date.UTC(2019, 2, 13)], 
            [14, 3, 1, 11, Date.UTC(2019, 2, 14)], 
            [14, 4, 1, 11, Date.UTC(2019, 2, 15)], 
            [14, 5, 2, 11, Date.UTC(2019, 2, 16)], 
            [14, 6, 3, 11, Date.UTC(2019, 2, 17)], 
            [15, 0, 1, 12, Date.UTC(2019, 2, 18)], 
            [15, 1, 1, 12, Date.UTC(2019, 2, 19)], 
            [15, 2, 1, 12, Date.UTC(2019, 2, 20)], 
            [15, 3, 1, 12, Date.UTC(2019, 2, 21)], 
            [15, 4, 1, 12, Date.UTC(2019, 2, 22)], 
            [15, 5, 2, 12, Date.UTC(2019, 2, 23)], 
            [15, 6, 3, 12, Date.UTC(2019, 2, 24)], 
            [16, 0, 1, 13, Date.UTC(2019, 2, 25)], 
            [16, 1, 1, 13, Date.UTC(2019, 2, 26)], 
            [16, 2, 1, 13, Date.UTC(2019, 2, 27)], 
            [16, 3, 1, 13, Date.UTC(2019, 2, 28)], 
            [16, 4, 1, 13, Date.UTC(2019, 2, 29)], 
            [16, 5, 2, 13, Date.UTC(2019, 2, 30)], 
            [16, 6, 3, 13, Date.UTC(2019, 2, 31)]
            ]
        },{
            name: 'April',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [19, 0, 1, 14, Date.UTC(2019, 3, 1)], 
            [19, 1, 1, 14, Date.UTC(2019, 3, 2)], 
            [19, 2, 1, 14, Date.UTC(2019, 3, 3)], 
            [19, 3, 1, 14, Date.UTC(2019, 3, 4)], 
            [19, 4, 1, 14, Date.UTC(2019, 3, 5)], 
            [19, 5, 2, 14, Date.UTC(2019, 3, 6)], 
            [19, 6, 3, 14, Date.UTC(2019, 3, 7)], 
            [20, 0, 1, 15, Date.UTC(2019, 3, 8)], 
            [20, 1, 1, 15, Date.UTC(2019, 3, 9)], 
            [20, 2, 1, 15, Date.UTC(2019, 3, 10)], 
            [20, 3, 1, 15, Date.UTC(2019, 3, 11)], 
            [20, 4, 1, 15, Date.UTC(2019, 3, 12)], 
            [20, 5, 2, 15, Date.UTC(2019, 3, 13)], 
            [20, 6, 3, 15, Date.UTC(2019, 3, 14)], 
            [21, 0, 1, 16, Date.UTC(2019, 3, 15)], 
            [21, 1, 1, 16, Date.UTC(2019, 3, 16)], 
            [21, 2, 1, 16, Date.UTC(2019, 3, 17)], 
            [21, 3, 1, 16, Date.UTC(2019, 3, 18)], 
            [21, 4, 4, 16, Date.UTC(2019, 3, 19)], 
            [21, 5, 2, 16, Date.UTC(2019, 3, 20)], 
            [21, 6, 4, 16, Date.UTC(2019, 3, 21)], 
            [22, 0, 4, 17, Date.UTC(2019, 3, 22)], 
            [22, 1, 1, 17, Date.UTC(2019, 3, 23)], 
            [22, 2, 1, 17, Date.UTC(2019, 3, 24)], 
            [22, 3, 1, 17, Date.UTC(2019, 3, 25)], 
            [22, 4, 1, 17, Date.UTC(2019, 3, 26)], 
            [22, 5, 2, 17, Date.UTC(2019, 3, 27)], 
            [22, 6, 3, 17, Date.UTC(2019, 3, 28)], 
            [23, 0, 1, 18, Date.UTC(2019, 3, 29)], 
            [23, 1, 1, 18, Date.UTC(2019, 3, 30)], 
            [23, 2, 0, 18, Date.UTC(2019, 4, 1)], 
            [23, 3, 0, 18, Date.UTC(2019, 4, 2)], 
            [23, 4, 0, 18, Date.UTC(2019, 4, 3)], 
            [23, 5, 0, 18, Date.UTC(2019, 4, 4)], 
            [23, 6, 0, 18, Date.UTC(2019, 4, 5)]
            ]
        },{
            name: 'May',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [25, 0, 0, 18, Date.UTC(2019, 3, 29)], 
            [25, 1, 0, 18, Date.UTC(2019, 3, 30)], 
            [25, 2, 4, 18, Date.UTC(2019, 4, 1)], 
            [25, 3, 1, 18, Date.UTC(2019, 4, 2)], 
            [25, 4, 1, 18, Date.UTC(2019, 4, 3)], 
            [25, 5, 2, 18, Date.UTC(2019, 4, 4)], 
            [25, 6, 3, 18, Date.UTC(2019, 4, 5)], 
            [26, 0, 1, 19, Date.UTC(2019, 4, 6)], 
            [26, 1, 1, 19, Date.UTC(2019, 4, 7)], 
            [26, 2, 1, 19, Date.UTC(2019, 4, 8)], 
            [26, 3, 1, 19, Date.UTC(2019, 4, 9)], 
            [26, 4, 1, 19, Date.UTC(2019, 4, 10)], 
            [26, 5, 2, 19, Date.UTC(2019, 4, 11)], 
            [26, 6, 3, 19, Date.UTC(2019, 4, 12)], 
            [27, 0, 1, 20, Date.UTC(2019, 4, 13)], 
            [27, 1, 1, 20, Date.UTC(2019, 4, 14)], 
            [27, 2, 1, 20, Date.UTC(2019, 4, 15)], 
            [27, 3, 1, 20, Date.UTC(2019, 4, 16)], 
            [27, 4, 1, 20, Date.UTC(2019, 4, 17)], 
            [27, 5, 2, 20, Date.UTC(2019, 4, 18)], 
            [27, 6, 3, 20, Date.UTC(2019, 4, 19)], 
            [28, 0, 1, 21, Date.UTC(2019, 4, 20)], 
            [28, 1, 1, 21, Date.UTC(2019, 4, 21)], 
            [28, 2, 1, 21, Date.UTC(2019, 4, 22)], 
            [28, 3, 1, 21, Date.UTC(2019, 4, 23)], 
            [28, 4, 1, 21, Date.UTC(2019, 4, 24)], 
            [28, 5, 2, 21, Date.UTC(2019, 4, 25)], 
            [28, 6, 3, 21, Date.UTC(2019, 4, 26)], 
            [29, 0, 1, 22, Date.UTC(2019, 4, 27)], 
            [29, 1, 1, 22, Date.UTC(2019, 4, 28)], 
            [29, 2, 1, 22, Date.UTC(2019, 4, 29)], 
            [29, 3, 4, 22, Date.UTC(2019, 4, 30)], 
            [29, 4, 1, 22, Date.UTC(2019, 4, 31)], 
            [29, 5, 0, 22, Date.UTC(2019, 5, 1)], 
            [29, 6, 0, 22, Date.UTC(2019, 5, 2)]
            ]
        },{
            name: 'June',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [31, 0, 0, 22, Date.UTC(2019, 4, 25)], 
            [31, 1, 0, 22, Date.UTC(2019, 4, 26)], 
            [31, 2, 0, 22, Date.UTC(2019, 4, 27)], 
            [31, 3, 0, 22, Date.UTC(2019, 4, 28)], 
            [31, 4, 0, 22, Date.UTC(2019, 4, 31)], 
            [31, 5, 2, 22, Date.UTC(2019, 5, 1)], 
            [31, 6, 3, 22, Date.UTC(2019, 5, 2)], 
            [32, 0, 1, 23, Date.UTC(2019, 5, 3)], 
            [32, 1, 1, 23, Date.UTC(2019, 5, 4)], 
            [32, 2, 1, 23, Date.UTC(2019, 5, 5)], 
            [32, 3, 1, 23, Date.UTC(2019, 5, 6)], 
            [32, 4, 1, 23, Date.UTC(2019, 5, 7)], 
            [32, 5, 2, 23, Date.UTC(2019, 5, 8)], 
            [32, 6, 4, 23, Date.UTC(2019, 5, 9)], 
            [33, 0, 4, 24, Date.UTC(2019, 5, 10)], 
            [33, 1, 1, 24, Date.UTC(2019, 5, 11)], 
            [33, 2, 1, 24, Date.UTC(2019, 5, 12)], 
            [33, 3, 1, 24, Date.UTC(2019, 5, 13)], 
            [33, 4, 1, 24, Date.UTC(2019, 5, 14)], 
            [33, 5, 2, 24, Date.UTC(2019, 5, 15)], 
            [33, 6, 3, 24, Date.UTC(2019, 5, 16)], 
            [34, 0, 1, 25, Date.UTC(2019, 5, 17)], 
            [34, 1, 1, 25, Date.UTC(2019, 5, 18)], 
            [34, 2, 1, 25, Date.UTC(2019, 5, 19)], 
            [34, 3, 4, 25, Date.UTC(2019, 5, 20)], 
            [34, 4, 1, 25, Date.UTC(2019, 5, 21)], 
            [34, 5, 2, 25, Date.UTC(2019, 5, 22)], 
            [34, 6, 3, 25, Date.UTC(2019, 5, 23)], 
            [35, 0, 1, 26, Date.UTC(2019, 5, 24)], 
            [35, 1, 1, 26, Date.UTC(2019, 5, 25)], 
            [35, 2, 1, 26, Date.UTC(2019, 5, 26)], 
            [35, 3, 1, 26, Date.UTC(2019, 5, 27)], 
            [35, 4, 1, 26, Date.UTC(2019, 5, 28)], 
            [35, 5, 2, 26, Date.UTC(2019, 5, 29)], 
            [35, 6, 3, 26, Date.UTC(2019, 5, 30)]
            ]
        },{
            name: 'July',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [0, 10, 1, 27, Date.UTC(2019, 6, 1)], 
            [0, 11, 1, 27, Date.UTC(2019, 6, 2)], 
            [0, 12, 1, 27, Date.UTC(2019, 6, 3)], 
            [0, 13, 1, 27, Date.UTC(2019, 6, 4)], 
            [0, 14, 1, 27, Date.UTC(2019, 6, 5)], 
            [0, 15, 2, 27, Date.UTC(2019, 6, 6)], 
            [0, 16, 3, 27, Date.UTC(2019, 6, 7)], 
            [1, 10, 1, 28, Date.UTC(2019, 6, 8)], 
            [1, 11, 1, 28, Date.UTC(2019, 6, 9)], 
            [1, 12, 1, 28, Date.UTC(2019, 6, 10)], 
            [1, 13, 1, 28, Date.UTC(2019, 6, 11)], 
            [1, 14, 1, 28, Date.UTC(2019, 6, 12)], 
            [1, 15, 2, 28, Date.UTC(2019, 6, 13)], 
            [1, 16, 3, 28, Date.UTC(2019, 6, 14)], 
            [2, 10, 1, 29, Date.UTC(2019, 6, 15)], 
            [2, 11, 1, 29, Date.UTC(2019, 6, 16)], 
            [2, 12, 1, 29, Date.UTC(2019, 6, 17)], 
            [2, 13, 1, 29, Date.UTC(2019, 6, 18)], 
            [2, 14, 1, 29, Date.UTC(2019, 6, 19)], 
            [2, 15, 2, 29, Date.UTC(2019, 6, 20)], 
            [2, 16, 3, 29, Date.UTC(2019, 6, 21)], 
            [3, 10, 1, 30, Date.UTC(2019, 6, 22)], 
            [3, 11, 1, 30, Date.UTC(2019, 6, 23)], 
            [3, 12, 1, 30, Date.UTC(2019, 6, 24)], 
            [3, 13, 1, 30, Date.UTC(2019, 6, 25)], 
            [3, 14, 1, 30, Date.UTC(2019, 6, 26)], 
            [3, 15, 2, 30, Date.UTC(2019, 6, 27)], 
            [3, 16, 3, 30, Date.UTC(2019, 6, 28)], 
            [4, 10, 1, 31, Date.UTC(2019, 6, 29)], 
            [4, 11, 1, 31, Date.UTC(2019, 6, 30)], 
            [4, 12, 1, 31, Date.UTC(2019, 6, 31)], 
            [4, 13, 0, 31, Date.UTC(2019, 7, 1)], 
            [4, 14, 0, 31, Date.UTC(2019, 7, 2)], 
            [4, 15, 0, 31, Date.UTC(2019, 7, 3)], 
            [4, 16, 0, 31, Date.UTC(2019, 7, 4)]
            ]
        },{
            name: 'August',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [ 6, 10, 0, 31, Date.UTC(2019, 6, 29)], 
            [ 6, 11, 0, 31, Date.UTC(2019, 6, 30)], 
            [ 6, 12, 0, 31, Date.UTC(2019, 6, 31)], 
            [ 6, 13, 1, 31, Date.UTC(2019, 7, 1)], 
            [ 6, 14, 1, 31, Date.UTC(2019, 7, 2)], 
            [ 6, 15, 2, 31, Date.UTC(2019, 7, 3)], 
            [ 6, 16, 3, 31, Date.UTC(2019, 7, 4)], 
            [ 7, 10, 1, 32, Date.UTC(2019, 7, 5)], 
            [ 7, 11, 1, 32, Date.UTC(2019, 7, 6)], 
            [ 7, 12, 1, 32, Date.UTC(2019, 7, 7)], 
            [ 7, 13, 1, 32, Date.UTC(2019, 7, 8)], 
            [ 7, 14, 1, 32, Date.UTC(2019, 7, 9)], 
            [ 7, 15, 2, 32, Date.UTC(2019, 7, 10)], 
            [ 7, 16, 3, 32, Date.UTC(2019, 7, 11)], 
            [ 8, 10, 1, 33, Date.UTC(2019, 7, 12)], 
            [ 8, 11, 1, 33, Date.UTC(2019, 7, 13)], 
            [ 8, 12, 1, 33, Date.UTC(2019, 7, 14)], 
            [ 8, 13, 4, 33, Date.UTC(2019, 7, 15)], 
            [ 8, 14, 1, 33, Date.UTC(2019, 7, 16)], 
            [ 8, 15, 2, 33, Date.UTC(2019, 7, 17)], 
            [ 8, 16, 3, 33, Date.UTC(2019, 7, 18)], 
            [ 9, 10, 1, 34, Date.UTC(2019, 7, 19)], 
            [ 9, 11, 1, 34, Date.UTC(2019, 7, 20)], 
            [ 9, 12, 1, 34, Date.UTC(2019, 7, 21)], 
            [ 9, 13, 1, 34, Date.UTC(2019, 7, 22)], 
            [ 9, 14, 1, 34, Date.UTC(2019, 7, 23)], 
            [ 9, 15, 2, 34, Date.UTC(2019, 7, 24)], 
            [ 9, 16, 3, 34, Date.UTC(2019, 7, 25)], 
            [10, 10, 1, 35, Date.UTC(2019, 7, 26)], 
            [10, 11, 1, 35, Date.UTC(2019, 7, 27)], 
            [10, 12, 1, 35, Date.UTC(2019, 7, 28)], 
            [10, 13, 1, 35, Date.UTC(2019, 7, 29)], 
            [10, 14, 1, 35, Date.UTC(2019, 7, 30)], 
            [10, 15, 2, 35, Date.UTC(2019, 7, 31)], 
            [10, 16, 0, 35, Date.UTC(2019, 8, 1)]
            ]
        },{
            name: 'September',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [12, 10, 2, 35, Date.UTC(2019, 7, 26)], 
            [12, 11, 0, 35, Date.UTC(2019, 7, 27)], 
            [12, 12, 0, 35, Date.UTC(2019, 7, 28)], 
            [12, 13, 0, 35, Date.UTC(2019, 7, 29)], 
            [12, 14, 0, 35, Date.UTC(2019, 7, 30)], 
            [12, 15, 0, 35, Date.UTC(2019, 7, 31)], 
            [12, 16, 3, 36, Date.UTC(2019, 8, 1)], 
            [13, 10, 1, 36, Date.UTC(2019, 8, 2)], 
            [13, 11, 1, 36, Date.UTC(2019, 8, 3)], 
            [13, 12, 1, 36, Date.UTC(2019, 8, 4)], 
            [13, 13, 1, 36, Date.UTC(2019, 8, 5)], 
            [13, 14, 1, 36, Date.UTC(2019, 8, 6)], 
            [13, 15, 2, 36, Date.UTC(2019, 8, 7)], 
            [13, 16, 3, 36, Date.UTC(2019, 8, 8)], 
            [14, 10, 1, 37, Date.UTC(2019, 8, 9)], 
            [14, 11, 1, 37, Date.UTC(2019, 8, 10)], 
            [14, 12, 1, 37, Date.UTC(2019, 8, 11)], 
            [14, 13, 1, 37, Date.UTC(2019, 8, 12)], 
            [14, 14, 1, 37, Date.UTC(2019, 8, 13)], 
            [14, 15, 2, 37, Date.UTC(2019, 8, 14)], 
            [14, 16, 3, 37, Date.UTC(2019, 8, 15)], 
            [15, 10, 1, 38, Date.UTC(2019, 8, 16)], 
            [15, 11, 1, 38, Date.UTC(2019, 8, 17)], 
            [15, 12, 1, 38, Date.UTC(2019, 8, 18)], 
            [15, 13, 1, 38, Date.UTC(2019, 8, 19)], 
            [15, 14, 1, 38, Date.UTC(2019, 8, 20)], 
            [15, 15, 2, 38, Date.UTC(2019, 8, 21)], 
            [15, 16, 3, 38, Date.UTC(2019, 8, 22)], 
            [16, 10, 1, 39, Date.UTC(2019, 8, 23)], 
            [16, 11, 1, 39, Date.UTC(2019, 8, 24)], 
            [16, 12, 1, 39, Date.UTC(2019, 8, 25)], 
            [16, 13, 1, 39, Date.UTC(2019, 8, 26)], 
            [16, 14, 1, 39, Date.UTC(2019, 8, 27)], 
            [16, 15, 2, 39, Date.UTC(2019, 8, 28)], 
            [16, 16, 3, 39, Date.UTC(2019, 8, 29)],
            [17, 10, 1, 40, Date.UTC(2019, 8, 30)],
            [17, 11, 0, 40, Date.UTC(2019, 9,  1)], 
            [17, 12, 0, 40, Date.UTC(2019, 9,  2)], 
            [17, 13, 0, 40, Date.UTC(2019, 9,  3)], 
            [17, 14, 0, 40, Date.UTC(2019, 9,  4)], 
            [17, 15, 0, 40, Date.UTC(2019, 9,  5)], 
            [17, 16, 0, 40, Date.UTC(2019, 9,  6)]
            ]
        },{
            name: 'October',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [19, 10, 0, 40, Date.UTC(2019, 8, 30)], 
            [19, 11, 1, 40, Date.UTC(2019, 9,  1)], 
            [19, 12, 1, 40, Date.UTC(2019, 9,  2)], 
            [19, 13, 4, 40, Date.UTC(2019, 9,  3)], 
            [19, 14, 1, 40, Date.UTC(2019, 9,  4)], 
            [19, 15, 2, 40, Date.UTC(2019, 9,  5)], 
            [19, 16, 3, 40, Date.UTC(2019, 9,  6)], 
            [20, 10, 1, 41, Date.UTC(2019, 9,  7)], 
            [20, 11, 1, 41, Date.UTC(2019, 9,  8)], 
            [20, 12, 1, 41, Date.UTC(2019, 9,  9)], 
            [20, 13, 1, 41, Date.UTC(2019, 9, 10)], 
            [20, 14, 1, 41, Date.UTC(2019, 9, 11)], 
            [20, 15, 2, 41, Date.UTC(2019, 9, 12)], 
            [20, 16, 3, 41, Date.UTC(2019, 9, 13)], 
            [21, 10, 1, 42, Date.UTC(2019, 9, 14)], 
            [21, 11, 1, 42, Date.UTC(2019, 9, 15)], 
            [21, 12, 1, 42, Date.UTC(2019, 9, 16)], 
            [21, 13, 1, 42, Date.UTC(2019, 9, 17)], 
            [21, 14, 1, 42, Date.UTC(2019, 9, 18)], 
            [21, 15, 2, 42, Date.UTC(2019, 9, 19)], 
            [21, 16, 3, 42, Date.UTC(2019, 9, 20)], 
            [22, 10, 1, 43, Date.UTC(2019, 9, 21)], 
            [22, 11, 1, 43, Date.UTC(2019, 9, 22)], 
            [22, 12, 1, 43, Date.UTC(2019, 9, 23)], 
            [22, 13, 1, 43, Date.UTC(2019, 9, 24)], 
            [22, 14, 1, 43, Date.UTC(2019, 9, 25)], 
            [22, 15, 2, 43, Date.UTC(2019, 9, 26)], 
            [22, 16, 3, 43, Date.UTC(2019, 9, 27)], 
            [23, 10, 1, 44, Date.UTC(2019, 9, 28)], 
            [23, 11, 1, 44, Date.UTC(2019, 9, 29)], 
            [23, 12, 4, 44, Date.UTC(2019, 9, 30)], 
            [23, 13, 1, 44, Date.UTC(2019, 9, 31)], 
            [23, 14, 0, 44, Date.UTC(2019, 10,  1)], 
            [23, 15, 0, 44, Date.UTC(2019, 10,  2)], 
            [23, 16, 0, 44, Date.UTC(2019, 10,  3)]
            ]
        },{
            name: 'November',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [25, 10, 0, 44, Date.UTC(2019, 9, 25)], 
            [25, 11, 0, 44, Date.UTC(2019, 9, 26)], 
            [25, 12, 0, 44, Date.UTC(2019, 9, 27)], 
            [25, 13, 0, 44, Date.UTC(2019, 9, 28)], 
            [25, 14, 4, 44, Date.UTC(2019, 10, 1)], 
            [25, 15, 2, 44, Date.UTC(2019, 10, 2)], 
            [25, 16, 3, 44, Date.UTC(2019, 10, 3)], 
            [26, 10, 1, 45, Date.UTC(2019, 10, 4)], 
            [26, 11, 1, 45, Date.UTC(2019, 10, 5)], 
            [26, 12, 1, 45, Date.UTC(2019, 10, 6)], 
            [26, 13, 1, 45, Date.UTC(2019, 10, 7)], 
            [26, 14, 1, 45, Date.UTC(2019, 10, 8)], 
            [26, 15, 2, 45, Date.UTC(2019, 10, 9)], 
            [26, 16, 3, 45, Date.UTC(2019, 10, 10)], 
            [27, 10, 1, 46, Date.UTC(2019, 10, 11)], 
            [27, 11, 1, 46, Date.UTC(2019, 10, 12)], 
            [27, 12, 1, 46, Date.UTC(2019, 10, 13)], 
            [27, 13, 1, 46, Date.UTC(2019, 10, 14)], 
            [27, 14, 1, 46, Date.UTC(2019, 10, 15)], 
            [27, 15, 2, 46, Date.UTC(2019, 10, 16)], 
            [27, 16, 3, 46, Date.UTC(2019, 10, 17)], 
            [28, 10, 1, 47, Date.UTC(2019, 10, 18)], 
            [28, 11, 1, 47, Date.UTC(2019, 10, 19)], 
            [28, 12, 4, 47, Date.UTC(2019, 10, 20)], 
            [28, 13, 1, 47, Date.UTC(2019, 10, 21)], 
            [28, 14, 1, 47, Date.UTC(2019, 10, 22)], 
            [28, 15, 2, 47, Date.UTC(2019, 10, 23)], 
            [28, 16, 3, 47, Date.UTC(2019, 10, 24)], 
            [29, 10, 1, 48, Date.UTC(2019, 10, 25)], 
            [29, 11, 1, 48, Date.UTC(2019, 10, 26)], 
            [29, 12, 1, 48, Date.UTC(2019, 10, 27)], 
            [29, 13, 1, 48, Date.UTC(2019, 10, 28)], 
            [29, 14, 1, 48, Date.UTC(2019, 10, 29)], 
            [29, 15, 2, 48, Date.UTC(2019, 10, 30)], 
            [29, 16, 0, 48, Date.UTC(2019, 11, 1)]
            ]
        },{
            name: 'December',
            keys: ['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate'],
            data: [
            [31, 10, 0, 48, Date.UTC(2019, 10, 25)], 
            [31, 11, 0, 48, Date.UTC(2019, 10, 26)], 
            [31, 12, 0, 48, Date.UTC(2019, 10, 27)], 
            [31, 13, 0, 48, Date.UTC(2019, 10, 28)], 
            [31, 14, 0, 48, Date.UTC(2019, 10, 29)], 
            [31, 15, 0, 48, Date.UTC(2019, 10, 30)], 
            [31, 16, 3, 48, Date.UTC(2019, 11,  1)], 
            [32, 10, 1, 49, Date.UTC(2019, 11,  2)], 
            [32, 11, 1, 49, Date.UTC(2019, 11,  3)], 
            [32, 12, 1, 49, Date.UTC(2019, 11,  4)], 
            [32, 13, 1, 49, Date.UTC(2019, 11,  5)], 
            [32, 14, 1, 49, Date.UTC(2019, 11,  6)], 
            [32, 15, 2, 49, Date.UTC(2019, 11,  7)], 
            [32, 16, 3, 49, Date.UTC(2019, 11,  8)], 
            [33, 10, 1, 50, Date.UTC(2019, 11,  9)], 
            [33, 11, 1, 50, Date.UTC(2019, 11, 10)], 
            [33, 12, 1, 50, Date.UTC(2019, 11, 11)], 
            [33, 13, 1, 50, Date.UTC(2019, 11, 12)], 
            [33, 14, 1, 50, Date.UTC(2019, 11, 13)], 
            [33, 15, 2, 50, Date.UTC(2019, 11, 14)], 
            [33, 16, 3, 50, Date.UTC(2019, 11, 15)], 
            [34, 10, 1, 51, Date.UTC(2019, 11, 16)], 
            [34, 11, 1, 51, Date.UTC(2019, 11, 17)], 
            [34, 12, 1, 51, Date.UTC(2019, 11, 18)], 
            [34, 13, 1, 51, Date.UTC(2019, 11, 19)], 
            [34, 14, 1, 51, Date.UTC(2019, 11, 20)], 
            [34, 15, 2, 51, Date.UTC(2019, 11, 21)], 
            [34, 16, 3, 51, Date.UTC(2019, 11, 22)], 
            [35, 10, 1, 52, Date.UTC(2019, 11, 23)], 
            [35, 11, 1, 52, Date.UTC(2019, 11, 24)], 
            [35, 12, 4, 52, Date.UTC(2019, 11, 25)], 
            [35, 13, 4, 52, Date.UTC(2019, 11, 26)], 
            [35, 14, 1, 52, Date.UTC(2019, 11, 27)], 
            [35, 15, 2, 52, Date.UTC(2019, 11, 28)], 
            [35, 16, 3, 52, Date.UTC(2019, 11, 29)], 
            [36, 10, 1,  1, Date.UTC(2019, 11, 30)], 
            [36, 11, 1,  1, Date.UTC(2019, 11, 31)], 
            [36, 12, 0,  1, Date.UTC(2020, 1, 1)],
            [36, 13, 0,  1, Date.UTC(2020, 1, 2)],
            [36, 14, 0,  1, Date.UTC(2020, 1, 3)],
            [36, 15, 0,  1, Date.UTC(2020, 1, 4)],
            [36, 16, 0,  1, Date.UTC(2020, 1, 5)],
            ]
        }
        ]
    }
    var l = getValuesJanuary();
    console.log(l)
    calendar_view.series[0].data = l;
    chart_calendar_view = new Highcharts.Chart(calendar_view);
});

function getValuesJanuary(){
    //['x', 'y', 'value', 'week', 'date', 'publicday', 'fedstate']
    var ano = 2018;
    var date = new Date(ano+"-01-01");
    var weekDay = getWeekDay(date);

    var listJanuary = [];

    if (weekDay != 0) {
        for (var i=0; i<weekDay; i++) {
            listJanuary.push([0, i, 0, 1, Date.UTC(2021, 11, 31)]);
        }
    }

    for (var i=weekDay; i<=6; i++) {
        listJanuary.push([0, i, i+1, 1, Date.UTC(2022, 0, i)]);
    }

    return listJanuary;
}


function getWeekDay(date){
    //Create an array containing each day, starting with Sunday.
    var weekdays = new Array(0,1,2,3,4,5,6);
    //0 - "Monday", 1 - "Tuesday", 2 - "Wednesday", 3 - "Thursday", 4 - "Friday", 5 - "Saturday", 6 - "Sunday"
    //Use the getDay() method to get the day.
    var day = date.getDay();
    //Return the element that corresponds to that index.
    return weekdays[day];
}

// [
//     [0, 0, 0,  1, Date.UTC(2018, 11, 31)], 
//     [0, 1, 4,  1, Date.UTC(2019, 0, 1)], 
//     [0, 2, 1,  1, Date.UTC(2019, 0, 2)], 
//     [0, 3, 1,  1, Date.UTC(2019, 0, 3)], 
//     [0, 4, 1,  1, Date.UTC(2019, 0, 4)], 
//     [0, 5, 2,  1, Date.UTC(2019, 0, 5)], 
//     [0, 6, 4,  1, Date.UTC(2019, 0, 6)], 
//     [1, 0, 1,  2, Date.UTC(2019, 0, 7)], 
//     [1, 1, 1,  2, Date.UTC(2019, 0, 8)], 
//     [1, 2, 1,  2, Date.UTC(2019, 0, 9)], 
//     [1, 3, 1,  2, Date.UTC(2019, 0, 10)], 
//     [1, 4, 1,  2, Date.UTC(2019, 0, 11)], 
//     [1, 5, 2,  2, Date.UTC(2019, 0, 12)], 
//     [1, 6, 3,  2, Date.UTC(2019, 0, 13)], 
//     [2, 0, 1,  3, Date.UTC(2019, 0, 14)], 
//     [2, 1, 1,  3, Date.UTC(2019, 0, 15)], 
//     [2, 2, 1,  3, Date.UTC(2019, 0, 16)], 
//     [2, 3, 1,  3, Date.UTC(2019, 0, 17)], 
//     [2, 4, 1,  3, Date.UTC(2019, 0, 18)], 
//     [2, 5, 2,  3, Date.UTC(2019, 0, 19)], 
//     [2, 6, 3,  3, Date.UTC(2019, 0, 20)], 
//     [3, 0, 1,  4, Date.UTC(2019, 0, 21)], 
//     [3, 1, 1,  4, Date.UTC(2019, 0, 22)], 
//     [3, 2, 1,  4, Date.UTC(2019, 0, 23)], 
//     [3, 3, 1,  4, Date.UTC(2019, 0, 24)], 
//     [3, 4, 1,  4, Date.UTC(2019, 0, 25)], 
//     [3, 5, 2,  4, Date.UTC(2019, 0, 26)], 
//     [3, 6, 3,  4, Date.UTC(2019, 0, 27)], 
//     [4, 0, 1,  5, Date.UTC(2019, 0, 28)], 
//     [4, 1, 1,  5, Date.UTC(2019, 0, 29)], 
//     [4, 2, 1,  5, Date.UTC(2019, 0, 30)], 
//     [4, 3, 1,  5, Date.UTC(2019, 0, 31)], 
//     [4, 4, 0,  5, Date.UTC(2019, 1, 1)], 
//     [4, 5, 0,  5, Date.UTC(2019, 1, 2)], 
//     [4, 6, 0,  5, Date.UTC(2019, 1, 3)]
//     ]