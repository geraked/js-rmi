import { IHuman } from "../shared/IHuman.js";

/**
 * Implement the IHuman interface on the server.
 * 
 * @class
 * @implements {IHuman}
 */
export class Human extends IHuman {

    /**
     * Create a Human instance.
     * 
     * @param {string} name 
     * @param {number} age
     * @param {number} weight 
     * @param {number} height 
     */
    constructor(name, age, weight, height) {
        super();
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    bmi() {
        return this.weight / (this.height * this.height);
    }

    looseWeight(amount) {
        this.weight -= amount;
    }

    toArray() {
        return Object.values(this);
    }

    toJSON() {
        return this;
    }
}