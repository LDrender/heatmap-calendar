import Options from './calendar/options.js';
import Calendar from './calendar/calendar.js';

/**
 * Calendar Heatmap
 * Global variables
 */
export default class HeatmapCalendar {
    constructor(options, data) {
        this.options = new Options(options);
        this.calendar = new Calendar();

        // Init the calendar heatmap
        this.init(options, data);
    }

    init(options, data) {
        // Set the options
        if(options) {
            this.options.setOptions(options);
        }

        // Set the data
        this.options.config.data = typeof data === 'object' ? data : this.options.config.data;

        // Edit tooltip values if needed
        if(this.options.config.legend.toolTip === "auto" && data) {
            this.options.config.legend.toolTip_value = this.options.calculateToolTip(this.options.config.data);
        }

        // Create the calendar heatmap
        this.calendar.drawContainer();

        return true;
    }
}