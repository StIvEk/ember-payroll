import Ember from 'ember';

let employees = [{
        id: 1,
        firstName: "Tom",
        surname: "Roberts",
        gender: "male",
        title: "Mr.",
        dob: "21/04/1986",
        age: 29,
        salary: 59783.00,
        takeHome: 41999.84,
        incomeTax: 13316.20,
        nationalInsurance: 4466.96
    }, {
        id: 2,
        firstName: "Louis",
        surname: "Singh",
        gender: "male",
        title: "Mr.",
        dob: "16/04/1979",
        age: 36,
        salary: 50739.00,
        takeHome: 36754.32,
        incomeTax: 9698.60,
        nationalInsurance: 4286.08
    }, {
        id: 3,
        firstName: "Mohammed",
        surname: "John",
        gender: "male",
        title: "Mr.",
        dob: "18/05/1992",
        age: 23,
        salary: 26389.00,
        takeHome: 21032.00,
        incomeTax: 3157.80,
        nationalInsurance: 2199.48
    }];

export default Ember.Route.extend({
    model() {
        return employees;
      }
});
