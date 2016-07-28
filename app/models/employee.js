import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    firstname: attr("string"),
    surname: attr("string"),
    gender: attr("string"),
    title: attr("string"),
    dob: attr("string"),
    age: attr("string"),
    salary: attr("string"),
    takehome: attr("string"),
    incometax: attr("string"),
    nationalinsurance: attr("string"),

    fullname: Ember.computed('firstname', 'surname', function() {
        return `${this.get('firstname')} ${this.get('surname')}`;
    })
});
