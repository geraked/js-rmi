/**
 * Sample interface to be shared between the client and server.
 * Since JS doesn't support interface, used an abstract class instead.
 * 
 * @interface
 * @public
 */
export class IHuman {

    /**
     * @type {string}
     */
    name;

    /**
     * @type {number}
     */
    age;

    /**
     * Define in Kg
     * @type {number}
     */
    weight;

    /**
     * Define in meter
     * @type {number}
     */
    height;


    /**
     * Calculate the BMI and return it.
     * 
     * @returns {number}
     */
    bmi() { }


    /**
     * Decrease the weight.
     * 
     * @param {number} amount 
     */
    looseWeight(amount) { }


    /**
     * Get properties as an array.
     * It's not necessary, just to show other supported types.
     * 
     * @returns {Array}
     */
    toArray() { }


    /**
     * Get properties as an object.
     * It's not necessary, just to show other supported types.
     * 
     * @returns {object}
     */
    toJSON() { }

}