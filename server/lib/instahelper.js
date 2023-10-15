const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.instahelper = async (uid, instaid, lastonline) => {
    try {
        await prisma.insta.upsert({
            where: {
                id: `${instaid}`
            },
            update: {
                lastonline: `${lastonline}`,
                userid: uid
            },
            create: {
                id: `${instaid}`,
                lastonline: `${lastonline}`,
                userid: uid
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.getuser = async (instaid) => {
    try {
        const instauser = await prisma.insta.findUnique({
            where: {
                id: instaid
            },
            include: {
                userid: true
            }
        })
        return instauser.id;
    } catch (err) {
        console.log(err);
        return null;
    }
}
