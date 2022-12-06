import Options from "./options";

/**
 * Calendar class extends HeatmapCalendar
 */

export default class Calendar extends Options {



    // Init calendar options
    initOptions() {

    }

    // Init calendar data
    initData() {
        
    }

    // Draw the calendar heatmap
    drawContainer() {

        // Create container for the calendar heatmap in the source container
        const calendar = document.createElement('div');
        calendar.classList.add('calendar-heatmap');
        if(super.config.style === 'dark') {
            calendar.classList.add('dark');
        }
        document.querySelector(super.config.container).appendChild(calendar);

        // Create the calendar heatmap title
        if(super.config.title) {
            const title = document.createElement('h2');
            title.classList.add('calendar-heatmap-title');
            title.textContent = super.config.title;
            calendar.appendChild(title);
        }

        // Create the calendar date container
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('calendar-heatmap-date-container');
        calendar.appendChild(dateContainer);

        // Create the calendar heatmap legend
        if(super.config.legend.show) {
            const legend = document.createElement('div');
            legend.classList.add('calendar-heatmap-legend');
            legend.classList.add(`calendar-heatmap-legend-position-${super.config.legend.align}`);
            calendar.appendChild(legend);
            this.drawLegende(legend);
        }

        // Draw the calendar heatmap
        this.drawCalendarData(dateContainer);
    }
        
    drawCalendarData(container) {
        
        // Draw the columns calendar heatmap
        const calcDay = super.config.calculateDays();
        const level = super.config.legend.toolTip_value;
        let day = 0;
        let dayMore = 0;


        while(day <= calcDay.nbrDays){

            const column = document.createElement('div');
            column.classList.add('calendar-heatmap-column');

            for(let i = 0; i < super.config.days; i++) {

                day++;
                if(day > calcDay.nbrDays) {
                    break;
                }

                const newDay = document.createElement('span');
                newDay.classList.add('calendar-heatmap-day');

                // Set date
                const date = new Date(calcDay.startDate.setDate(calcDay.startDate.getDate() + 1));
                const formatDate = date.toLocaleDateString().slice(0, 10);
                newDay.dataset.date = formatDate;

                // Check if the last day or current day
                if(date.toISOString().slice(0, 10) === super.config.currentDate) {
                    newDay.classList.add('current');
                }

                // Check if the date exists in a variable of the object and get the corresponding value to give it as dataset else set the value to 0
                if(super.config.data) {
                    super.config.data.forEach((item) => {
                        if(item.date === date.toISOString().slice(0, 10)) {
                            newDay.dataset.value = item.value;
                        }
                        else if(!newDay.dataset.value) {
                            newDay.dataset.value = 0;
                        }
                    });
                }

                // Apply dataset level
                if(newDay.dataset.value >= level[0] && newDay.dataset.value < level[1]) {
                    newDay.dataset.level = 0;
                }
                else if(newDay.dataset.value >= level[1] && newDay.dataset.value < level[2]) {
                    newDay.dataset.level = 1;
                }
                else if(newDay.dataset.value >= level[2] && newDay.dataset.value < level[3]) {
                    newDay.dataset.level = 2;
                }
                else if(newDay.dataset.value >= level[3] && newDay.dataset.value < level[4]) {
                    newDay.dataset.level = 3;
                }
                else if(newDay.dataset.value >= level[4]) {
                    newDay.dataset.level = 4;
                }

                if(super.config.toolTip) {
                    if(super.config.toolTip_TextPostion === 'after') {
                        newDay.dataset.tooltip = `${newDay.dataset.value} ${super.config.toolTip_Text} ${super.config.toolTip_Separator} ${formatDate}`;
                    }
                    else {
                        newDay.dataset.tooltip = `${super.config.toolTip_Text} ${newDay.dataset.value} ${super.config.toolTip_Separator} ${formatDate}`;
                    }
                }
                
                column.appendChild(newDay);
                
            }

            container.appendChild(column);
        }
        
    }

    drawLegende(container) {
        // Create the calendar heatmap legend min label
        if(super.config.legend.minLabel) {
            const minLabel = document.createElement('span');
            minLabel.classList.add('calendar-heatmap-legend-min-label');
            minLabel.textContent = super.config.legend.minLabel;
            container.appendChild(minLabel);
        }

        const legendTooltip_Value = super.config.legend.toolTip_value;
        legendTooltip_Value.forEach((value, index) => {
            // Create the calendar heatmap legend color box
            const colorBox = document.createElement('span');
            colorBox.classList.add('calendar-heatmap-day');
            colorBox.dataset.level = index;

            if(super.config.legend.toolTip !== 'hidden') {
                colorBox.dataset.tooltip = value;
            }

            container.appendChild(colorBox);
        });

        // Create the calendar heatmap legend max label
        if(super.config.legend.maxLabel) {
            const maxLabel = document.createElement('span');
            maxLabel.classList.add('calendar-heatmap-legend-max-label');
            maxLabel.textContent = super.config.legend.maxLabel;
            container.appendChild(maxLabel);
        }
    }

}