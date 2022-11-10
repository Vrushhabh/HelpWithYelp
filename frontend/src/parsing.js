/**
 * EXAMPLE USAGE:
 *
 * let obj1 = await axios.get('http://127.0.0.1:5000/categories-from-zip/93101');
 * const c = new CategoryCounter(obj1);
 * console.log(c.find_max_n_categories(3)); // Prints the three most frequent categories
 *
 * let obj2 = await axios.get('http://127.0.0.1:5000/reviews-from-zip/93101');
 * const r = new ReviewCounter(obj2);
 * // Prints reviews in the range [0, 4) (reviews are sorted in descending order by star rating).
 * console.log(r.get_reviews(0, 4));
 *
 */

/** Class housing the business category and frequency information. */
export class CategoryCounter {
  /**
   * Create a CategoryCounter.
   * @param {Object} category_response - Object mapping categories to their frequencies
   */
  constructor(category_response) {
    this.category_response = category_response.data;
    this.category_counts = {};
    this.sorted_category_counts = [];
    this.obj_to_category_counts();
  }

  /*
   * Converts the Object representation of categories and their frequencies to a sorted array (sorted by descending order of frequency).
   */
  obj_to_category_counts() {
    // Create on Object from the JSON
    let obj = this.category_response;

    for (let i = 0; i < obj.length; i++) {
      this.category_counts[String(obj[i].category).trim()] =
        obj[i]['count(a.category)'];
    }

    let dict = this.category_counts;

    // Create a sorted (by descending order of frequency) array from the Object
    // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    this.sorted_category_counts = Object.keys(dict).map(function (key) {
      return [key, dict[key]];
    });

    this.sorted_category_counts.sort(function (first, second) {
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
      throw new Error('Invalid number of categories');
    }

    if (this.sorted_category_counts.length <= n) {
      return this.sorted_category_counts;
    } else {
      return this.sorted_category_counts.slice(0, n);
    }
  }
}

/** Class housing the review information. */
export class ReviewCounter {
  /**
   * Create a Review Counter.
   * @param {Object} review_response - Object containing review information
   */
  constructor(review_response) {
    this.review_response = review_response.data;
    this.reviews = this.obj_to_response();
    this.sorted_reviews = [];
    this.sort_reviews();
  }

  /*
   * Converts the Object representation of reviews to a review_counts map.
   */
  obj_to_response() {
    let obj = this.review_response;

    let review_counts = {};

    for (let i = 0; i < obj.length; i++) {
      let num_stars = parseInt(obj[i]['review_stars']);
      let reviews_with_stars = review_counts[num_stars] || [];
      reviews_with_stars.push([obj[i]['name'], obj[i]['text']]);
      review_counts[num_stars] = reviews_with_stars;
    }

    return review_counts;
  }

  /**
   * Sort the reviews by the review stars.
   */
  sort_reviews() {
    let dict = this.reviews;

    this.sorted_reviews = Object.keys(dict).map(function (key) {
      return [key, dict[key]];
    });

    this.sorted_reviews.sort(function (first, second) {
      return second[0] - first[0];
    });
  }

  /**
   * Finds the reviews in the range [start, end)
   * @param {number} start - The starting index.
   * @param {number} end - The ending index.
   * @returns {Array} - An array containing the reviews in the range [start, end)
   */
  get_reviews(start, end) {
    if (start < 0 || end < 0 || end < start) {
      throw new Error('Invalid start and end inputs');
    }

    let reviews = [];

    let idx = 0;

    for (let i = 0; i < this.sorted_reviews.length; i++) {
      let num_stars = this.sorted_reviews[i][0];
      let num_reviews_for_stars = this.sorted_reviews[i][1].length;

      if (idx + num_reviews_for_stars < start) {
        idx += num_reviews_for_stars;
        continue;
      }

      let j = 0;

      while (idx < end && j < num_reviews_for_stars) {
        if (idx < start) {
          idx++;
        } else {
          reviews.push([num_stars, this.sorted_reviews[i][1][j]]);
          idx++;
          j++;
        }
      }
    }

    return reviews;
  }
}
