const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.handleloss = async (uid) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: uid
            },
            include: {
                groups: true
            }
        });
        let transactionlist = [];
        user.groups.forEach(group => {
            const list = group.surviving;
            const users = list.split(',');
            if (users.length <= 2) {
                // const updatedlist = group.surviving.replace((uid + ','), '');
                // const winner = updatedlist.replace(',', '');
                // user = await prisma.user.
            } else {
                const updatedlist = group.surviving.replace((uid + ','), '');
                transactionlist.push(prisma.group.update({
                    where: {
                        id: group.id
                    },
                    data: {
                        surviving: updatedlist
                    }
                }));
            }
        });
        await prisma.$transaction(transactionlist);
    } catch (err) {
        console.log(err);
    }

}