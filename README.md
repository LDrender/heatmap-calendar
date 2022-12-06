# heatmap-calendar

Javascript library of heatmap calendar generator


## Files

Add and call the file: "**heatmapCalendar.min.js**" & "**heatmapCalendar.min.css**"

Pour ajouter un calendrier créé un nouvel appel de class :
```javascript
new heatmapCalendar(options, data)
```

## Options
| Name | Type | Description |
|--|:--:|--|
| container | String | Selector string for the calendar container to append the calendar to. <br/>``Default: '#heatmap-cal'`` |
| title | String | Title to display above the calendar |
| style | String | Style ***'light'*** or ***'dark'*** |
| days | Integer | The number of days to display per column <br/>``Default: 7`` |
| month | Integer | The month to start the calendar on (12 = current month, 0 = January, 1 = February, etc.) <br/>``Default: 12``<br/>``Range: 0-12`` |
| monthsDisplay | Integer | The number of months to display <br/>``Default: 12`` <br/>``Range: 1-12``|
| displayMode | String | The display mode to use ('year', 'month', 'day', 'custom', 'auto') <br/> - auto : will use the current date. Tips : set the 'monthsDisplay' option to 12 <br/> - year : will start on the first day of the year. Tips : this mods will display 12 months necessarily <br/> - month : will start on the month specified in the 'month' option. Tips : this mods will display 1 month necessarily<br/>``Default: 'auto'``|
| toolTip | Boolean | Choose whether or not to display tooltips when hovering over the calendar boxes |
| toolTip_Text | String | Text or word to indicate the correspondence of the value |
| toolTip_TextPostion | String | Choose to display the correspondent text before or after the value <br/>``'before' or 'after'``|
| toolTip_Separator | String | Text of the separator between the value and the date |
| Legend | Object | Options for the legend <br/>***Please refer to the following table (Legend Option)***|


### Legend Option

| Name | Type | Description |
|--|:--:|--|
| show | Boolean | Choose to display the legend |
| align | String | Choose a position of the legende <br/>``'left' - 'center' - 'right'``|
| minLabel | String | Text to indicate the minimum value |
| maxLabel | String | Text to indicate the maximum value |
| toolTip | String | Choose the display type of the legend tooltips <br/>- auto : will use the maximum heat value and other values will be calculated<br/>- hidden : will hide the heat value<br/>- fixed : will use the fixed value of the 'legend.toolTip_value' array option|
| toolTip_value | Array(5) | Choose the value of the range, if 'legend.toolTips' = 'auto' then the table is calculated automatically|


## Data

Data is array of objects, the objects are a composition of two variables : ***value*** and ***date***

| Name | Type|
|--|:--:|
| value | Integer or String |
| date | Date |

Example :
```
[
    {
        'value': 5,
        'date': '2022-01-01'
    }
    {
        'value': '8',
        'date': '2022-02-01'
    }
    ...
]
```

## Configuring colors

Use CSS variables to define the colors and appearances of the calendar :
```css
.calendar-heatmap {
    width: fit-content;               /* Size of the calendar */
    --gap-box: 1px;                   /* Space on a cell */
    --color-text: #e1e1e1;            /* Color text and background color tooltips */
    --color-text-reverse: #1e1e1e;    /* Color text tooltips */
    --color-data-level-1: #0e4429;    /* Background color cell [Data-level 1] */
    --color-data-level-2: #006d32;    /* Background color cell [Data-level 2] */
    --color-data-level-3: #26a641;    /* Background color cell [Data-level 3] */
    --color-data-level-4: #39d353;    /* Background color cell [Data-level 4] */
}
```
