import Options from "./options";

/**
 * Calendar class extends HeatmapCalendar
 */

export default class Calendar extends Options {

    // Draw the calendar heatmap
    drawContainer() {

        // Create container for the calendar heatmap in the source container
        const calendar = document.createElement('div');
        calendar.classList.add('calendar-heatmap');
        if(super.config.style.type === 'dark') {
            calendar.classList.add('dark');
        }
        
        calendar.style.cssText += `--cell-size: ${super.config.style.cellSize}px`;
        calendar.style.cssText += `--cell-radius: ${super.config.style.cellRadius}px`;
        calendar.style.cssText += `--cell-gap: ${super.config.style.cellGap}px`;
        calendar.style.cssText += `--color-data-level-0: ${super.config.style.cellColor_level_0}`;
        calendar.style.cssText += `--color-data-level-1: ${super.config.style.cellColor_level_1}`;
        calendar.style.cssText += `--color-data-level-2: ${super.config.style.cellColor_level_2}`;
        calendar.style.cssText += `--color-data-level-3: ${super.config.style.cellColor_level_3}`;
        calendar.style.cssText += `--color-data-level-4: ${super.config.style.cellColor_level_4}`;
        
        document.querySelector(super.config.container).appendChild(calendar);

        // Create the calendar heatmap title
        if(super.config.title && super.config.title !== '' && super.config.title !== null) {
            const title = document.createElement('h2');
            title.classList.add('calendar-heatmap-title');
            title.textContent = super.config.title;
            calendar.appendChild(title);
        }

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('calendar-heatmap-content-container');
        calendar.appendChild(contentContainer);

        const calendarMonth = document.createElement('div');
        calendarMonth.classList.add('calendar-heatmap-month');
        contentContainer.appendChild(calendarMonth);

        // Create the calendar date container
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('calendar-heatmap-date-container');
        contentContainer.appendChild(dateContainer);

        // Create the calendar heatmap legend
        if(super.config.legend.show) {
            const legend = document.createElement('div');
            legend.classList.add('calendar-heatmap-legend');
            legend.classList.add(`calendar-heatmap-legend-position-${super.config.legend.align}`);
            calendar.appendChild(legend);
            this.drawLegende(legend);
        }

        // Draw the calendar heatmap
        this.drawCalendarData(dateContainer, calendarMonth);
    }
        
    drawCalendarData(container, monthContainer) {
        
        // Draw the columns calendar heatmap
        const calcDay = super.config.calculateDateParameters();
        const level = super.config.legend.toolTip_value;
        const firstDate = new Date(calcDay.startDate.setDate(calcDay.startDate.getDate()));
        let day = 0;
        let monthList = [];
        let previousMonth = null;

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
                const currentMonth = date.getMonth();

                if(currentMonth !== previousMonth) {
                    previousMonth = currentMonth;
                    monthList.push(date.toLocaleString(super.config.language, { month: 'short' }));
                }

                // Check if the last day or current day
                if(date.toLocaleDateString('en-US') === super.config.currentDate) {
                    newDay.classList.add('current');
                }

                // Check if the date exists in a variable of the object and get the corresponding value to give it as dataset else set the value to 0
                if(super.config.data) {
                    super.config.data.forEach((item) => {
                        const tempDate = new Date(item.date);
                        if(tempDate.toLocaleDateString('en-US') === date.toLocaleDateString('en-US')) {
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

                if(super.config.toolTip.show) {
                    if(super.config.toolTip.textPostion === 'after') {
                        newDay.dataset.tooltip = `${newDay.dataset.value} ${super.config.toolTip.text} ${super.config.toolTip.separator} ${formatDate}`;
                    }
                    else {
                        newDay.dataset.tooltip = `${super.config.toolTip.text} ${newDay.dataset.value} ${super.config.toolTip.separator} ${formatDate}`;
                    }
                }
                
                column.appendChild(newDay);
                
            }

            container.appendChild(column);
        }



        // Write the name of the months
        for(let i = 0; i < monthList.length; i++) {
            const month = document.createElement('span');
            month.classList.add('calendar-heatmap-month-name');
            month.textContent = monthList[i];
            monthContainer.appendChild(month);
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