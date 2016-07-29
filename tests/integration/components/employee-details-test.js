import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('employee-details', 'Integration | Component | employee details', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{employee-details}}`);

  assert.equal(this.$('.detail>span').text().trim(), 'gender:dob:age:Salary:Income Tax:National Insurance:Take Home:');

  // Template block usage:
  this.render(hbs`
    {{#employee-details}}
    {{/employee-details}}
  `);

  assert.equal(this.$('.detail>span').text().trim(), 'gender:dob:age:Salary:Income Tax:National Insurance:Take Home:');
});
