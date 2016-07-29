import { test } from 'qunit';
import moduleForAcceptance from 'payroll/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | view employees');

test('visiting /', function(assert) {
    visit('/');

    andThen(function() {
        assert.equal(currentURL(), '/');
    });
});

test('should list available employees.', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('.employee-card').length, 7, 'should see 7 employees');
  });
});

test('should filter the employees by name.', function (assert) {
    visit('/');
    fillIn('.employees-filter input', 'Tom');
    keyEvent('.employees-filter input', 'keyup', 69);

    andThen(function () {
        assert.equal(find('.employee-card').length, 2, 'should show 2 employees');
        assert.equal(find('.employee-card .employee-name:contains("Tom")').length, 2, 'should contain 2 employees with name Tom');
    });
});
