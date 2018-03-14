const chartGroups = [
    {
        name: 'Bar Charts',
        type: 'Bar',
        charts: [
            {
                name: 'Vertical Bar Chart',
                label: 'Vertical Bar Chart',
                value: 'Vertical Bar Chart',
                selector: 'bar-vertical',
                inputFormat: 'singleSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'yScaleMax'
                ]
            },
            {
                name: 'Horizontal Bar Chart',
                label: 'Horizontal Bar Chart',
                value: 'Horizontal Bar Chart',
                selector: 'bar-horizontal',
                inputFormat: 'singleSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'xScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'Country',
                    xAxisLabel: 'GDP Per Capita',
                }
            },
            {
                name: 'Grouped Vertical Bar Chart',
                label: 'Grouped Vertical Bar Chart',
                value: 'Grouped Vertical Bar Chart',
                selector: 'bar-vertical-2d',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding', 'groupPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'yScaleMax'
                ]
            },
            {
                name: 'Grouped Horizontal Bar Chart',
                label: 'Grouped Horizontal Bar Chart',
                value: 'Grouped Horizontal Bar Chart',
                selector: 'bar-horizontal-2d',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding', 'groupPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'roundEdges', 'xScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'Country',
                    xAxisLabel: 'GDP Per Capita',
                }
            },
            {
                name: 'Stacked Vertical Bar Chart',
                label: 'Stacked Vertical Bar Chart',
                value: 'Stacked Vertical Bar Chart',
                selector: 'bar-vertical-stacked',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'yScaleMax'
                ]
            },
            {
                name: 'Stacked Horizontal Bar Chart',
                label: 'Stacked Horizontal Bar Chart',
                value: 'Stacked Horizontal Bar Chart',
                selector: 'bar-horizontal-stacked',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled', 'xScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'Country',
                    xAxisLabel: 'GDP Per Capita',
                }
            },
            {
                name: 'Normalized Vertical Bar Chart',
                label: 'Normalized Vertical Bar Chart',
                value: 'Normalized Vertical Bar Chart',
                selector: 'bar-vertical-normalized',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled'
                ],
                defaults: {
                    yAxisLabel: 'Normalized GDP Per Capita',
                    xAxisLabel: 'Country',
                }
            },
            {
                name: 'Normalized Horizontal Bar Chart',
                label: 'Normalized Horizontal Bar Chart',
                value: 'Normalized Horizontal Bar Chart',
                selector: 'bar-horizontal-normalized',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient', 'barPadding',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel', 'yAxisLabel',
                    'showGridLines', 'roundDomains', 'tooltipDisabled'
                ],
                defaults: {
                    yAxisLabel: 'Country',
                    xAxisLabel: 'Normalized GDP Per Capita',
                }
            }
        ]
    },
    {
        name: 'Pie Charts',
        type: 'Pie',
        charts: [
            {
                name: 'Pie Chart',
                label: 'Pie Chart',
                value: 'Pie Chart',
                selector: 'pie-chart',
                inputFormat: 'singleSeries',
                options: [
                    'animations', 'colorScheme', 'gradient', 'showLegend', 'legendTitle', 'doughnut', 'arcWidth',
                    'explodeSlices', 'showLabels', 'tooltipDisabled'
                ]
            },
            // {
            //     name: 'Advanced Pie Chart',
            //     label: 'Advanced Pie Chart',
            //     value: 'Advanced Pie Chart',
            //     selector: 'advanced-pie-chart',
            //     inputFormat: 'singleSeries',
            //     options: ['animations', 'colorScheme', 'gradient', 'tooltipDisabled']
            // },
            {
                name: 'Pie Grid',
                label: 'Pie Grid',
                value: 'Pie Grid',
                selector: 'pie-grid',
                inputFormat: 'singleSeries',
                options: ['animations', 'colorScheme', 'tooltipDisabled']
            }
        ]
    },
    {
        name: 'Line/Area Charts',
        type: 'Line',
        charts: [
            {
                name: 'Line Chart',
                label: 'Line Chart',
                value: 'Line Chart',
                selector: 'line-chart',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
                    'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
                    'rangeFillOpacity', 'roundDomains', 'tooltipDisabled', 'showRefLines',
                    'referenceLines', 'showRefLabels',
                    'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'GDP Per Capita',
                    xAxisLabel: 'Census Date',
                    linearScale: true
                }
            },
            {
                name: 'Polar Chart',
                label: 'Polar Chart',
                value: 'Polar Chart',
                selector: 'polar-chart',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
                    'yAxisLabel', 'autoScale', 'showGridLines', 'curveClosed',
                    'roundDomains', 'tooltipDisabled'
                ],
                defaults: {
                    yAxisLabel: 'GDP Per Capita',
                    xAxisLabel: 'Census Date',
                    linearScale: true
                }
            },
            {
                name: 'Area Chart',
                label: 'Area Chart',
                value: 'Area Chart',
                selector: 'area-chart',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
                    'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
                    'roundDomains', 'tooltipDisabled',
                    'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'GDP Per Capita',
                    xAxisLabel: 'Census Date',
                    linearScale: true
                }
            },
            {
                name: 'Stacked Area Chart',
                label: 'Stacked Area Chart',
                value: 'Stacked Area Chart',
                selector: 'area-chart-stacked',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
                    'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
                    'roundDomains', 'tooltipDisabled',
                    'xScaleMin', 'xScaleMax', 'yScaleMin', 'yScaleMax'
                ],
                defaults: {
                    yAxisLabel: 'GDP Per Capita',
                    xAxisLabel: 'Census Date',
                    linearScale: true
                }
            },
            {
                name: 'Normalized Area Chart',
                label: 'Normalized Area Chart',
                value: 'Normalized Area Chart',
                selector: 'area-chart-normalized',
                inputFormat: 'multiSeries',
                options: [
                    'animations', 'colorScheme', 'schemeType', 'showXAxis', 'showYAxis', 'gradient',
                    'showLegend', 'legendTitle', 'showXAxisLabel', 'xAxisLabel', 'showYAxisLabel',
                    'yAxisLabel', 'autoScale', 'timeline', 'showGridLines', 'curve',
                    'roundDomains', 'tooltipDisabled'
                ],
                defaults: {
                    yAxisLabel: 'Normalized GDP Per Capita',
                    xAxisLabel: 'Census Date',
                    linearScale: true
                }
            },
        ]
    },

];

export default chartGroups;
