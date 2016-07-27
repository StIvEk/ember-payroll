import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    firstname: attr('string'),
    surname: attr(),
    gender: attr(),
    title: attr(),
    dob: attr(),
    age: attr(),
    salary: attr(),
    takehome: attr(),
    incometax: attr(),
    nationalinsurance: attr()
});
