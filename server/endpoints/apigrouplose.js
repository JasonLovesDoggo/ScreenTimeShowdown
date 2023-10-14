const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.name = "/api/group/lose";
module.exports.method = "POST";
module.exports.verify = function (req, res) {
    return req.user;
}

module.exports.execute = async function (req, res) {
    if (req.body.id) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.body.id
                },
                include: {
                    groups: true
                }
            });
            // Subtract money from each user in the group
            let transactionlist = [];
            user.groups.forEach(group => {
                const updatedlist = group.surviving.replace((user.id + ','), '');
                console.log(updatedlist);
                transactionlist.push(prisma.group.update({
                    where: {
                        id: group.id
                    },
                    data: {
                        surviving: updatedlist
                    }
                }));
            });
            await prisma.$transaction(transactionlist);
            res.json({group: "hello"});
        } catch (error) {
            console.log(error);
            res.send(500).json({error: error});
        }
    } else {
        res.status(400).json({error: "Invalid form"})
    }
}