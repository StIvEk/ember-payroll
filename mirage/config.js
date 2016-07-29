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
            }, {
                type: 'employees',
                id: 4,
                attributes: {
                    firstname: "Owen",
                    surname: "Humphreys",
                    gender: "male",
                    title: "Mr.",
                    dob: "15/05/1972",
                    age: "43",
                    salary: "31336.00",
                    takehome: "24395.68",
                    incometax: "4147.20",
                    nationalinsurance: "2793.12"
                }
            }, {
                type: 'employees',
                id: 5,
                attributes: {
                    firstname: "Holly",
                    surname: "Gregory",
                    gender: "female",
                    title: "Ms.",
                    dob: "31/01/1993",
                    age: "22",
                    salary: "60176.00",
                    takehome: "42227.78",
                    incometax: "13473.40",
                    nationalinsurance: "4474.82"
                }
            }, {
                type: 'employees',
                id: 6,
                attributes: {
                    firstname: "Skye",
                    surname: "Lawrence",
                    gender: "female",
                    title: "Mrs.",
                    dob: "22/06/1979",
                    age: "36",
                    salary: "42552.00",
                    takehome: "32005.86",
                    incometax: "6423.80",
                    nationalinsurance: "4122.34"
                }
            }, {
                type: 'employees',
                id: 7,
                attributes: {
                    firstname: "Tom",
                    surname: "Carey",
                    gender: "male",
                    title: "Mr.",
                    dob: "03/06/1994",
                    age: "21",
                    salary: "75316.00",
                    takehome: "51008.98",
                    incometax: "19529.40",
                    nationalinsurance: "4777.62"
                }
            }
        ];

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
