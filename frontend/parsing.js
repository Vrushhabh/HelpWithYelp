/** Class housing the business category and frequency information. */
class CategoryCounter {
    /**
     * Create a CategoryCounter.
     * @param {string} category_response - The JSON string mapping categories to their frequencies.
     */
    constructor(category_response) {
        this.category_response = category_response;
        this.category_counts = {};
        this.sorted_category_counts = [];
        this.json_to_category_counts();
    }

    /*
    * Converts the JSON representation of categories and their frequencies to a sorted array (sorted by descending order of frequency).
    */
    json_to_category_counts() {
        // Create on Object from the JSON
        const obj = JSON.parse(this.category_response);
        
        for (let i = 0; i < obj.length; i++) {
            this.category_counts[String(obj[i].category).trim()] = obj[i]['count(a.category)'];
        }

        let dict = this.category_counts;
        
        // Create a sorted (by descending order of frequency) array from the Object
        // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
        this.sorted_category_counts = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });

        this.sorted_category_counts.sort(function(first, second) {
            return second[1] - first[1];
        });
    }

    /**
     * Finds the top n categories in the the sorted count array.
     * @param {number} n - The number of categories
     * @returns {Array} - The top n categories and their frequencies.
     */
    find_max_n_categories(n) {
        if (n <= 0) {
            throw new Error("Invalid number of categories");
        }
    
        if (this.sorted_category_counts.length <= n) {
            return this.sorted_category_counts;
        } else {
            return this.sorted_category_counts.slice(0, n);
        }
    }
}
