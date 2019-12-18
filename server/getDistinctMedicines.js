const fs = require('fs');


function getNames() {
    collection.aggregate([
        {
            $group: {
                _id: "$mainName",
            }
        },
        {
            $project: {
                mainName: "$_id",
            }
        }
    ]).toArray(function (err, result) {
        if (err) throw err;
        result = result.map(r => r.mainName);
        fs.writeFile("Medicines", JSON.stringify(result), function(err) {

            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    });
}
