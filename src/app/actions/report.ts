// // @ts-nocheck
// 'use server';

// import prisma from '@/lib/prisma';
// import uniqId from 'generate-unique-id';
// import { getServerSession } from 'next-auth';

// export async function report(
//   coordinates: any,
//   description: String,
//   anonymous: boolean
// ) {
//   try {
//     const id = uniqId();
//     const session = await getServerSession();
//     const user = session?.user;
//     await prisma.reports.create({
//       data: {
//         id: id,
//         username: anonymous ? 'anonymous' : user?.name,
//         description: description,
//         category: 'REPORT',
//         coordinates: coordinates,
//         status: 'pending',
//       },
//     });

//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }


// @ts-nocheck
'use server';

import prisma from '@/lib/prisma';
import uniqId from 'generate-unique-id';
import { getServerSession } from 'next-auth';

export async function report(
  coordinates: any,
  description: String,
  anonymous: boolean
) {
  try {
    const id = uniqId();
    const session = await getServerSession();
    const user = session?.user;

    const data: any = {
      id: id,
      username: anonymous ? 'anonymous' : user?.name,
      description: description,
      category: 'REPORT',
      status: 'pending',
    };

    // ✅ SAFETY: add coordinates ONLY if valid
    if (
      Array.isArray(coordinates) &&
      coordinates.length === 2 &&
      coordinates[0] !== null &&
      coordinates[1] !== null
    ) {
      // data.coordinates = coordinates;
      data.latitude = coordinates[0];
      data.longitude = coordinates[1];
    }

    await prisma.reports.create({ data });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
