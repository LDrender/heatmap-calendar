export default class Options {
    constructor() {
        // Default options
        Options.prototype.config = {
            // Style (light or dark)
            style: 'dark',
            style: {
                type: 'dark',
                cellSize: 20,
                cellRadius: 3,
                cellGap: 1,
                cellColor_level_0: 'rgba(110, 118, 129, 25%)',
                cellColor_level_1: '#0e4429',
                cellColor_level_2: '#006d32',
                cellColor_level_3: '#26a641',
                cellColor_level_4: '#39d353',
            },

            //Selector string for the calendar container to append the calendar to
            container: '#heatmap-cal',

            //The number of months to display (default & max: 12)
            monthsDisplay: 12,

            //The number of days to display per column
            days: 7,

            //The month to start the calendar on (12 = current, 0 = January, 1 = February, etc.)
            month: 12,

            //The current date to display the calendar from
            currentDate: new Date().toISOString().slice(0, 10),

            //The display mode to use ('year', 'month', 'day', 'custom', 'auto')
            // 'auto' will use the current date. Tips : set the 'monthsDisplay' option to 12
            // 'year' will start on the first day of the year. Tips : this mods will display 12 months necessarily
            // 'month' will start on the month specified in the 'month' option. Tips : this mods will display 1 month necessarily
            displayMode: 'auto',

            // =================
            //  = Data Option =
            // =================

            //The data to use for the calendar {object}
            data: [],

            // ====================
            //  = Display Option =
            // ====================

            //Title to display above the calendar
            title: 'Calendar Heatmap',

            toolTip: {
                show: true,
                text: "Heat value",
                textPostion: 'after',
                separator: '-',
            },

            //Legend to display below the calendar
            legend: {
                show: true,
                // Align the legend to the left, right or center
                align: "right",
                minLabel: "less",
                maxLabel: "more",

                // ToolTip ('auto', 'hidden' or 'fixed' )
                // 'auto' will use the maximum heat value and other values will be calculated
                // 'hidden' will hide the heat value
                // 'fixed' will use the fixed value of the 'legend.value' array option
                toolTip: "auto",
                toolTip_default: [0, 1, 2, 3, 4],
                toolTip_value: [0, 1, 2, 3, 4],
            },


            // ==============
            //  = Function =
            // ==============

            // Get the options
            getOptions: this.getOptions,

            // Calculate tooltip values
            calculateToolTip: this.calculateToolTip,

            // Calcule if year is bissextile
            bissextile: this.bissextile,

            // getDateFrom function
            getDateFrom: this.getDateFrom,

            // getDaysInMonth function
            getDaysInMonth: this.getDaysInMonth,

            // calculateDays function
            calculateDays: this.calculateDays,

        };
    }

    // set the options

    /**
     * Set the options
     * @param {Object} config The options to set
     * @return {boolean} Whether the options have been changed
     */
    setOptions(options) {
        let changed = false;
        for (let key in options) {
            // Check if the option is a object and key is not 'data'
            if (typeof options[key] === 'object' && key !== 'data') {
                for (let subKey in options[key]) {
                    changed = this.setSubOption(key, subKey, options[key][subKey]) || changed;
                }
            }
            else {
                if (this.setOption(key, options[key])) {
                    changed = true;
                }
            }
        }
        return changed;
    };

    /**
     * Set a new value for an option, only if unchanged
     * @param {string} key   Name of the option
     * @param {any} value Value of the option
     * @return {boolean} Whether the option have been changed
     */
    setOption(key, value) {
        if (this.config[key] == value) {
            return false;
        }

        this.config[key] = typeof value === typeof this.config[key] ? value : this.config[key];
        return true;
    };

    /**
     * Set a new value for an sub option, only if unchanged
     * @param {string} key   Name of the option
     * @param {string} subKey   Name of the sub option
     * @param {any} value Value of the option
     * @return {boolean} Whether the option have been changed
     */
    setSubOption(key, subKey, value) {
        if (this.config[key][subKey] == value) {
            return false;
        }

        this.config[key][subKey] = typeof value === typeof this.config[key][subKey] ? value : this.config[key][subKey];
        return true;
    }

    /**
     * Get the options
     * @return {Object} The options
     */
    getOptions() {
        return this.config;
    }

    /**
     * Calculate tooltip values
     * @param {Object} data The data to use for the tooltip
     * @return {Array} The tooltip values
     */
    calculateToolTip(data) {
        let values = [];
        let max = 0;

        // Get the maximum value
        for (let i = 0; i < data.length; i++) {
            let value = parseInt(data[i].value);
            if (value > max) {
                max = value;
            }
        }

        // Calculate the tooltip values
        if (this.config.legend.toolTip === 'auto') {
            if (max >= 5) {
                for (let i = 0; i < this.config.legend.toolTip_value.length; i++) {
                    values.push(Math.round(max * this.config.legend.toolTip_value[i] / 5));
                }
                values[1] = 1;
            } else {
                values = this.config.legend.toolTip_default;
            }
        }
        else if (this.config.legend.toolTip === 'fixed') {
            values = this.config.legend.toolTip_value;
        }

        return values;
    }

    // Calcule if year is bissextile
    bissextile() {
        const year = new Date().getFullYear();

        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 366;
        }

        return 365;
    };

    // getDateFrom function
    getDateFrom() {
        if (this.displayMode === 'year') {
            return new Date(new Date().getFullYear(), 0, 0);
        }
        else if (this.displayMode === 'month') {
            let month = this.month === 12 ? new Date().getMonth() : this.month;
            return new Date(new Date().getFullYear(), month, 1);
        }

        if (this.monthsDisplay === 12) {
            return new Date(new Date().setDate(new Date().getDate() - (this.bissextile())));
        }
        else {
            let month = this.month === 12 ? new Date().getMonth() : this.month;
            let date = new Date(new Date().getFullYear(), month, 0);
            let year = date.getFullYear();

            if (this.month === 12) {
                month = month - (this.monthsDisplay - 1);

                if (month < 0) {
                    month = 11 + month;
                    year = year - 1;
                }

                date = new Date(year, month, 0);
            }

            return date;
        }
    }

    // displayMode function
    calculateDays() {
        let nbrDays = 0;
        let startDate = null;

        if (this.displayMode === 'auto') {
            if (this.monthsDisplay === 12) {
                nbrDays = this.bissextile();
                startDate = this.getDateFrom('year');
            }
            else {
                startDate = this.getDateFrom();
                nbrDays = this.getDaysInMonth(startDate);
            }
        }
        else if (this.displayMode === 'year') {
            nbrDays = this.bissextile();
            startDate = this.getDateFrom('year');
        }
        else if (this.displayMode === 'month') {
            startDate = this.getDateFrom('month');
            nbrDays = new Date(new Date().getFullYear(), startDate.getMonth() + 1, 0).getDate();
        }
        else {
            nbrDays = this.bissextile();
            startDate = this.getDateFrom('year');
        }

        return {
            nbrDays: nbrDays,
            startDate: startDate
        }
    }

    getDaysInMonth(startMouth) {
        let nbrDays = 0;
        let month = startMouth.getMonth() + 1;
        let year = new Date(startMouth).getFullYear();

        for (let i = 0; i < this.monthsDisplay; i++) {

            if (month > 11) {
                month = 0;
                year++;
            }
            nbrDays += new Date(new Date().getFullYear(), month, 0).getDate();

            month++;
        }

        return nbrDays;
    }
}