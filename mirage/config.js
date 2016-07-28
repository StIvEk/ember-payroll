export default function() {
    this.get('/employees', function(db, request) {
        let employees = [{
                type: 'employees',
                id: 1,
                attributes: {
                    firstname: "Tom",
                    surname: "Roberts",
                    gender: "male",
                    title: "Mr.",
                    dob: "21/04/1986",
                    age: "29",
                    salary: "59783.00",
                    takehome: "41999.84",
                    incometax: "13316.20",
                    nationalinsurance: "4466.96"
                }
            }, {
                type: 'employees',
                id: 2,
                attributes: {
                    firstname: "Louis",
                    surname: "Singh",
                    gender: "male",
                    title: "Mr.",
                    dob: "16/04/1979",
                    age: "36",
                    salary: "50739.00",
                    takehome: "36754.32",
                    incometax: "9698.60",
                    nationalinsurance: "4286.08"
                }
            }, {
                type: 'employees',
                id: 3,
                attributes: {
                    firstname: "Mohammed",
                    surname: "John",
                    gender: "male",
                    title: "Mr.",
                    dob: "18/05/1992",
                    age: "23",
                    salary: "26389.00",
                    takehome: "21032.00",
                    incometax: "3157.80",
                    nationalinsurance: "2199.48"
                }
        }];

        if(request.queryParams.name !== undefined) {
            let filteredEmployees = employees.filter(function(i) {
                let attrs = i.attributes;
                return (attrs.firstname + " " + attrs.surname).toLowerCase().indexOf(request.queryParams.name.toLowerCase()) !== -1;
            });
            return { data: filteredEmployees };
        } else {
            return { data: employees };
        }
    });
}
