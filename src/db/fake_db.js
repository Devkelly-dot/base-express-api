const fake_database = {
    user: [
        {
            id:1,
            name:"Devin",
            platform: [
                1,
                2
            ],
        },
        {
            id:2,
            name:"Josh",
            platform: [
                1
            ]
        }
    ],
    platform: [
        {'id':1,name:"xbox"},
        {'id':2,name:"PC"}
    ]
}

module.exports = fake_database;